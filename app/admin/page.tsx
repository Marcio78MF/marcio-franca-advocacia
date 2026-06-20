'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErro('');
    setCarregando(true);
    // Mock auth - substituir por Supabase Auth
    setTimeout(() => {
      if (email === 'admin@marciofranca.com' && senha === 'admin123') {
        localStorage.setItem('admin_session', 'true');
        router.push('/admin/dashboard');
      } else {
        setErro('E-mail ou senha incorretos.');
        setCarregando(false);
      }
    }, 800);
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logoWrap}>
          <div className={styles.logoIcon}>MF</div>
          <div>
            <h1>Painel Administrativo</h1>
            <p>Márcio França Advocacia</p>
          </div>
        </div>
        <form onSubmit={handleLogin} className={styles.form}>
          {erro && <div className={styles.erro}>{erro}</div>}
          <div className="form-group">
            <label className="form-label" htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="admin@marciofranca.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={carregando}>
            {carregando ? 'Entrando...' : 'Entrar no Painel'}
          </button>
          <p className={styles.hint}>Credenciais padrão: admin@marciofranca.com / admin123</p>
        </form>
      </div>
    </div>
  );
}
