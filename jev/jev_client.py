"""Cliente mínimo do Jev (TypeSafe AI, System One) — somente biblioteca padrão.

O Jev DECIDE (choice / score / noul); não gera texto nem código.

Contrato conferido no SDK oficial `@typesafe-ai/sdk@0.6.0` (docs.typesafe.ai
estava inacessível no ambiente de criação):

    POST {TYPESAFE_BASE_URL or https://api.typesafe.ai}/v1/systemone
    Authorization: Bearer $TYPESAFE_API_KEY
    {"model": "jev-latest", "state": ..., "questions": {"id": {"type": ..., "instructions": ..., "criteria": ...}}}
    -> {"model": ..., "answers": {"id": {...}}, "usage": {"input_tokens": n, "output_tokens": n}}

Fallback OpenRouter (endpoint ALPHA de decisions, NÃO chat/completions):
    POST https://openrouter.ai/api/alpha/decisions  (mesmo corpo nativo)
"""

from __future__ import annotations

import hashlib
import json
import os
import random
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path
from typing import Any

PROJECT_ROOT = Path(__file__).resolve().parent.parent
DEFAULT_MODEL = "jev-latest"
TYPESAFE_DEFAULT_BASE = "https://api.typesafe.ai"
OPENROUTER_DEFAULT_URL = "https://openrouter.ai/api/alpha/decisions"
RETRY_STATUSES = {408, 429, 500, 502, 503, 504}
MAX_RETRY_AFTER_S = 60.0


class JevError(Exception):
    """Falha ao obter decisão do Jev. Nunca substitua por decisão inventada."""


class JevUnavailable(JevError):
    """Nenhuma chave configurada (TYPESAFE_API_KEY / OPENROUTER_API_KEY)."""


class JevAPIError(JevError):
    def __init__(self, status: int, body: Any, request_id: str | None = None):
        self.status, self.body, self.request_id = status, body, request_id
        super().__init__(f"Jev HTTP {status}: {str(body)[:300]}")


# ---------------------------------------------------------------- ambiente --

def load_dotenv(path: Path | None = None) -> None:
    """Carrega `.env` da raiz do projeto sem sobrescrever variáveis já exportadas."""
    path = path or PROJECT_ROOT / ".env"
    if not path.is_file():
        return
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, value = line.removeprefix("export ").partition("=")
        key, value = key.strip(), value.strip().strip('"').strip("'")
        if key and value and not os.environ.get(key):
            os.environ[key] = value


def _env(name: str) -> str | None:
    value = os.environ.get(name, "").strip()
    return value or None


def resolve_backend(model: str | None = None) -> dict[str, str]:
    """Escolhe o backend pela credencial disponível: TypeSafe direto → OpenRouter."""
    load_dotenv()
    model = model or _env("TYPESAFE_DEFAULT_MODEL") or DEFAULT_MODEL
    if key := _env("TYPESAFE_API_KEY"):
        base = (_env("TYPESAFE_BASE_URL") or TYPESAFE_DEFAULT_BASE).rstrip("/")
        return {"name": "typesafe", "url": f"{base}/v1/systemone", "key": key, "model": model}
    if key := _env("OPENROUTER_API_KEY"):
        return {
            "name": "openrouter",
            "url": _env("OPENROUTER_DECISIONS_URL") or OPENROUTER_DEFAULT_URL,
            "key": key,
            "model": _env("JEV_OPENROUTER_MODEL") or _openrouter_model(model),
        }
    raise JevUnavailable(
        "Sem chave do Jev: exporte TYPESAFE_API_KEY (console.typesafe.ai) "
        "ou OPENROUTER_API_KEY. Nenhuma decisão foi tomada."
    )


def _openrouter_model(model: str) -> str:
    # No OpenRouter o slug leva o prefixo do provedor (ex.: typesafe/jev-1.13).
    if "/" in model:
        return model
    return {"jev-1.13.0": "typesafe/jev-1.13"}.get(model, f"typesafe/{model}")


def available() -> bool:
    try:
        resolve_backend()
        return True
    except JevUnavailable:
        return False


# --------------------------------------------------------------- validação --

def validate_questions(questions: dict[str, Any]) -> None:
    if not isinstance(questions, dict) or not questions:
        raise JevError("`questions` deve ser um objeto não vazio {id: pergunta}.")
    for qid, q in questions.items():
        kind = q.get("type") if isinstance(q, dict) else None
        if kind == "choice":
            crit = q.get("criteria")
            if not isinstance(crit, dict) or len(crit) < 2:
                raise JevError(f"{qid}: choice exige criteria {{rótulo: descrição}} com >= 2 opções.")
        elif kind == "score":
            crit = q.get("criteria")
            if not isinstance(crit, list) or len(crit) < 2:
                raise JevError(f"{qid}: score exige criteria como lista com >= 2 níveis.")
        elif kind != "noul":
            raise JevError(f"{qid}: type deve ser choice, score ou noul (recebido {kind!r}).")


# ------------------------------------------------------------------- HTTP --

def _post(url: str, key: str, payload: dict, timeout: float) -> tuple[int, dict, Any]:
    """Uma ida e volta HTTP. Retorna (status, headers, corpo)."""
    data = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=data,
        method="POST",
        headers={
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json",
            "Accept": "application/json",
            "User-Agent": "mfa-jev-decision-layer/1.0",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            raw = resp.read().decode("utf-8")
            return resp.status, {k.lower(): v for k, v in resp.headers.items()}, _parse(raw)
    except urllib.error.HTTPError as err:
        raw = err.read().decode("utf-8", "replace")
        return err.code, {k.lower(): v for k, v in (err.headers or {}).items()}, _parse(raw)


def _parse(raw: str) -> Any:
    try:
        return json.loads(raw) if raw else None
    except json.JSONDecodeError:
        return raw


def _retry_after(headers: dict) -> float | None:
    """Lê `retry-after-ms` (preferido) ou `Retry-After` em segundos."""
    try:
        if "retry-after-ms" in headers:
            return max(0.0, float(headers["retry-after-ms"]) / 1000)
        if "retry-after" in headers:
            return max(0.0, float(headers["retry-after"]))
    except ValueError:
        return None
    return None


def _backoff(attempt: int) -> float:
    delay = min(0.5 * (2 ** attempt), 5.0)
    return delay * (1 - random.random() * 0.25)


# -------------------------------------------------------------------- log --

def _log_path() -> Path:
    return Path(_env("JEV_LOG_FILE") or PROJECT_ROOT / "jev" / "logs" / "jev_calls.jsonl")


def _log(entry: dict) -> None:
    """Registra metadados (tokens, latência, status). NUNCA grava o conteúdo do state (LGPD)."""
    try:
        path = _log_path()
        path.parent.mkdir(parents=True, exist_ok=True)
        with path.open("a", encoding="utf-8") as fh:
            fh.write(json.dumps(entry, ensure_ascii=False) + "\n")
    except OSError:
        pass
    if _env("JEV_DEBUG"):
        print(f"[jev] {json.dumps(entry, ensure_ascii=False)}", file=sys.stderr)


# --------------------------------------------------------------- chamada --

def system_one(
    state: Any,
    questions: dict[str, Any],
    model: str | None = None,
    *,
    timeout: float | None = None,
    max_retries: int = 3,
    tag: str = "",
) -> dict[str, Any]:
    """Faz UMA chamada ao Jev com várias questions sobre o mesmo state.

    Retorna {"model", "answers", "usage", "latency_ms", "backend", "attempts", "request_id"}.
    Levanta JevError em qualquer falha — quem chama decide escalar; nunca simular.
    """
    validate_questions(questions)
    backend = resolve_backend(model)
    timeout = timeout or float(_env("JEV_TIMEOUT") or 10)
    payload = {"model": backend["model"], "state": state, "questions": questions}
    state_hash = hashlib.sha256(json.dumps(state, sort_keys=True, ensure_ascii=False).encode()).hexdigest()[:12]
    base_log = {
        "backend": backend["name"],
        "model": backend["model"],
        "tag": tag,
        "questions": {k: v.get("type") for k, v in questions.items()},
        "state_sha256_12": state_hash,
    }

    started = time.monotonic()
    last_error: JevError | None = None
    for attempt in range(max_retries + 1):
        try:
            status, headers, body = _post(backend["url"], backend["key"], payload, timeout)
        except (urllib.error.URLError, TimeoutError, OSError) as err:
            last_error = JevError(f"Falha de conexão com o Jev ({backend['name']}): {err}")
            if attempt < max_retries:
                time.sleep(_backoff(attempt))
                continue
            break
        request_id = headers.get("x-typesafe-request-id")
        if 200 <= status < 300 and isinstance(body, dict) and isinstance(body.get("answers"), dict):
            latency_ms = round((time.monotonic() - started) * 1000)
            usage = body.get("usage") or {}
            missing = set(questions) - set(body["answers"])
            if missing:
                last_error = JevError(f"Resposta do Jev sem as questions: {sorted(missing)}")
                break
            _log({
                **base_log,
                "ts": time.strftime("%Y-%m-%dT%H:%M:%S%z"),
                "status": status,
                "attempts": attempt + 1,
                "latency_ms": latency_ms,
                "input_tokens": usage.get("input_tokens"),
                "output_tokens": usage.get("output_tokens"),
                "request_id": request_id,
            })
            return {
                "model": body.get("model", backend["model"]),
                "answers": body["answers"],
                "usage": usage,
                "latency_ms": latency_ms,
                "backend": backend["name"],
                "attempts": attempt + 1,
                "request_id": request_id,
            }
        if 200 <= status < 300:
            last_error = JevError(f"Resposta inesperada do Jev: {str(body)[:300]}")
            break
        last_error = JevAPIError(status, body, request_id)
        if status in RETRY_STATUSES and attempt < max_retries:
            wait = _retry_after(headers)
            if wait is None or wait > MAX_RETRY_AFTER_S:
                wait = _backoff(attempt)
            time.sleep(wait)
            continue
        break

    _log({
        **base_log,
        "ts": time.strftime("%Y-%m-%dT%H:%M:%S%z"),
        "status": getattr(last_error, "status", "erro"),
        "attempts": attempt + 1,
        "latency_ms": round((time.monotonic() - started) * 1000),
        "error": str(last_error)[:300],
    })
    raise last_error or JevError("Falha desconhecida ao chamar o Jev.")
