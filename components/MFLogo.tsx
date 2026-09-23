/**
 * Monograma MF — Márcio Jr. França Advocacia
 * SVG puro (sem dependências), com gradientes prata (M) e azul (F)
 * e traço curvo de fundo. Escala pelo prop `size`.
 */

type Props = {
  size?: number;
  /** Exibe o nome e a inscrição da OAB ao lado do monograma. */
  comNome?: boolean;
  /** Usa tons claros para fundos escuros. */
  claro?: boolean;
  className?: string;
};

export default function MFLogo({ size = 48, comNome = false, claro = false, className }: Props) {
  const uid = `mf-${size}-${claro ? 'l' : 'd'}`;

  const marca = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="Monograma MF — Márcio Jr. França Advocacia"
      className={className}
    >
      <defs>
        <linearGradient id={`${uid}-prata`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e8e8e8" />
          <stop offset="50%" stopColor="#c0c0c0" />
          <stop offset="100%" stopColor="#8a8a8a" />
        </linearGradient>
        <linearGradient id={`${uid}-azul`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2a5f8f" />
          <stop offset="100%" stopColor="#1e4a7a" />
        </linearGradient>
        <linearGradient id={`${uid}-traco`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#c9a84c" stopOpacity="0" />
          <stop offset="45%" stopColor="#c9a84c" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#c0c0c0" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      {/* Traço curvo fino ao fundo */}
      <path
        d="M4 46C16 52 30 50 40 40S56 16 60 12"
        fill="none"
        stroke={`url(#${uid}-traco)`}
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      {/* M — prata metálico */}
      <path
        d="M8 48V17h6.6l9.7 20 9.7-20H40v31h-6V29.5L26.9 44h-5.2L14.6 29.5V48H8Z"
        fill={`url(#${uid}-prata)`}
      />

      {/* F — azul, sobreposto ao M */}
      <path
        d="M34 52V21h20v6H40.6v6.6h11.7v6H40.6V52H34Z"
        fill={`url(#${uid}-azul)`}
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="0.6"
      />
    </svg>
  );

  if (!comNome) return marca;

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem' }}>
      {marca}
      <span style={{ display: 'grid', lineHeight: 1.15 }}>
        <span
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: size * 0.46,
            fontWeight: 600,
            letterSpacing: '0.01em',
            color: claro ? '#ffffff' : '#0a0a0a',
          }}
        >
          Márcio Jr. França
        </span>
        <span
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: size * 0.2,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: claro ? '#c0c0c0' : '#2a6496',
          }}
        >
          Advocacia · OAB/AC 2.882
        </span>
      </span>
    </span>
  );
}
