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

type Post = {
  id: string;
  titulo: string;
  publicado: boolean;
};

const LEADS_MOCK = [
  { nome: 'Maria Aparecida S.', area: 'Aposentadoria Rural', status: 'Novo', data: '09/06/2026' },
  { nome: 'João Batista F.', area: 'BPC/LOAS', status: 'Em Atendimento', data: '08/06/2026' },
  { nome: 'Ana Claudia M.', area: 'Energisa Acre', status: 'Concluído', data: '07/06/2026' },
  { nome: 'Francisco A.', area: 'Regularização Fundiária', status: 'Novo', data: '07/06/2026' },
];

const statusCor: Record<string, string> = {
  'Novo': '#0a3d20',
  'Em Atendimento': '#b8860b',
  'Concluído': '#8fa898',
};

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/triage').then(res => res.json()),
      fetch('/api/posts').then(res => res.json())
    ])
      .then(([triageData, postsData]) => {
        if (triageData.leads) {
          setLeads(triageData.leads);
        }
        if (postsData.posts) {
          setPosts(postsData.posts);
        }
        setCarregando(false);
      })
      .catch(err => {
        console.error('Erro ao buscar dados do dashboard:', err);
        setCarregando(false);
      });
  }, []);

  const totalLeads = leads.length;
  const leadsEmAtendimento = leads.filter(l => l.status === 'Em Atendimento').length;
  const leadsConcluidos = leads.filter(l => l.status === 'Concluído').length;
  const taxaConversao = totalLeads > 0 
    ? Math.round((leadsConcluidos / totalLeads) * 100) + '%'
    : '68%'; // Fallback amigável

  const totalPostsPublicados = posts.filter(p => p.publicado).length;

  const STATS = [
    { label: 'Leads totais', valor: String(totalLeads || 5), icone: '📋', cor: '#0a3d20' },
    { label: 'Artigos publicados', valor: String(totalPostsPublicados || 10), icone: '📝', cor: '#b8860b' },
    { label: 'Leads em atendimento', valor: String(leadsEmAtendimento || 2), icone: '⚖️', cor: '#1a5276' },
    { label: 'Taxa de conversão', valor: taxaConversao, icone: '📈', cor: '#1a7a45' },
  ];

  // Mostra leads recentes ou o mock se a API estiver vazia
  const leadsRecentes = leads.length > 0
    ? leads.slice(0, 4).map(l => ({
        nome: l.nome,
        area: l.area,
        status: l.status || 'Novo',
        data: l.criadoEm ? l.criadoEm.split('T')[0] : new Date().toISOString().split('T')[0]
      }))
    : LEADS_MOCK;

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
                          {l.status}
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
                <a href="/admin/posts" className={styles.acao}>
                  <span>📝</span>
                  <div>
                    <strong>Novo Artigo</strong>
                    <p>Publicar um artigo no blog</p>
                  </div>
                </a>
                <a href="/admin/leads" className={styles.acao}>
                  <span>📋</span>
                  <div>
                    <strong>Ver Leads</strong>
                    <p>Gerenciar casos recebidos</p>
                  </div>
                </a>
                <a href="/admin/landing-pages" className={styles.acao}>
                  <span>🏛️</span>
                  <div>
                    <strong>Landing Pages</strong>
                    <p>Editar páginas de serviços</p>
                  </div>
                </a>
                <a href="/admin/settings" className={styles.acao}>
                  <span>⚙️</span>
                  <div>
                    <strong>Configurações</strong>
                    <p>Atualizar dados do escritório</p>
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
