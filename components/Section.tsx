export const Section = ({
  title,
  kicker,
  children
}: {
  title: string;
  kicker?: string;
  children: React.ReactNode;
}) => (
  <section className="mb-10 rounded-2xl border border-slate-800 bg-slate-950/60 p-5 shadow-lg shadow-black/40">
    {kicker && (
      <p className="text-[11px] uppercase tracking-[0.15em] text-sky-400">
        {kicker}
      </p>
    )}
    <h2 className="mt-2 text-lg font-semibold text-slate-50">{title}</h2>
    <div className="mt-4 text-sm text-slate-200">{children}</div>
  </section>
);