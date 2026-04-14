'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Parallax hero background — shows /hero-photo.jpg at 0.4× scroll speed
 * with a gradient overlay. Falls back to nothing if the image doesn't exist.
 */
export function HeroParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const [hasImage, setHasImage] = useState(false);

  // Check if the hero photo exists
  useEffect(() => {
    const img = new Image();
    img.onload = () => setHasImage(true);
    img.onerror = () => setHasImage(false);
    img.src = '/hero-photo.jpg';
  }, []);

  const { scrollY } = useScroll();
  // Move image at 0.4× scroll speed: 400px scroll → 160px offset
  const y = useTransform(scrollY, [0, 1000], [0, -400]);

  if (!hasImage) return null;

  return (
    <div
      ref={ref}
      className="absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 h-[130%] -top-[15%]"
      >
        <img
          src="/hero-photo.jpg"
          alt=""
          className="h-full w-full object-cover"
        />
      </motion.div>
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(8,13,26,0.3) 0%, rgba(8,13,26,0.85) 70%, rgba(8,13,26,1) 100%)',
        }}
      />
    </div>
  );
}
