import { Metadata } from 'next';
import { projects, ProjectId } from '@/lib/projects';

interface ProjectLayoutProps {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
}

export async function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: ProjectLayoutProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects[slug as ProjectId];

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.name} - zeebuilds`,
    description: project.tagline,
  };
}

export default function ProjectLayout({ children }: ProjectLayoutProps) {
  return children;
}