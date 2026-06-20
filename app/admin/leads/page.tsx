'use client';
import { useState, useEffect } from 'react';
import styles from './leads.module.css';

const LEADS_MOCK = [
  { id: '1', nome: 'Maria Aparecida S.', telefone: '(68) 99111-2222', area: 'Aposentadoria Rural', respostas: { idade: '60+ anos (homem)', trabalho: 'Sim, como agricultor/a familiar', documentos: 'Tenho apenas alguns', inss: 'Sim, foi negado' }, status: 'Novo', criadoEm: '2026-06-09' },
  { id: '2', nome: 'João Batista F.', telefone: '(68) 99333-4444', area: 'BPC/LOAS', respostas: { idade: '65 anos ou mais', deficiencia: 'Não', renda: 'Sim', tentativa: 'Sim, foi negado' }, status: 'Em Atendimento', criadoEm: '2026-06-08' },
  { id: '3', nome: 'Ana Claudia M.', telefone: '(68) 99555-6666', area: 'Energisa Acre', respostas: { problema: 'Conta muito alta / cobrança abusiva', valor: 'Entre R$500 e R$2.000', reclamacao: 'Sim, reclamei e não resolvi', dano: 'Sim' }, status: 'Concluído', criadoEm: '2026-06-07' },
  { id: '4', nome: 'Francisco A.', telefone: '(68) 99777-8888', area: 'Regularização Fundiária', respostas: { tipo: 'Imóvel rural / fazenda no Acre', situacao: 'Não tem documento nenhum (posse informal)', tempo: 'Décadas (patrimônio da família)', conflito: 'Não, só quero regularizar' }, status: 'Novo', criadoEm: '2026-06-07' },
  { id: '5', nome: 'Raimunda S.', telefone: '(68) 99999-0000', area: 'Consignado Indevido', respostas: { tipo: 'Aposentado/a', desconto: 'Sim, identificado no extrato', banco: 'Não sei o banco', prejuizo: 'Mais de 2 anos' }, status: 'Em Atendimento', criadoEm: '2026-06-06' },
];

type Lead = typeof LEADS_MOCK[0];

const statusOpcoes = ['Novo', 'Em Atendimento', 'Concluído'];
const statusCor: Record<string, string> = {
  'Novo': '#0a3d20',
  'Em Atendimento': '#b8860b',
  'Concluído': '#8fa898',
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(LEADS_MOCK);
  const [leadSelecionado, setLeadSelecionado] = useState<Lead | null>(null);
  const [filtroStatus, setFiltroStatus] = useState('Todos');
  const [busca, setBusca] = useState('');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    fetch('/api/triage')
      .then(res => res.json())
      .then(data => {
        if (data.leads && data.leads.length > 0) {
          const apiLeads = data.leads.map((l: any) => ({
            id: l.id,
            nome: l.nome,
            telefone: l.telefone,
            area: l.area,
            respostas: l.respostas,
            status: l.status || 'Novo',
            criadoEm: l.criadoEm ? l.criadoEm.split('T')[0] : new Date().toISOString().split('T')[0]
          }));
          // Mescla leads novos da API com o mock
          setLeads([...apiLeads, ...LEADS_MOCK]);
        }
        setCarregando(false);
      })
      .catch(err => {
        console.error('Erro ao buscar leads:', err);
        setCarregando(false);
      });
  }, []);

  const leadsFiltrados = leads.filter(l => {
    const matchStatus = filtroStatus === 'Todos' || l.status === filtroStatus;
    const matchBusca = l.nome.toLowerCase().includes(busca.toLowerCase()) || l.area.toLowerCase().includes(busca.toLowerCase());
    return matchStatus && matchBusca;
  });

  function atualizarStatus(id: string, novoStatus: string) {
    setLeads(leads.map(l => l.id === id ? { ...l, status: novoStatus } : l));
    if (leadSelecionado?.id === id) setLeadSelecionado({ ...leadSelecionado, status: novoStatus });
  }

  function exportarCSV() {
    const headers = ['Nome', 'Telefone', 'Área', 'Status', 'Data'];
    const rows = leads.map(l => [l.nome, l.telefone, l.area, l.status, l.criadoEm]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'leads.csv'; a.click();
  }

  const whatsappLead = (lead: Lead) => `https://wa.me/${lead.telefone.replace(/\D/g, '')}?text=Olá ${lead.nome.split(' ')[0]}! Sou o Dr. Márcio França. Vi seu contato sobre ${lead.area} e gostaria de conversar.`;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.filtros}>
          {['Todos', ...statusOpcoes].map(s => (
            <button key={s} className={`${styles.filtroBtn} ${filtroStatus === s ? styles.filtroBtnAtivo : ''}`} onClick={() => setFiltroStatus(s)}>{s}</button>
          ))}
        </div>
        <div className={styles.headerAcoes}>
          <input type="text" className="form-input" placeholder="Buscar leads..." value={busca} onChange={e => setBusca(e.target.value)} style={{ maxWidth: '220px' }} />
          <button className="btn btn-outline btn-sm" onClick={exportarCSV}>Exportar CSV</button>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.lista}>
          {carregando ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--cinza-texto)' }}>Carregando leads...</div>
          ) : leadsFiltrados.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--cinza-texto)' }}>Nenhum lead encontrado.</div>
          ) : (
            leadsFiltrados.map(lead => (
              <div key={lead.id} className={`${styles.leadItem} ${leadSelecionado?.id === lead.id ? styles.leadItemAtivo : ''}`} onClick={() => setLeadSelecionado(lead)}>
                <div className={styles.leadAvatar}>{lead.nome.charAt(0)}</div>
                <div className={styles.leadInfo}>
                  <strong>{lead.nome}</strong>
                  <span>{lead.area}</span>
                </div>
                <div>
                  <span className={styles.leadStatus} style={{ background: statusCor[lead.status] + '18', color: statusCor[lead.status] }}>{lead.status}</span>
                  <div className={styles.leadData}>{lead.criadoEm}</div>
                </div>
              </div>
            ))
          )}
        </div>

        {leadSelecionado && (
          <div className={styles.detalhe}>
            <div className={styles.detalheHeader}>
              <div className={styles.detalheAvatar}>{leadSelecionado.nome.charAt(0)}</div>
              <div>
                <h3>{leadSelecionado.nome}</h3>
                <span>{leadSelecionado.area}</span>
              </div>
            </div>
            <div className={styles.detalheCampos}>
              <div className={styles.campo}><label>Telefone</label><span>{leadSelecionado.telefone}</span></div>
              <div className={styles.campo}><label>Data</label><span>{leadSelecionado.criadoEm}</span></div>
              <div className={styles.campo}><label>Status</label>
                <select className="form-input" value={leadSelecionado.status} onChange={e => atualizarStatus(leadSelecionado.id, e.target.value)} style={{ padding: '0.35rem 0.75rem', fontSize: '0.875rem' }}>
                  {statusOpcoes.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className={styles.respostas}>
              <h4>Respostas da Triagem</h4>
              {Object.entries(leadSelecionado.respostas).map(([k, v]) => (
                <div key={k} className={styles.resposta}>
                  <span className={styles.respostaKey}>{k}</span>
                  <span className={styles.respostaVal}>{v}</span>
                </div>
              ))}
            </div>
            <div className={styles.detalheAcoes}>
              <a href={whatsappLead(leadSelecionado)} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ background: '#25d366', flex: 1, justifyContent: 'center' }}>
                💬 WhatsApp
              </a>
              <a href={`tel:${leadSelecionado.telefone}`} className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }}>
                📞 Ligar
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
