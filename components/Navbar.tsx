'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/',        label: 'Home'    },
  { href: '/work',    label: 'Work'    },
  { href: '/about',   label: 'About'   },
  { href: '/contact', label: 'Contact' },
] as const;

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setIsOpen(false); }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/40 bg-[#080d1a]/90 backdrop-blur-xl safe-area-inset-top">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">

        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5" aria-label="Home">
          <div
            key={pathname}
            className="z-logo-spin flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 via-violet-500 to-fuchsia-500 shadow-md shadow-violet-500/20"
          >
            <span className="text-sm font-black text-white leading-none">Z</span>
          </div>
          <span className="font-display text-base font-bold text-white group-hover:text-sky-400 transition-colors duration-200">
            Zubair
          </span>
        </Link>

        {/* Desktop nav — mono text, uppercase, no icons */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navItems.map(({ href, label }) => {
            const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`font-mono text-[11px] uppercase tracking-[0.15em] transition-colors duration-200 ${
                  isActive ? 'text-sky-400' : 'text-slate-300 hover:text-white'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile hamburger — 44px touch target */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-[5px] rounded-lg hover:bg-slate-800/60 transition-colors duration-200"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          <span className={`h-px w-5 bg-zinc-400 transition-all duration-200 ${isOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
          <span className={`h-px w-5 bg-zinc-400 transition-all duration-200 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`h-px w-5 bg-zinc-400 transition-all duration-200 ${isOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <nav
          className="md:hidden border-t border-slate-800/40 bg-[#080d1a]/95 backdrop-blur-xl"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col px-4 py-3 gap-0.5">
            {navItems.map(({ href, label }) => {
              const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`font-mono text-[11px] uppercase tracking-[0.15em] min-h-[48px] flex items-center px-2 transition-colors duration-200 ${
                    isActive ? 'text-sky-400' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
};
