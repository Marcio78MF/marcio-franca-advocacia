import type { Metadata } from 'next';
import { gerarSchemaEscritorio } from '@/lib/seo';
import { SITE_CONFIG } from '@/lib/data';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://marciofranca.adv.br'),
  title: {
    default: `${SITE_CONFIG.nome} | ${SITE_CONFIG.oab} | Rio Branco/AC`,
    template: `%s | ${SITE_CONFIG.nome}`,
  },
  description: SITE_CONFIG.descricao,
  keywords: ['advogado Rio Branco', 'advogado Acre', 'OAB/AC 2882', 'direito previdenciário Acre', 'Dr. Márcio França advogado'],
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
        {/* Google Fonts: Sora + Inter */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap"
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
        {/* Microsoft Clarity */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "x9u360bufp");`,
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
