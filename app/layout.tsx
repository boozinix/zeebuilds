import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PageTransition } from '@/components/PageTransition';

const SITE_URL = 'https://zubairnizami.com';

export const metadata: Metadata = {
  title: 'Zubair Nizami – AI Product Manager | Builder',
  description:
    'AI Product Manager with experience at AWS, Meta, Zoox, and Apple. Builder of three live consumer AI products. Open to AI PM roles.',
  openGraph: {
    title: 'Zubair Nizami – AI Product Manager | Builder',
    description:
      'AI Product Manager with experience at AWS, Meta, Zoox, and Apple. Builder of three live consumer AI products. Open to AI PM roles.',
    url: SITE_URL,
    siteName: "Zubair Nizami's Portfolio",
    images: [{ url: `${SITE_URL}/og.png`, width: 1200, height: 630, alt: 'Zubair Nizami – AI PM & Builder' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zubair Nizami – AI Product Manager | Builder',
    description:
      'AI Product Manager with experience at AWS, Meta, Zoox, and Apple. Builder of three live consumer AI products. Open to AI PM roles.',
  },
  icons: {
    icon: [{ url: '/icon', type: 'image/png', sizes: '32x32' }],
    shortcut: [{ url: '/icon', type: 'image/png' }],
    apple: [{ url: '/icon', type: 'image/png', sizes: '32x32' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-50 antialiased">
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main id="main-content" className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
