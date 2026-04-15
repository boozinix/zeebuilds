import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PageTransition } from '@/components/PageTransition';
import { ParallaxBackground } from '@/components/ParallaxBackground';
import { IntroGate } from '@/components/IntroGate';
import { SocialRail } from '@/components/SocialRail';
import { OpenToWork } from '@/components/OpenToWork';
import { ScrollProgress } from '@/components/ScrollProgress';
import { Analytics } from '@vercel/analytics/react';
import { Sora, JetBrains_Mono } from 'next/font/google';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  weight: ['400', '600', '700', '800'],
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400', '500'],
  display: 'swap',
});

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
    <html lang="en" className={`${sora.variable} ${jetbrains.variable}`}>
      <body className="bg-zinc-950 text-zinc-50 antialiased">
        <IntroGate>
          <ScrollProgress />
          <SocialRail />
          <OpenToWork />
          <a href="#main-content" className="skip-to-content">
            Skip to main content
          </a>
          <ParallaxBackground />
          <div className="relative min-h-screen flex flex-col bg-[#080d1a]" style={{ zIndex: 1 }}>
            <Navbar />
            <main id="main-content" className="flex-1">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </div>
        </IntroGate>
        <Analytics />
      </body>
    </html>
  );
}
