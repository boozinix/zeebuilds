export const Footer = () => (
  <footer className="border-t border-slate-800">
    <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-4 py-5 text-center text-xs text-slate-500 sm:flex-row sm:justify-between sm:gap-0 sm:text-left">
      <span>© {new Date().getFullYear()} Zubair Nizami</span>
      <div className="flex items-center gap-3">
        <a
          href="https://linkedin.com/in/zubairnizami"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-slate-300 transition-colors"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/boozinix"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-slate-300 transition-colors"
        >
          GitHub
        </a>
        <span className="hidden sm:inline">•</span>
        <span>Built with Next.js • Deployed on Vercel</span>
      </div>
    </div>
  </footer>
);