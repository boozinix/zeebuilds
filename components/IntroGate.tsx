'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'intro-gate-seen';

export function IntroGate({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Skip if already seen this session
    if (sessionStorage.getItem(STORAGE_KEY)) {
      setShow(false);
      return;
    }
    setShow(true);
  }, []);

  // Respect prefers-reduced-motion
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function handleEnter() {
    sessionStorage.setItem(STORAGE_KEY, '1');
    if (prefersReduced) {
      setShow(false);
      return;
    }
    setExiting(true);
    setShow(false); // Removes child from AnimatePresence → triggers exit animation
  }

  // If not showing, render children directly
  if (!show && !exiting) return <>{children}</>;

  return (
    <>
      <AnimatePresence
        onExitComplete={() => {
          setShow(false);
          setExiting(false);
        }}
      >
        {show && (
          <motion.div
            key="intro-gate"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#080d1a]"
          >
            {/* Z logo */}
            <div
              className="mb-8 text-7xl font-black"
              style={{
                background: 'linear-gradient(135deg, #38bdf8, #a78bfa, #e879f9)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Z
            </div>

            {/* Enter button */}
            <button
              onClick={handleEnter}
              className="group relative inline-flex items-center justify-center rounded-full px-10 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #7C3AED, #2563EB)',
              }}
            >
              <span className="relative z-10">Enter</span>
            </button>

            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-slate-600">
              Zubair Nizami · Portfolio
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Children visible once overlay is gone */}
      <div style={{ visibility: exiting ? 'hidden' : 'visible' }}>{children}</div>
    </>
  );
}
