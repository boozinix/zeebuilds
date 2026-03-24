'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Home, Briefcase, User, Mail } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home', Icon: Home },
  { href: '/work', label: 'Work', Icon: Briefcase },
  { href: '/about', label: 'About', Icon: User },
  { href: '/contact', label: 'Contact', Icon: Mail },
] as const;

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Fix 5: close hamburger menu on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/50 bg-slate-950/90 backdrop-blur-xl safe-area-inset-top">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:py-4">
        <Link href="/" className="group flex items-center gap-2">
          <div
            key={pathname}
            className="z-logo-spin flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-violet-500 shadow-lg"
          >
            <span className="text-lg font-bold text-white">Z</span>
          </div>
          <span className="text-lg font-semibold text-slate-100 group-hover:text-violet-400 transition-colors">
            Zubair
          </span>
        </Link>
        
        {/* Desktop Navigation: Home, Work, About, Contact with icons + active box */}
        <nav className="hidden md:flex items-center gap-1 text-base font-medium">
          {navItems.map(({ href, label, Icon }) => {
            const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 transition-colors ${
                  isActive
                    ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                    : 'text-slate-300 hover:text-violet-300 hover:bg-violet-500/10'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" strokeWidth={isActive ? 2.25 : 1.75} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button - 44px min touch target */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-1 rounded-lg active:bg-slate-800/50"
          aria-label="Toggle menu"
        >
          <span className={`h-0.5 w-5 bg-slate-300 transition-all ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
          <span className={`h-0.5 w-5 bg-slate-300 transition-all ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-5 bg-slate-300 transition-all ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur">
          <nav className="flex flex-col px-3 py-3 gap-0.5 sm:px-4 sm:py-4 sm:gap-1">
            {navItems.map(({ href, label, Icon }) => {
              const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`inline-flex min-h-[48px] items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                    isActive
                      ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                      : 'text-slate-300 hover:text-violet-300 hover:bg-violet-500/10'
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};