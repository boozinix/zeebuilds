import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact – Zubair Nizami',
  description: 'Get in touch about AI PM roles, product collaboration, or interesting conversations about building consumer products.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}