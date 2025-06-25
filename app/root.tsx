import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';
import { NotFound } from './components/NotFound';

import './tailwind.css';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk-UA">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-YGBMJB4LZ6`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-YGBMJB4LZ6', {
  page_path: window.location.pathname,
  });
  `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Nymphaea Shop - магазин німфей, водяних лілій',
              image: 'https://i.imgur.com/HdYxAgW.jpg',
              url: 'https://nymphaea.shop',
            }),
          }}
        />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export const links: LinksFunction = () => [
  { rel: 'manifest', href: '/manifest.json' },
  { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
  { rel: 'canonical', href: 'https://nymphaea.shop/' },
  { rel: 'alternate', hrefLang: 'x-default', href: 'https://nymphaea.shop/' },
];

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  return <NotFound />;
}
