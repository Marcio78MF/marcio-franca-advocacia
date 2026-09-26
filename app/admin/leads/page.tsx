'use client';

import { useEffect, useMemo, useState } from 'react';
import styles from './leads.module.css';

type Lead = {
  id: string;
  nome: string;
  telefone: string;
  area: string;
  situacao: string;
  source: string;
  status: string;
  criadoEm: string | null;
};

const statusOpcoes = [
  ['novo', 'Novo'],
  ['em_contato', 'Em contato'],
  ['agendado', 'Agendado'],
  ['cliente', 'Cliente'],
  ['encerrado', 'Encerrado'],
] as const;

const statusLabel = Object.fromEntries(statusOpcoes) as Record<string, string>;

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selecionado, setSelecionado] = useState<Lead | null>(null);
  const [filtro, setFiltro] = useState('todos');
  const [busca, setBusca] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    fetch('/api/admin/leads', { cache: 'no-store' })
      .then(async res => {
        if (!res.ok) throw new Error('Falha ao carregar leads');
        return res.json();
      })
      .then(data => setLeads(data.leads ?? []))
      .catch(() => setErro('Não foi possível carregar os leads.'))
      .finally(() => setCarregando(false));
  }, []);

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return leads.filter(lead => {
      const matchStatus = filtro === 'todos' || lead.status === filtro;
      const matchBusca = !termo || [lead.nome, lead.telefone, lead.area, lead.situacao]
        .some(valor => valor?.toLowerCase().includes(termo));
      return matchStatus && matchBusca;
    });
  }, [leads, filtro, busca]);

  async function atualizarStatus(id: string, status: string) {
    const anterior = leads;
    setLeads(leads.map(l => l.id === id ? { ...l, status } : l));
    if (selecionado?.id === id) setSelecionado({ ...selecionado, status });

    const res = await fetch('/api/admin/leads', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });

    if (!res.ok) {
      setLeads(anterior);
      const original = anterior.find(l => l.id === id);
      if (original && selecionado?.id === id) setSelecionado(original);
      setErro('Não foi possível atualizar o status.');
    }
  }

  function dataLead(valor: string | null) {
    if (!valor) return '—';
    return new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short',
      timeZone: 'America/Rio_Branco',
    }).format(new Date(valor));
  }

  function exportarCSV() {
    const esc = (v: string) => `"${String(v ?? '').replaceAll('"', '""')}"`;
    const rows = leads.map(l => [l.nome, l.telefone, l.area, l.situacao, statusLabel[l.status] ?? l.status, dataLead(l.criadoEm)]);
    const csv = [['Nome', 'Telefone', 'Área', 'Situação', 'Status', 'Data'], ...rows]
      .map(row => row.map(esc).join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leads-bpc.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  const whatsapp = (lead: Lead) => {
    const telefone = lead.telefone.replace(/\D/g, '');
    const numero = telefone.startsWith('55') ? telefone : `55${telefone}`;
    return `https://wa.me/${numero}?text=${encodeURIComponent(`Olá ${lead.nome.split(' ')[0]}, sou o Dr. Márcio Jr. França. Recebi seu contato sobre BPC/LOAS e gostaria de conversar.`)}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.filtros}>
          <button className={`${styles.filtroBtn} ${filtro === 'todos' ? styles.filtroBtnAtivo : ''}`} onClick={() => setFiltro('todos')}>Todos</button>
          {statusOpcoes.map(([valor, label]) => (
            <button key={valor} className={`${styles.filtroBtn} ${filtro === valor ? styles.filtroBtnAtivo : ''}`} onClick={() => setFiltro(valor)}>{label}</button>
          ))}
        </div>
        <div className={styles.headerAcoes}>
          <input type="search" className="form-input" placeholder="Nome, telefone ou situação..." value={busca} onChange={e => setBusca(e.target.value)} style={{ maxWidth: 260 }} />
          <button className="btn btn-outline btn-sm" onClick={exportarCSV}>Exportar CSV</button>
        </div>
      </div>

      {erro && <div style={{ padding: '1rem', marginBottom: '1rem', background: '#fff3f3' }}>{erro}</div>}

      <div className={styles.grid}>
        <div className={styles.lista}>
          {carregando ? (
            <div style={{ padding: '2rem', textAlign: 'center' }}>Carregando leads...</div>
          ) : filtrados.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center' }}>Nenhum lead encontrado.</div>
          ) : filtrados.map(lead => (
            <div key={lead.id} className={`${styles.leadItem} ${selecionado?.id === lead.id ? styles.leadItemAtivo : ''}`} onClick={() => setSelecionado(lead)}>
              <div className={styles.leadAvatar}>{lead.nome.charAt(0).toUpperCase()}</div>
              <div className={styles.leadInfo}>
                <strong>{lead.nome}</strong>
                <span>{lead.situacao || lead.area}</span>
              </div>
              <div>
                <span className={styles.leadStatus}>{statusLabel[lead.status] ?? lead.status}</span>
                <div className={styles.leadData}>{dataLead(lead.criadoEm)}</div>
              </div>
            </div>
          ))}
        </div>

        {selecionado && (
          <div className={styles.detalhe}>
            <div className={styles.detalheHeader}>
              <div className={styles.detalheAvatar}>{selecionado.nome.charAt(0).toUpperCase()}</div>
              <div><h3>{selecionado.nome}</h3><span>{selecionado.area}</span></div>
            </div>
            <div className={styles.detalheCampos}>
              <div className={styles.campo}><label>Telefone</label><span>{selecionado.telefone}</span></div>
              <div className={styles.campo}><label>Recebido</label><span>{dataLead(selecionado.criadoEm)}</span></div>
              <div className={styles.campo}><label>Situação informada</label><span>{selecionado.situacao || '—'}</span></div>
              <div className={styles.campo}>
                <label>Status</label>
                <select className="form-input" value={selecionado.status} onChange={e => atualizarStatus(selecionado.id, e.target.value)}>
                  {statusOpcoes.map(([valor, label]) => <option key={valor} value={valor}>{label}</option>)}
                </select>
              </div>
            </div>
            <div className={styles.detalheAcoes}>
              <a href={whatsapp(selecionado)} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>WhatsApp</a>
              <a href={`tel:${selecionado.telefone}`} className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }}>Ligar</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
