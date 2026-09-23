"""Testes offline: servidor HTTP local no formato do contrato /v1/systemone.

O servidor de teste devolve respostas FIXAS definidas aqui; serve só para validar
transporte, retry, parsing e regras das políticas — não substitui o Jev real.

    python3 -m unittest discover -s jev/tests -v
"""

from __future__ import annotations

import json
import os
import subprocess
import sys
import tempfile
import threading
import unittest
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT))

from jev import JevAPIError, JevUnavailable, system_one  # noqa: E402
from jev import policies  # noqa: E402
from jev.redact import redact_text  # noqa: E402


def ch(label, conf, labels):
    rest = (1 - conf) / max(1, len(labels) - 1)
    return {"type": "choice", "choice": label, "confidence": conf,
            "probabilities": {l: (conf if l == label else rest) for l in labels}}


def sc(value, conf, n=3):
    idx = round(value)
    return {"type": "score", "score": value, "confidence": conf, "legend": {str(i): "" for i in range(n)},
            "probabilities": {str(i): (conf if i == idx else (1 - conf) / (n - 1)) for i in range(n)}}


def nl(p):
    return {"type": "noul", "noul": p}


class Mock(BaseHTTPRequestHandler):
    script: list = []  # fila de (status, headers, corpo)
    requests: list = []

    def do_POST(self):
        body = json.loads(self.rfile.read(int(self.headers["Content-Length"])))
        Mock.requests.append({"path": self.path, "auth": self.headers.get("Authorization"), "body": body})
        status, headers, payload = Mock.script.pop(0)
        data = json.dumps(payload).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        for k, v in headers.items():
            self.send_header(k, v)
        self.end_headers()
        self.wfile.write(data)

    def log_message(self, *a):
        pass


def ok(answers):
    return (200, {"x-typesafe-request-id": "req_teste"},
            {"model": "jev-latest", "answers": answers, "usage": {"input_tokens": 321, "output_tokens": 0}})


class Base(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.srv = HTTPServer(("127.0.0.1", 0), Mock)
        threading.Thread(target=cls.srv.serve_forever, daemon=True).start()
        cls.tmp = tempfile.mkdtemp()
        cls.env = {
            "TYPESAFE_API_KEY": "chave-de-teste",
            "TYPESAFE_BASE_URL": f"http://127.0.0.1:{cls.srv.server_port}",
            "JEV_LOG_FILE": os.path.join(cls.tmp, "calls.jsonl"),
            "NO_PROXY": "127.0.0.1,localhost", "no_proxy": "127.0.0.1,localhost",
        }

    @classmethod
    def tearDownClass(cls):
        cls.srv.shutdown()

    def setUp(self):
        self._old = {k: os.environ.get(k) for k in [*self.env, "OPENROUTER_API_KEY"]}
        os.environ.update(self.env)
        os.environ.pop("OPENROUTER_API_KEY", None)
        Mock.script, Mock.requests = [], []

    def tearDown(self):
        for k, v in self._old.items():
            if v is None:
                os.environ.pop(k, None)
            else:
                os.environ[k] = v


class ClientTests(Base):
    Q = {"x": {"type": "noul", "instructions": "teste?"}}

    def test_contrato_e_log(self):
        Mock.script = [ok({"x": nl(0.9)})]
        r = system_one({"a": 1}, self.Q, tag="t")
        req = Mock.requests[0]
        self.assertEqual(req["path"], "/v1/systemone")
        self.assertEqual(req["auth"], "Bearer chave-de-teste")
        self.assertEqual(set(req["body"]), {"model", "state", "questions"})
        self.assertEqual(r["usage"]["input_tokens"], 321)
        log = json.loads(Path(self.env["JEV_LOG_FILE"]).read_text().splitlines()[-1])
        self.assertEqual(log["input_tokens"], 321)
        self.assertIn("latency_ms", log)
        self.assertNotIn("state", log)  # LGPD: conteúdo não vai para o log

    def test_retry_429(self):
        Mock.script = [(429, {"retry-after-ms": "10"}, {"error": "rate"}), ok({"x": nl(0.2)})]
        r = system_one("s", self.Q)
        self.assertEqual(r["attempts"], 2)

    def test_erro_nao_simula(self):
        Mock.script = [(401, {}, {"error": "bad key"})]
        with self.assertRaises(JevAPIError):
            system_one("s", self.Q)

    def test_sem_chave(self):
        os.environ.pop("TYPESAFE_API_KEY")
        with self.assertRaises(JevUnavailable):
            system_one("s", self.Q)


class PolicyTests(Base):
    def test_guard_deny_risco_alto(self):
        Mock.script = [ok({"destrutividade": sc(1.9, 0.8), "dano_real": nl(0.9),
                           "decisao": ch("deny", 0.8, ["allow", "ask", "deny"])})]
        self.assertEqual(policies.tool_guard("Bash", {"command": "x"})["decisao"], "deny")

    def test_guard_ask_confianca_baixa(self):
        Mock.script = [ok({"destrutividade": sc(0.2, 0.3), "dano_real": nl(0.1),
                           "decisao": ch("allow", 0.35, ["allow", "ask", "deny"])})]
        self.assertEqual(policies.tool_guard("Edit", {"file_path": "a.ts"})["decisao"], "ask")

    def test_guard_ask_dano_real(self):
        Mock.script = [ok({"destrutividade": sc(0.9, 0.7), "dano_real": nl(0.8),
                           "decisao": ch("allow", 0.7, ["allow", "ask", "deny"])})]
        self.assertEqual(policies.tool_guard("Bash", {"command": "x"})["decisao"], "ask")

    def test_guard_allow(self):
        Mock.script = [ok({"destrutividade": sc(0.1, 0.9), "dano_real": nl(0.05),
                           "decisao": ch("allow", 0.9, ["allow", "ask", "deny"])})]
        self.assertEqual(policies.tool_guard("Edit", {"file_path": "a.ts"})["decisao"], "allow")

    def test_precheck(self):
        self.assertEqual(policies.precheck_tool("Bash", {"command": "git status"})[0], "skip")
        self.assertEqual(policies.precheck_tool("Bash", {"command": "ls | sh"})[0], None)
        self.assertEqual(policies.precheck_tool("Bash", {"command": "rm -rf build"})[0], "ask")
        self.assertEqual(policies.precheck_tool("Bash", {"command": "git push -f origin main"})[0], "ask")
        self.assertEqual(policies.precheck_tool("Write", {"file_path": "/p/.env"})[0], "ask")
        self.assertEqual(policies.precheck_tool("Write", {"file_path": "/p/app/page.tsx"})[0], None)

    def test_router(self):
        tiers = ["mechanical", "ordinary", "hard"]
        # upgrade com confiança 0,35 (>= 0,3)
        Mock.script = [ok({"complexidade": ch("hard", 0.35, tiers), "esforco": sc(1, 0.5), "risco_juridico": nl(0.2)})]
        self.assertEqual(policies.route("x", "ordinary")["modelo"], "opus")
        # downgrade exige 0,6: com 0,5 mantém
        Mock.script = [ok({"complexidade": ch("mechanical", 0.5, tiers), "esforco": sc(0, 0.8), "risco_juridico": nl(0.1)})]
        self.assertEqual(policies.route("x", "ordinary")["modelo"], "sonnet")
        Mock.script = [ok({"complexidade": ch("mechanical", 0.8, tiers), "esforco": sc(0, 0.8), "risco_juridico": nl(0.1)})]
        self.assertEqual(policies.route("x", "ordinary")["modelo"], "haiku")
        # risco jurídico > 0,7 força hard
        Mock.script = [ok({"complexidade": ch("mechanical", 0.9, tiers), "esforco": sc(0, 0.9), "risco_juridico": nl(0.85)})]
        self.assertEqual(policies.route("x", "ordinary")["modelo"], "opus")

    def test_triagem_urgente_e_lgpd(self):
        areas = ["fundiario", "previdenciario", "bancario_consumidor", "familia", "penal", "ambiental", "outro"]
        prox = ["responder_informativo", "pedir_documentos", "agendar_humano", "recusar_fora_escopo"]
        Mock.script = [ok({"area": ch("previdenciario", 0.9, areas), "urgencia": sc(1.8, 0.7),
                           "caso_novo": nl(0.9), "dados_sensiveis": nl(0.95),
                           "proximo": ch("pedir_documentos", 0.6, prox)})]
        out = policies.triagem({"canal": "whatsapp", "mensagem": "Meu CPF 123.456.789-09, benefício cortado ontem"})
        self.assertEqual(out["decisao"], "agendar_humano")
        self.assertTrue(out["lgpd_sensivel"])
        self.assertIn("[CPF]", json.dumps(Mock.requests[0]["body"]["state"]))
        self.assertNotIn("123.456.789-09", json.dumps(Mock.requests[0]["body"]))

    def test_radar_captacao_bloqueia(self):
        Mock.script = [ok({"captacao": nl(0.6), "qualidade_minuta": sc(2, 0.8),
                           "destino": ch("revisao_advogado", 0.8, ["arquivo", "revisao_advogado", "nao_usar"])})]
        self.assertEqual(policies.radar({"tipo": "post", "texto": "x", "finalidade": "instagram"})["decisao"], "nao_usar")

    def test_acao_envio_exige_humano(self):
        acoes = ["ler", "editar", "terminal", "enviar_mensagem", "esperar"]
        Mock.script = [ok({"acao": ch("enviar_mensagem", 0.9, acoes), "precisa_revisao": nl(0.2),
                           "impacto_cliente": sc(0.5, 0.8)})]
        self.assertTrue(policies.acao_agente({"objetivo": "x", "observacoes": "", "acao_proposta": "y"})["requer_humano"])


class HookTests(Base):
    def run_hook(self, event, extra_env=None):
        env = {**os.environ, **(extra_env or {})}
        p = subprocess.run([sys.executable, str(ROOT / "jev/hooks/pre_tool_use.py")],
                           input=json.dumps(event), capture_output=True, text=True, env=env, timeout=30)
        self.assertEqual(p.returncode, 0, p.stderr)
        return json.loads(p.stdout)["hookSpecificOutput"] if p.stdout.strip() else None

    def test_hook_deny(self):
        Mock.script = [ok({"destrutividade": sc(2, 0.9), "dano_real": nl(0.95),
                           "decisao": ch("deny", 0.9, ["allow", "ask", "deny"])})]
        out = self.run_hook({"tool_name": "Bash", "tool_input": {"command": "npx prisma migrate reset --force"}})
        self.assertEqual(out["permissionDecision"], "deny")

    def test_hook_allow_nao_interfere(self):
        Mock.script = [ok({"destrutividade": sc(0.1, 0.9), "dano_real": nl(0.02),
                           "decisao": ch("allow", 0.9, ["allow", "ask", "deny"])})]
        self.assertIsNone(self.run_hook({"tool_name": "Edit", "tool_input": {"file_path": "app/page.tsx"}}))

    def test_hook_sem_chave_linha_vermelha(self):
        out = self.run_hook({"tool_name": "Bash", "tool_input": {"command": "rm -rf content"}},
                            {"TYPESAFE_API_KEY": ""})
        self.assertEqual(out["permissionDecision"], "ask")

    def test_hook_sem_chave_rotina_passa(self):
        self.assertIsNone(self.run_hook({"tool_name": "Bash", "tool_input": {"command": "npm run build"}},
                                        {"TYPESAFE_API_KEY": ""}))

    def test_hook_api_falha_pergunta(self):
        Mock.script = [(500, {}, {"error": "x"}), (500, {}, {"error": "x"})]
        out = self.run_hook({"tool_name": "Bash", "tool_input": {"command": "npm run build"}})
        self.assertEqual(out["permissionDecision"], "ask")
        self.assertIn("não simulada", out["permissionDecisionReason"])


class RedactTests(unittest.TestCase):
    def test_redacao(self):
        t = redact_text("CPF 123.456.789-09, fone (68) 99912-3456, a@b.com.br, TYPESAFE_API_KEY=abc123 NIT: 123.45678.90-1")
        for s in ("123.456.789-09", "99912-3456", "a@b.com.br", "abc123", "123.45678.90-1"):
            self.assertNotIn(s, t)
        # número CNJ de processo (público) não é confundido com CPF/telefone
        self.assertIn("0701234-56.2024.8.01.0001", redact_text("Processo 0701234-56.2024.8.01.0001"))


if __name__ == "__main__":
    unittest.main()
