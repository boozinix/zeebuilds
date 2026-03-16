import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PageTransition } from '@/components/PageTransition';

const SITE_URL = 'https://zeebuilds.com';

export const metadata: Metadata = {
  title: 'zeebuilds – AI Product Manager & Builder',
  description:
    'AI PM & builder. Shipped Resume Tailor and Card Scout. Open to AI PM roles and product collaboration. zeebuilds.',
  openGraph: {
    title: 'zeebuilds – AI Product Manager & Builder',
    description:
      'AI PM & builder. Shipped Resume Tailor and Card Scout. Open to AI PM roles and product collaboration. zeebuilds.',
    url: SITE_URL,
    siteName: 'zeebuilds',
    images: [{ url: `${SITE_URL}/og.png`, width: 1200, height: 630, alt: 'Zubair Nizami – AI PM & Builder' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'zeebuilds – AI Product Manager & Builder',
    description:
      'AI PM & builder. Shipped Resume Tailor and Card Scout. Open to AI PM roles and product collaboration. zeebuilds.',
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
