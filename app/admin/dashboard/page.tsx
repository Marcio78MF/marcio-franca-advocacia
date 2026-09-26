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
  const [posts, setPosts] = useState<Post[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/leads', { cache: 'no-store' }).then(res => { if (!res.ok) throw new Error('Falha ao carregar leads'); return res.json(); }),
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
  const leadsEmAtendimento = leads.filter(l => ['em_contato', 'agendado'].includes(l.status)).length;
  const leadsConcluidos = leads.filter(l => ['cliente', 'encerrado'].includes(l.status)).length;
  const taxaConversao = totalLeads > 0 
    ? Math.round((leadsConcluidos / totalLeads) * 100) + '%'
    : '0%';

  const totalPostsPublicados = posts.filter(p => p.publicado).length;

  const STATS = [
    { label: 'Leads totais', valor: String(totalLeads), icone: '📋', cor: '#0a3d20' },
    { label: 'Artigos publicados', valor: String(totalPostsPublicados || 10), icone: '📝', cor: '#b8860b' },
    { label: 'Leads em atendimento', valor: String(leadsEmAtendimento), icone: '⚖️', cor: '#1a5276' },
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
