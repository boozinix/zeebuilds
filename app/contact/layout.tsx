import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Let's Talk – Zubair Nizami",
  description:
    'Contact Zubair Nizami — AI PM actively looking for roles in consumer AI and fintech.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}