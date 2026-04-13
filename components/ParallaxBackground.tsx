'use client';

import { useScroll, useTransform, motion } from 'framer-motion';

/**
 * Fixed parallax background — sky/violet/fuchsia haze blobs that drift
 * as the user scrolls, creating the layered dark atmosphere.
 */
export function ParallaxBackground() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-35%']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Sky blob — top left */}
      <motion.div
        style={{
          y: y1,
          filter: 'blur(140px)',
          background: 'radial-gradient(circle, rgba(56,189,248,0.07) 0%, transparent 70%)',
        }}
        className="absolute -top-[20%] -left-[10%] w-[700px] h-[700px] rounded-full"
      />
      {/* Violet blob — center right */}
      <motion.div
        style={{
          y: y2,
          filter: 'blur(120px)',
          background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
        }}
        className="absolute top-[25%] right-[-5%] w-[600px] h-[600px] rounded-full"
      />
      {/* Fuchsia blob — bottom center */}
      <motion.div
        style={{
          y: y3,
          filter: 'blur(130px)',
          background: 'radial-gradient(circle, rgba(232,121,249,0.05) 0%, transparent 70%)',
        }}
        className="absolute bottom-[0%] left-[25%] w-[500px] h-[500px] rounded-full"
      />
    </div>
  );
}
