import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'zeebuilds – AI Product Manager & Builder',
  description:
    'Portfolio of AI-powered consumer products: Resume Tailor and Card Scout. Product manager and full-stack builder focused on careers and fintech.',
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
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
