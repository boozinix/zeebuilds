import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - zeebuilds',
  description: 'AI Product Manager and full-stack builder focused on careers and fintech. Learn about my background, skills, and experience building consumer products.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}