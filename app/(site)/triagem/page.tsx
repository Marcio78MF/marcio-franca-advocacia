import { gerarMetadata } from '@/lib/seo';
import TriagemClient from './TriagemClient';

export const metadata = {
  ...gerarMetadata({
    titulo: 'Diagnóstico Jurídico Rápido',
    descricao: 'Formulário de triagem jurídica.',
    slug: 'triagem',
  }),
  robots: { index: false, follow: true },
};

export default function TriagemPage() {
  return <TriagemClient />;
}
