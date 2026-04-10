import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Work – Zubair Nizami',
  description:
    'Selected AI-powered products I designed and built end-to-end: ApplyStudio, Card Scout, and Neural Mob. Full case studies with technical details and outcomes.',
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}