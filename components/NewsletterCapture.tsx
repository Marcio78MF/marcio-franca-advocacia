'use client';
import { useState, FormEvent } from 'react';
import styles from './NewsletterCapture.module.css';

export default function NewsletterCapture() {
  const [email, setEmail] = useState('');
  const [sucesso, setSucesso] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    const stored = localStorage.getItem('newsletter-emails');
    const emails: string[] = stored ? JSON.parse(stored) : [];
    if (!emails.includes(email.trim())) {
      emails.push(email.trim());
      localStorage.setItem('newsletter-emails', JSON.stringify(emails));
    }

    setSucesso(true);
    setEmail('');
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.inner}>
        <h2 className={styles.titulo}>Receba orientações jurídicas gratuitas</h2>
        <p className={styles.subtexto}>Cadastre-se e receba conteúdos sobre seus direitos. Sem spam.</p>

        {sucesso ? (
          <p className={styles.sucessoMsg}>E-mail cadastrado com sucesso!</p>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
            />
            <button type="submit" className={`btn btn-dourado ${styles.botao}`}>
              Cadastrar
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
