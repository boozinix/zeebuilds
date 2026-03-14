export const Footer = () => (
  <footer className="border-t border-slate-800">
    <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-4 py-5 text-center text-xs text-slate-500 sm:flex-row sm:justify-between sm:gap-0 sm:text-left">
      <span>© {new Date().getFullYear()} Zubair Nizami</span>
      <span>Built with Next.js • Deployed on Vercel</span>
    </div>
  </footer>
);