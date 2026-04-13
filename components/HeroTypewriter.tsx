'use client';

import { useEffect, useState } from 'react';

const LEFT  = 'AI Product Manager.';
const RIGHT = 'Solo Builder.';
// Both driven by the same step — whichever is longer dictates total duration
const MAX_STEPS = Math.max(LEFT.length, RIGHT.length); // 19

const TYPE_MS   = 38;   // ms per character (typing)
const DELETE_MS = 18;   // ms per character (deleting — faster)
const PAUSE_MS  = 15000; // ms to hold when both fully typed

/**
 * Dual typewriter — left phrase types L→R, right phrase types R→L.
 * Both share a single step counter so they're perfectly synchronized.
 * Ghost spans reserve the full text width so the layout never shifts.
 */
export function HeroTypewriter() {
  const [step, setStep]       = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused]   = useState(false);

  useEffect(() => {
    if (paused) {
      const t = setTimeout(() => { setPaused(false); setDeleting(true); }, PAUSE_MS);
      return () => clearTimeout(t);
    }
    if (!deleting) {
      if (step < MAX_STEPS) {
        const t = setTimeout(() => setStep(s => s + 1), TYPE_MS);
        return () => clearTimeout(t);
      } else {
        setPaused(true);
      }
    } else {
      if (step > 0) {
        const t = setTimeout(() => setStep(s => s - 1), DELETE_MS);
        return () => clearTimeout(t);
      } else {
        setDeleting(false); // loop
      }
    }
  }, [step, deleting, paused]);

  // Left: first N chars (grows →)
  const leftText  = LEFT.slice(0, Math.min(step, LEFT.length));
  // Right: last N chars (grows ←)
  const rightText = RIGHT.slice(Math.max(0, RIGHT.length - step));

  return (
    <>
      {/* ── LEFT PHRASE — types left→right ───────────────────── */}
      <span className="relative inline-block">
        {/* Ghost reserves exact width — invisible but present in layout */}
        <span className="invisible select-none" aria-hidden="true">{LEFT}</span>
        {/* Active layer — left-aligned, cursor trails the text */}
        <span className="absolute inset-0 flex items-center whitespace-nowrap">
          <span className="text-white">{leftText}</span>
          <span className="text-sky-300 opacity-70 animate-pulse select-none">|</span>
        </span>
      </span>

      {/* space between phrases */}
      <span aria-hidden="true">{' '}</span>

      {/* ── RIGHT PHRASE — types right→left ──────────────────── */}
      <span className="relative inline-block">
        {/* Ghost reserves exact width */}
        <span className="invisible select-none" aria-hidden="true">{RIGHT}</span>
        {/* Active layer — right-aligned, cursor leads the text on the left */}
        <span className="absolute inset-0 flex items-center justify-end whitespace-nowrap">
          <span className="text-fuchsia-300 opacity-70 animate-pulse select-none">|</span>
          <span
            style={{
              background: 'linear-gradient(90deg, #38bdf8, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {rightText}
          </span>
        </span>
      </span>
    </>
  );
}
