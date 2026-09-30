import type { Metadata } from 'next';
import { Inter, Sora, Cormorant_Garamond } from 'next/font/google';
import { gerarSchemaEscritorio } from '@/lib/seo';
import { SITE_CONFIG } from '@/lib/data';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const sora = Sora({ subsets: ['latin'], variable: '--font-sora', display: 'swap' });
const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-cormorant', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://bpc.marciofranca.adv.br'),
  title: {
    default: 'Márcio Jr. França - Advogado BPC LOAS Rio Branco Acre | OAB/AC 2.882',
    template: `%s | ${SITE_CONFIG.nome}`,
  },
  description:
    'Informações sobre BPC/LOAS em Rio Branco e no Acre, incluindo requisitos, renda familiar, CadÚnico, avaliação biopsicossocial e análise de indeferimentos do INSS.',
  keywords: [
    'BPC LOAS Rio Branco',
    'BPC LOAS Acre',
    'BPC negado Acre',
    'BPC pessoa com deficiência Acre',
    'BPC idoso Rio Branco',
    'Bolsa Família renda BPC',
    'Márcio Jr. França advogado',
    'OAB/AC 2.882',
  ],
  authors: [{ name: SITE_CONFIG.nomeAdvogado }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: SITE_CONFIG.nome,
  },
  robots: { index: true, follow: true },
  ...(SITE_CONFIG.gscVerification && {
    verification: { google: SITE_CONFIG.gscVerification },
  }),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = gerarSchemaEscritorio();

  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* Schema.org - LegalService + Attorney + LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />

      </head>
      <body className={`${inter.variable} ${sora.variable} ${cormorant.variable}`}>
        {SITE_CONFIG.gaId && <GoogleAnalytics gaId={SITE_CONFIG.gaId} />}
        {children}
      </body>
    </html>
  );
}
