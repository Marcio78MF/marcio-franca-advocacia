'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AREAS_ATUACAO, SITE_CONFIG } from '@/lib/data';
import type { AreaAtuacao } from '@/lib/data';
import Icon from '@/components/Icon';
import styles from './triagem.module.css';

type Etapa = 'area' | 'perguntas' | 'contato' | 'resultado';

export default function TriagemClient() {
  const [etapa, setEtapa] = useState<Etapa>('area');
  const [areaSelecionada, setAreaSelecionada] = useState<AreaAtuacao | null>(null);
  const [respostas, setRespostas] = useState<Record<string, string>>({});
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [cidade, setCidade] = useState('');
  const [descricao, setDescricao] = useState('');
  const [temDocumentos, setTemDocumentos] = useState('');

  const totalEtapas = 4;
  const progresso = etapa === 'area' ? 1 : etapa === 'perguntas' ? 2 : etapa === 'contato' ? 3 : 4;

  function selecionarArea(area: AreaAtuacao) {
    setAreaSelecionada(area);
    setRespostas({});
    setPerguntaAtual(0);
    setEtapa('perguntas');
  }

  function responderPergunta(valor: string) {
    if (!areaSelecionada) return;
    const pergunta = areaSelecionada.triagem.perguntas[perguntaAtual];
    const novasRespostas = { ...respostas, [pergunta.id]: valor };
    setRespostas(novasRespostas);
    if (perguntaAtual < areaSelecionada.triagem.perguntas.length - 1) {
      setTimeout(() => setPerguntaAtual(perguntaAtual + 1), 250);
    } else {
      setTimeout(() => setEtapa('contato'), 250);
    }
  }

  function enviar() {
    if (!areaSelecionada || !nome.trim() || !whatsapp.trim()) return;

    const linhasRespostas = areaSelecionada.triagem.perguntas
      .map((p) => `• ${p.texto}: ${respostas[p.id] || 'Não informado'}`)
      .join('\n');

    const mensagem = [
      `Olá, fiz o diagnóstico rápido no site e gostaria de orientação.`,
      ``,
      `*Nome:* ${nome}`,
      `*Cidade:* ${cidade || 'Não informada'}`,
      `*Área:* ${areaSelecionada.titulo}`,
      `*Documentos:* ${temDocumentos || 'Não informado'}`,
      ``,
      `*Respostas:*`,
      linhasRespostas,
      ``,
      `*Resumo:* ${descricao || 'Não informado'}`,
    ].join('\n');

    setEtapa('resultado');

    setTimeout(() => {
      window.open(`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(mensagem)}`, '_blank');
    }, 1500);
  }

  return (
    <div className={styles.page}>
      <div className={styles.heroBg} aria-hidden="true" />
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <h1>Diagnóstico Jurídico Rápido</h1>
          <p>Responda algumas perguntas sobre sua situação. Sem compromisso.</p>
        </div>

        {etapa !== 'resultado' && (
          <div className={styles.progressWrap}>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${(progresso / totalEtapas) * 100}%` }} />
            </div>
            <div className={styles.progressLabels}>
              {['Problema', 'Perguntas', 'Dados', 'Resultado'].map((s, i) => (
                <span key={i} className={`${styles.progressLabel} ${progresso > i ? styles.progressDone : ''} ${progresso === i + 1 ? styles.progressActive : ''}`}>{s}</span>
              ))}
            </div>
          </div>
        )}

        <div className={styles.card}>
          {/* ETAPA 1 */}
          {etapa === 'area' && (
            <div className={styles.etapa}>
              <h2>Qual problema você está enfrentando?</h2>
              <p>Selecione a área mais próxima da sua situação.</p>
              <div className={styles.areasGrid}>
                {AREAS_ATUACAO.map((area) => (
                  <button key={area.id} className={styles.areaBtn} onClick={() => selecionarArea(area)}>
                    <span className={styles.areaBtnIcone}><Icon name={area.icone} size={28} /></span>
                    <span className={styles.areaBtnTitulo}>{area.triagem.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ETAPA 2 */}
          {etapa === 'perguntas' && areaSelecionada && (
            <div className={styles.etapa}>
              <div className={styles.perguntaHeader}>
                <span className={styles.perguntaIcone}><Icon name={areaSelecionada.icone} size={36} /></span>
                <div>
                  <h2>{areaSelecionada.titulo}</h2>
                  <p>Pergunta {perguntaAtual + 1} de {areaSelecionada.triagem.perguntas.length}</p>
                </div>
              </div>
              <div className={styles.perguntaWrap}>
                <p className={styles.perguntaTexto}>{areaSelecionada.triagem.perguntas[perguntaAtual].texto}</p>
                <div className={styles.opcoes}>
                  {areaSelecionada.triagem.perguntas[perguntaAtual].opcoes.map((opcao) => (
                    <button key={opcao} className={`${styles.opcaoBtn} ${respostas[areaSelecionada.triagem.perguntas[perguntaAtual].id] === opcao ? styles.opcaoSelecionada : ''}`} onClick={() => responderPergunta(opcao)}>{opcao}</button>
                  ))}
                </div>
              </div>
              <button className={styles.voltarBtn} onClick={() => { if (perguntaAtual === 0) setEtapa('area'); else setPerguntaAtual(perguntaAtual - 1); }}>
                 <Icon name="ArrowRight" size={14} style={{ transform: 'rotate(180deg)' }} /> Voltar
               </button>
            </div>
          )}

          {/* ETAPA 3 */}
          {etapa === 'contato' && (
            <div className={styles.etapa}>
              <h2>Seus dados básicos</h2>
              <p>Informe seus dados para envio pelo WhatsApp.</p>
              <div className={styles.form}>
                <div className="form-group"><label className="form-label" htmlFor="nome">Nome *</label><input id="nome" type="text" className="form-input" placeholder="Seu nome completo" value={nome} onChange={(e) => setNome(e.target.value)} /></div>
                <div className="form-group"><label className="form-label" htmlFor="whatsapp">WhatsApp *</label><input id="whatsapp" type="tel" className="form-input" placeholder="(68) 99999-9999" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} /></div>
                <div className="form-group"><label className="form-label" htmlFor="cidade">Cidade</label><input id="cidade" type="text" className="form-input" placeholder="Ex: Rio Branco/AC" value={cidade} onChange={(e) => setCidade(e.target.value)} /></div>
                <div className="form-group"><label className="form-label" htmlFor="descricao">Breve descrição do caso</label><textarea id="descricao" className="form-input" placeholder="Descreva resumidamente sua situação..." value={descricao} onChange={(e) => setDescricao(e.target.value)} rows={3} /></div>
                <div className="form-group"><label className="form-label">Possui documentos?</label>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button className={`${styles.opcaoBtn} ${temDocumentos === 'Sim' ? styles.opcaoSelecionada : ''}`} onClick={() => setTemDocumentos('Sim')} type="button">Sim</button>
                    <button className={`${styles.opcaoBtn} ${temDocumentos === 'Não' ? styles.opcaoSelecionada : ''}`} onClick={() => setTemDocumentos('Não')} type="button">Não</button>
                  </div>
                </div>
                <p className={styles.privacidade}>🔒 Seus dados serão enviados diretamente pelo WhatsApp. Não armazenamos informações neste formulário.</p>
                <button className={`btn btn-whatsapp btn-lg ${styles.enviarBtn}`} onClick={enviar} disabled={!nome.trim() || !whatsapp.trim()}>
                  <Icon name="MessageCircle" size={18} />
                  Enviar pelo WhatsApp
                </button>
              </div>
              <button className={styles.voltarBtn} onClick={() => setEtapa('perguntas')}>
                 <Icon name="ArrowRight" size={14} style={{ transform: 'rotate(180deg)' }} /> Voltar
               </button>
            </div>
          )}

          {/* ETAPA 4 */}
          {etapa === 'resultado' && (
            <div className={`${styles.etapa} ${styles.resultado}`}>
              <div className={styles.resultadoIcone}><Icon name="Check" size={64} className="text-dourado" style={{ margin: '0 auto' }} /></div>
              <h2>Informações enviadas</h2>
              <p>Seu caso pode merecer análise jurídica individualizada. Há indícios que precisam ser verificados por um profissional habilitado.</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--cinza-texto)' }}>Cada caso depende de análise documental. Suas informações foram direcionadas para o WhatsApp do escritório.</p>
              <div className={styles.resultadoBtns}>
                <a href={`https://wa.me/${SITE_CONFIG.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg">Abrir WhatsApp</a>
                <Link href="/" className="btn btn-outline">Voltar ao início</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
