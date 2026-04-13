'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface RevealProps {
  children: React.ReactNode;
  /** Stagger delay in seconds (applied on enter only, not exit) */
  delay?: number;
  className?: string;
  /** Y-axis travel distance in px */
  y?: number;
}

/**
 * Bidirectional scroll reveal — elements fade+slide in when entering the
 * viewport and fade+slide out when leaving, giving the "open/close on scroll"
 * effect the user requested.
 *
 * Uses Framer Motion's useInView with once:false so the animation reverses
 * when the element exits the viewport from either direction.
 */
export function Reveal({ children, delay = 0, className = '', y = 20 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  // margin creates a trigger zone 80px inside the viewport edges
  const isInView = useInView(ref, { once: false, margin: '-80px 0px -80px 0px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={{
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : y,
      }}
      transition={{
        duration: 0.5,
        // Delay only on enter — exits should feel immediate
        delay: isInView ? delay : 0,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
