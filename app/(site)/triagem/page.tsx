import { gerarMetadata } from '@/lib/seo';
import TriagemClient from './TriagemClient';

export const metadata = gerarMetadata({
  titulo: 'Diagnóstico Jurídico Rápido',
  descricao: 'Responda algumas perguntas sobre sua situação e receba uma orientação inicial. Atendimento com o Dr. Márcio Jr. França em Rio Branco/AC.',
  slug: 'triagem',
});

export default function TriagemPage() {
  return <TriagemClient />;
}
