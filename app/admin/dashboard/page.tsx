import styles from './dashboard.module.css';

const STATS = [
  { label: 'Leads este mês', valor: '12', icone: '📋', cor: '#0a3d20' },
  { label: 'Artigos publicados', valor: '3', icone: '📝', cor: '#b8860b' },
  { label: 'Leads em atendimento', valor: '5', icone: '⚖️', cor: '#1a5276' },
  { label: 'Taxa de conversão', valor: '68%', icone: '📈', cor: '#1a7a45' },
];

const LEADS_RECENTES = [
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
  return (
    <div>
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
          <h2>Últimos Leads</h2>
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
              {LEADS_RECENTES.map((l, i) => (
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
    </div>
  );
}
