'use client';

import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } else {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /* Bordered input — fully visible on dark navy */
  const inputCls =
    'w-full bg-slate-800/70 border border-slate-600 rounded-md px-4 py-3 text-slate-100 text-base placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:bg-slate-800 focus:ring-2 focus:ring-sky-400/20 transition-all duration-200 min-h-[48px]';

  return (
    <div className="mx-auto max-w-4xl px-4 pb-24 pt-16 sm:pt-24">

      {/* ── HEADER ───────────────────────────────────────────── */}
      <Reveal>
        <header className="mb-16 sm:mb-20">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-slate-500 mb-6">
            Contact
          </p>
          <h1 className="font-display font-black text-white leading-tight text-[clamp(2.5rem,8vw,5rem)]">
            Let's talk.
          </h1>
          <p className="mt-5 max-w-lg text-slate-300 leading-relaxed text-base sm:text-lg">
            Actively looking for AI PM roles. Also open to advisory and collaboration.
            I respond same day.
          </p>
        </header>
      </Reveal>

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">

        {/* ── FORM ─────────────────────────────────────────────── */}
        <Reveal delay={0.05}>
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="space-y-2">
              <label htmlFor="name" className="block font-mono text-xs uppercase tracking-[0.2em] text-slate-300 font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="name"
                className={inputCls}
                placeholder="Your name"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block font-mono text-xs uppercase tracking-[0.2em] text-slate-300 font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                inputMode="email"
                className={inputCls}
                placeholder="your@email.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="block font-mono text-xs uppercase tracking-[0.2em] text-slate-300 font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className={`${inputCls} resize-none min-h-[140px]`}
                placeholder="What's on your mind..."
              />
            </div>

            <div className="space-y-3 pt-2">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="inline-flex items-center justify-center w-full sm:w-auto bg-white text-slate-950 px-8 py-3.5 rounded-md font-semibold text-sm hover:bg-slate-100 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed min-h-[48px]"
              >
                {status === 'submitting' ? 'Sending…' : 'Send message'}
              </button>

              {status === 'success' && (
                <p className="font-mono text-xs uppercase tracking-widest text-emerald-400 flex items-center gap-2">
                  <span>✓</span> Sent. I'll reply within 24 hours.
                </p>
              )}
              {status === 'error' && (
                <p className="font-mono text-xs uppercase tracking-widest text-red-400 flex items-center gap-2">
                  <span>✗</span> Something went wrong — email me: zubair.nizami@yahoo.com
                </p>
              )}
            </div>
          </form>
        </Reveal>

        {/* ── INFO ─────────────────────────────────────────────── */}
        <Reveal delay={0.1}>
          <div className="space-y-12">

            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400 mb-5">
                Direct
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'zubair.nizami@yahoo.com', href: 'mailto:zubair.nizami@yahoo.com' },
                  { label: 'LinkedIn',                href: 'https://linkedin.com/in/zubairnizami' },
                  { label: 'GitHub',                  href: 'https://github.com/boozinix' },
                ].map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group flex items-center gap-2 text-slate-200 hover:text-sky-400 transition-colors duration-200 min-h-[44px]"
                  >
                    <span className="text-sm sm:text-base">{link.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400 mb-5">
                Looking for
              </h3>
              <ul className="space-y-3.5">
                {[
                  'AI PM roles where AI is core to the product — not a feature',
                  'Founding/early-stage PM in consumer AI or fintech',
                  'Advisory for teams building AI-powered tools',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-sky-400 mt-px shrink-0">—</span>
                    <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400 mb-3">
                Availability
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Actively interviewing for Senior/Staff AI PM roles. Open to SF Bay Area or remote.
                Available within 2–4 weeks.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
