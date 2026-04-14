'use client';

export function OpenToWork() {
  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden md:flex items-center">
      <div
        className="flex items-center gap-2"
        style={{ writingMode: 'vertical-rl' }}
      >
        {/* Pulsing green dot */}
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 select-none">
          Open to work
        </span>
      </div>
    </div>
  );
}
