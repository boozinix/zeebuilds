export const Footer = () => (
  <footer className="border-t border-slate-800/50 mt-auto">
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-sm font-bold text-white mb-1">Zubair Nizami</p>
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-slate-400">
            AI Product Manager · Builder
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:items-end">
          <div className="flex items-center gap-6">
            <a
              href="https://linkedin.com/in/zubairnizami"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Zubair's LinkedIn profile"
              className="font-mono text-xs uppercase tracking-[0.15em] text-slate-300 hover:text-sky-400 transition-colors duration-200 min-h-[44px] flex items-center"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/boozinix"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Zubair's GitHub profile"
              className="font-mono text-xs uppercase tracking-[0.15em] text-slate-300 hover:text-sky-400 transition-colors duration-200 min-h-[44px] flex items-center"
            >
              GitHub
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Zubair's resume PDF"
              className="font-mono text-xs uppercase tracking-[0.15em] text-slate-300 hover:text-sky-400 transition-colors duration-200 min-h-[44px] flex items-center"
            >
              Resume
            </a>
          </div>
          <p className="font-mono text-xs text-slate-600">
            © {new Date().getFullYear()} · Built with Next.js · Deployed on Vercel
          </p>
        </div>
      </div>
    </div>
  </footer>
);
