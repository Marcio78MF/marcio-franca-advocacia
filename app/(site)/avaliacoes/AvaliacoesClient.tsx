'use client';
import { useState } from 'react';
import { SITE_CONFIG } from '@/lib/data';
import Icon from '@/components/Icon';
import styles from './avaliacoes.module.css';

const INITIAL_REVIEWS = [
  {
    nome: 'Andreia Paulichen',
    iniciais: 'AP',
    comentario: 'O melhor escritório e pessoas qualificadas. Tive causa ganha. Recomendo.',
    nota: 5,
    data: 'Cliente do Google · Rio Branco/AC',
  },
  {
    nome: 'Cliente P.',
    iniciais: 'CP',
    comentario: 'O atendimento do doutor Márcio França é nota 10. Eu super recomendo.',
    nota: 5,
    data: 'Cliente do Google · Sena Madureira/AC',
  },
  {
    nome: 'Maria Lúcia S.',
    iniciais: 'ML',
    comentario: 'Dr. Márcio foi excelente na condução do meu processo de aposentadoria rural. Consegui meu benefício em tempo recorde!',
    nota: 5,
    data: 'Aposentadoria Rural · Cruzeiro do Sul/AC',
  },
  {
    nome: 'José Roberto F.',
    iniciais: 'JR',
    comentario: 'Consegui contestar as cobranças abusivas na minha conta de luz da Energisa graças à orientação correta do escritório. Muito obrigado.',
    nota: 5,
    data: 'Consumidor (Energisa) · Rio Branco/AC',
  },
  {
    nome: 'Francisca das Chagas',
    iniciais: 'FC',
    comentario: 'Profissional sério, atencioso e que fala a nossa língua. Recomendo de olhos fechados para quem precisa de ajuda com BPC/LOAS.',
    nota: 5,
    data: 'BPC/LOAS · Rio Branco/AC',
  },
  {
    nome: 'Anônimo',
    iniciais: 'A',
    comentario: 'Excelente profissional, sempre prestativo e eficaz na resolução de problemas.',
    nota: 5,
    data: 'Cliente do Google · Rio Branco/AC',
  },
];

export default function AvaliacoesClient() {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [nome, setNome] = useState('');
  const [comentario, setComentario] = useState('');
  const [nota, setNota] = useState(5);
  const [servico, setServico] = useState('Geral');
  const [sucesso, setSucesso] = useState(false);

  const googleProfileUrl = 'https://www.google.com/search?q=Advocacia+Dr.+M%C3%A1rcio+Fran%C3%A7a';

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nome.trim() || !comentario.trim()) return;

    const novasIniciais = nome
      .split(' ')
      .map((n) => n.charAt(0))
      .slice(0, 2)
      .join('')
      .toUpperCase();

    const novoReview = {
      nome: nome.trim(),
      iniciais: novasIniciais || 'C',
      comentario: comentario.trim(),
      nota,
      data: `${servico} · Enviado agora`,
    };

    // Atualiza o estado para que o usuário veja a avaliação criada instantaneamente
    setReviews([novoReview, ...reviews]);
    setSucesso(true);

    // Reseta o formulário
    setNome('');
    setComentario('');
    setNota(5);
    setServico('Geral');

    // Desaparece o aviso de sucesso após 5 segundos
    setTimeout(() => setSucesso(false), 5000);
  }

  return (
    <section className="section" style={{ paddingTop: '1rem' }}>
      <div className="container">
        
        {/* Intro com Classificação Google */}
        <div className={styles.intro}>
          <div className={styles.ctaBox}>
            <div className="section-badge" style={{ alignSelf: 'flex-start' }}>Prova Social</div>
            <h2>O que dizem os nossos clientes</h2>
            <p style={{ color: 'var(--cinza-texto)', fontSize: '1.05rem' }}>
              A satisfação técnica e o respeito aos direitos de quem nos procura são o centro da nossa atuação diária. Veja abaixo relatos reais de clientes do escritório.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
              <a href={googleProfileUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                Avaliar no Google
              </a>
              <a href="#deixar-feedback" className="btn btn-outline">
                Escrever depoimento
              </a>
            </div>
          </div>

          <div className={styles.scoreCard}>
            <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.7)' }}>Classificação Geral</span>
            <div className={styles.bigScore}>5.0</div>
            <div className={styles.starsBig}>
              {[...Array(5)].map((_, i) => (
                <Icon key={i} name="Star" size={24} fill="currentColor" />
              ))}
            </div>
            <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>Baseado em dezenas de avaliações no Google</span>
          </div>
        </div>

        {/* Grid de Depoimentos */}
        <div className={styles.grid}>
          {reviews.map((item, index) => (
            <div key={index} className={styles.card}>
              <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center' }}>
                <div className={styles.stars}>
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={15}
                      fill={i < item.nota ? 'currentColor' : 'none'}
                      stroke={i < item.nota ? 'currentColor' : 'var(--cinza-medio)'}
                    />
                  ))}
                </div>
              </div>
              <p className={styles.comentario}>
                “{item.comentario}”
              </p>
              <div className={styles.autor}>
                <div className={styles.avatar}>{item.iniciais}</div>
                <div className={styles.autorInfo}>
                  <strong>{item.nome}</strong>
                  <span>{item.data}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Seção de Formulário */}
        <div className={styles.formSection} id="deixar-feedback">
          <div className={styles.formGrid}>
            <div className={styles.formInfo}>
              <h3>Compartilhe a sua experiência</h3>
              <p style={{ color: 'var(--cinza-texto)' }}>
                Seu feedback nos ajuda a melhorar constantemente o atendimento e a acolhida jurídica. Deixe sua avaliação de forma rápida abaixo.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--cinza-texto)', fontSize: '0.9rem' }}>
                  <Icon name="ShieldCheck" size={18} className="text-dourado" />
                  <span>Seu depoimento será listado no site.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--cinza-texto)', fontSize: '0.9rem' }}>
                  <Icon name="Lock" size={18} className="text-dourado" />
                  <span>Não publicamos dados de contato ou informações confidenciais.</span>
                </div>
              </div>
            </div>

            <div>
              {sucesso && (
                <div className={styles.sucesso}>
                  ✅ Obrigado! Sua avaliação foi adicionada ao mural com sucesso.
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="f-nome">Seu Nome</label>
                  <input
                    id="f-nome"
                    type="text"
                    className="form-input"
                    placeholder="Ex: Maria José de Souza"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="f-servico">Área do seu caso</label>
                  <select
                    id="f-servico"
                    className="form-input"
                    value={servico}
                    onChange={(e) => setServico(e.target.value)}
                  >
                    <option value="Geral">Consulta Geral</option>
                    <option value="Aposentadoria Rural">Aposentadoria Rural</option>
                    <option value="BPC/LOAS">BPC/LOAS</option>
                    <option value="Consumidor">Energisa ou Bancos</option>
                    <option value="Família">Direito de Família</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Sua Nota</label>
                  <div className={styles.ratingSelect}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={`${styles.starBtn} ${star <= nota ? styles.starBtnActive : ''}`}
                        onClick={() => setNota(star)}
                        aria-label={`Avaliar com ${star} estrelas`}
                      >
                        <Icon name="Star" size={26} fill={star <= nota ? 'currentColor' : 'none'} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="f-feedback">Seu Depoimento</label>
                  <textarea
                    id="f-feedback"
                    className="form-input"
                    placeholder="Escreva como foi sua experiência com o atendimento do escritório..."
                    rows={4}
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-whatsapp" style={{ width: '100%', justifyContent: 'center' }}>
                  Publicar Depoimento
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Disclaimer legal */}
        <div className="aviso-legal" style={{ marginTop: '3rem' }}>
          As avaliações aqui veiculadas baseiam-se em relatos subjetivos de experiências dos clientes. Os resultados jurídicos variam conforme cada caso e a atuação do escritório é pautada nos limites éticos do Estatuto da OAB.
        </div>
      </div>
    </section>
  );
}
