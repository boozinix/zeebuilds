'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/50 bg-slate-950/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="group flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-violet-500 shadow-lg"
          >
            <span className="text-lg font-bold text-white">Z</span>
          </motion.div>
          <span className="hidden sm:block text-lg font-semibold text-slate-100 group-hover:text-sky-400 transition-colors">
            Zubair
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 text-base font-medium text-slate-300">
          <Link href="/work" className="hover:text-sky-400 transition-colors relative after:absolute after:bottom-[-8px] after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-sky-400 after:to-violet-500 after:transition-all hover:after:w-full">
            Work
          </Link>
          <Link href="/about" className="hover:text-sky-400 transition-colors relative after:absolute after:bottom-[-8px] after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-sky-400 after:to-violet-500 after:transition-all hover:after:w-full">
            About
          </Link>
          <Link href="/contact" className="hover:text-sky-400 transition-colors relative after:absolute after:bottom-[-8px] after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-sky-400 after:to-violet-500 after:transition-all hover:after:w-full">
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1 p-2"
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
          <nav className="flex flex-col px-4 py-4 gap-4">
            <Link 
              href="/work" 
              className="text-slate-300 hover:text-sky-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Work
            </Link>
            <Link 
              href="/about" 
              className="text-slate-300 hover:text-sky-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="text-slate-300 hover:text-sky-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};