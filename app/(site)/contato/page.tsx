import { gerarMetadata } from '@/lib/seo';
import ContatoClient from './ContatoClient';

export const metadata = {
  ...gerarMetadata({
    titulo: 'Contato',
    descricao: 'Entre em contato com o escritório Márcio Jr. França Advocacia em Rio Branco/AC. Atendimento por WhatsApp, telefone ou e-mail.',
    slug: 'contato',
  }),
  robots: { index: false, follow: true },
};

export default function ContatoPage() {
  return <ContatoClient />;
}
