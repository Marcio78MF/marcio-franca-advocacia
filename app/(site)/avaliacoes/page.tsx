import Link from 'next/link';
import { gerarMetadata } from '@/lib/seo';
import AvaliacoesClient from './AvaliacoesClient';

export const metadata = gerarMetadata({
  titulo: 'Depoimentos de Clientes',
  descricao: 'Veja o que dizem os clientes do escritório Márcio França Advocacia. Avaliações reais de quem confiou no nosso trabalho em Rio Branco/AC.',
  slug: 'avaliacoes',
});

export default function AvaliacoesPage() {
  return (
    <>
      <div className="container">
        <div className="breadcrumb" style={{ paddingTop: '5.5rem' }}>
          <Link href="/">Início</Link>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">Depoimentos</span>
        </div>
      </div>

      <AvaliacoesClient />
    </>
  );
}
