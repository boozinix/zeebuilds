'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

interface ImageCarouselProps {
  images: string[];
  alt: string;
  priority?: boolean;
  interval?: number; // ms between transitions
  sizes?: string;
}

/**
 * Auto-rotating image carousel with crossfade + shimmer sweep transition.
 * Falls back gracefully to a single static image when only one URL is provided.
 */
export function ImageCarousel({
  images,
  alt,
  priority = false,
  interval = 6500,
  sizes = '100vw',
}: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [shimmering, setShimmering] = useState(false);

  const advance = useCallback(() => {
    setShimmering(true);
    // Let shimmer play for 400ms, then swap image, then clear shimmer
    setTimeout(() => {
      setCurrent(prev => (prev + 1) % images.length);
      setTimeout(() => setShimmering(false), 700);
    }, 400);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(advance, interval);
    return () => clearInterval(timer);
  }, [advance, images.length, interval]);

  const src = images[current] ?? '';

  return (
    <div className="relative h-full w-full overflow-hidden bg-slate-900">

      {/* Images — crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={src}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover object-top"
          />
        </motion.div>
      </AnimatePresence>

      {/* Shimmer sweep — left-to-right glimmer on transition */}
      <AnimatePresence>
        {shimmering && (
          <motion.div
            key="shimmer"
            initial={{ x: '-100%' }}
            animate={{ x: '250%' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              width: '50%',
              background:
                'linear-gradient(90deg, transparent 0%, rgba(148,163,184,0.08) 50%, transparent 100%)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Dot / pill indicators — only shown when multiple images */}
      {images.length > 1 && (
        <div
          className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20"
          aria-label="Image navigation"
        >
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`View screenshot ${i + 1}`}
              className={`rounded-full transition-all duration-400 ${
                i === current
                  ? 'w-5 h-1.5 bg-white/90'
                  : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
