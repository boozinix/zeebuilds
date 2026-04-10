import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About – Zubair Nizami | AI PM at AWS, Meta, Zoox',
  description:
    'Senior AI PM with a decade at Apple, Zoox, Meta, and AWS. Now building and shipping consumer AI tools independently.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}