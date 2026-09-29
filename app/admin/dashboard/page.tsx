'use client';
import { useState, useEffect } from 'react';
import styles from './dashboard.module.css';

type Lead = {
  id: string;
  nome: string;
  telefone: string;
  area: string;
  status: string;
  criadoEm: string;
};

const statusCor: Record<string, string> = {
  novo: '#0a3d20',
  em_contato: '#b8860b',
  agendado: '#1a5276',
  cliente: '#1a7a45',
  encerrado: '#8fa898',
};

const statusLabel: Record<string, string> = {
  novo: 'Novo',
  em_contato: 'Em contato',
  agendado: 'Agendado',
  cliente: 'Cliente',
  encerrado: 'Encerrado',
};

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    fetch('/api/admin/leads', { cache: 'no-store' })
      .then(res => { if (!res.ok) throw new Error('Falha ao carregar leads'); return res.json(); })
      .then((triageData) => {
        if (triageData.leads) setLeads(triageData.leads);
        setCarregando(false);
      })
      .catch(err => {
        console.error('Erro ao buscar dados do dashboard:', err);
        setCarregando(false);
      });
  }, []);

  const totalLeads = leads.length;
  const leadsEmAtendimento = leads.filter(l => ['em_contato', 'agendado'].includes(l.status)).length;
  const leadsConcluidos = leads.filter(l => ['cliente', 'encerrado'].includes(l.status)).length;
  const taxaConversao = totalLeads > 0 
    ? Math.round((leadsConcluidos / totalLeads) * 100) + '%'
    : '0%';

  const STATS = [
    { label: 'Leads totais', valor: String(totalLeads), icone: '📋', cor: '#0a3d20' },
    { label: 'Leads em atendimento', valor: String(leadsEmAtendimento), icone: '⚖️', cor: '#1a5276' },
    { label: 'Clientes / encerrados', valor: String(leadsConcluidos), icone: '✅', cor: '#1a7a45' },
    { label: 'Taxa de conversão', valor: taxaConversao, icone: '📈', cor: '#1a7a45' },
  ];

  const leadsRecentes = leads.slice(0, 4).map(l => ({
    nome: l.nome,
    area: l.area,
    status: l.status || 'novo',
    data: l.criadoEm ? new Date(l.criadoEm).toLocaleDateString('pt-BR', { timeZone: 'America/Rio_Branco' }) : '—'
  }));

  return (
    <div>
      {carregando ? (
        <div style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--cinza-texto)', fontFamily: 'sans-serif' }}>
          <p>Carregando dados do painel...</p>
        </div>
      ) : (
        <>
          <div className={styles.statsGrid}>
            {STATS.map((s, i) => (
              <div key={i} className={styles.statCard} style={{ '--stat-cor': s.cor } as React.CSSProperties}>
                <div className={styles.statIcone}>{s.icone}</div>
                <div>
                  <div className={styles.statValor}>{s.valor}</div>
                  <div className={styles.statLabel}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.grid2}>
            <div className={styles.panel}>
              <h2>Últimos Leads Recebidos</h2>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Área</th>
                    <th>Status</th>
                    <th>Data</th>
                  </tr>
                </thead>
                <tbody>
                  {leadsRecentes.map((l, i) => (
                    <tr key={i}>
                      <td><strong>{l.nome}</strong></td>
                      <td>{l.area}</td>
                      <td>
                        <span className={styles.badge} style={{ background: statusCor[l.status] + '18', color: statusCor[l.status] }}>
                          {statusLabel[l.status] ?? l.status}
                        </span>
                      </td>
                      <td>{l.data}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={styles.panel}>
              <h2>Ações Rápidas</h2>
              <div className={styles.acoes}>
                <a href="/admin/leads" className={styles.acao}>
                  <span>📋</span>
                  <div>
                    <strong>Ver Leads</strong>
                    <p>Gerenciar contatos recebidos pelo formulário BPC</p>
                  </div>
                </a>
                <a href="/" target="_blank" rel="noopener noreferrer" className={styles.acao}>
                  <span>🌐</span>
                  <div>
                    <strong>Ver Landing BPC</strong>
                    <p>Abrir a página pública em nova aba</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
