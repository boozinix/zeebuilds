import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Work – Zubair Nizami | AI PM Portfolio',
  description:
    'Portfolio of live AI products built solo: ApplyStudio, Card Scout, and Neural Mob.',
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}