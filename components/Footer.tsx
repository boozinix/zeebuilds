export const Footer = () => (
  <footer className="border-t border-slate-800">
    <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 text-xs text-slate-500">
      <span>© {new Date().getFullYear()} Zubair Nizami</span>
      <span>Built with Next.js • Deployed on Vercel</span>
    </div>
  </footer>
);