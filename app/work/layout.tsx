import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Work - zeebuilds',
  description: 'Selected AI-powered products I designed and built end-to-end: Resume Tailor and Card Scout. Full case studies with technical details and outcomes.',
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}