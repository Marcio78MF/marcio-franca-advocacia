import type { Metadata } from 'next';
import { gerarSchemaEscritorio } from '@/lib/seo';
import { SITE_CONFIG } from '@/lib/data';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://marciofrancaadvocacia.com.br'),
  title: {
    default: 'Márcio Jr. França - Advogado BPC LOAS Rio Branco Acre | OAB/AC 2.882',
    template: `%s | ${SITE_CONFIG.nome}`,
  },
  description:
    'BPC/LOAS negado? Márcio Jr. França, OAB/AC 2.882, atua na revisão de indeferimentos do INSS no Acre. A inclusão do Bolsa Família no cálculo da renda é questionável. Atuação no TJAC e no TRF1.',
  keywords: [
    'advogado BPC LOAS Rio Branco',
    'BPC negado por renda Acre',
    'advogado previdenciário Rio Branco',
    'Bolsa Família cálculo renda BPC',
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
        {/* Google Fonts: Sora + Inter + Cormorant Garamond (marca) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=Cormorant+Garamond:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Schema.org - LegalService + Attorney + LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        {/* Google Analytics */}
        {SITE_CONFIG.gaId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${SITE_CONFIG.gaId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${SITE_CONFIG.gaId}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
