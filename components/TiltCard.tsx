'use client';

import { useRef, useState, type ReactNode, type MouseEvent } from 'react';
import { motion } from 'framer-motion';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

const MAX_TILT = 5; // degrees

export function TiltCard({ children, className = '' }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    // Normalize to -1..1
    const nx = (e.clientX - cx) / (rect.width / 2);
    const ny = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: ny * -MAX_TILT, y: nx * MAX_TILT });
  }

  function handleLeave() {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        perspective: 800,
        transformStyle: 'preserve-3d',
        boxShadow: hovered
          ? '0 0 30px rgba(124,58,237,0.25), 0 0 0 1px rgba(124,58,237,0.4)'
          : '0 0 0 1px rgba(124,58,237,0)',
      }}
      className={`transition-shadow duration-200 ${className}`}
    >
      {children}
    </motion.div>
  );
}
