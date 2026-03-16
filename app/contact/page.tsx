'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
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
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="mx-auto max-w-4xl px-4 pb-12 pt-8 sm:pb-16 sm:pt-12">
      <header className="mb-8 sm:mb-12">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl sm:text-4xl">
          Contact
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:mt-4 sm:text-base">
          Best way to reach me is email. I'm open to AI PM roles, product collaboration, 
          and interesting conversations about building consumer products.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Contact Form - first on mobile for easier access */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1.5 sm:mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full min-h-[48px] rounded-lg border border-slate-700 bg-slate-900/60 px-4 py-3 text-base text-slate-100 placeholder-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5 sm:mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full min-h-[48px] rounded-lg border border-slate-700 bg-slate-900/60 px-4 py-3 text-base text-slate-100 placeholder-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                placeholder="your.email@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1.5 sm:mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-4 py-3 text-base text-slate-100 placeholder-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 resize-none min-h-[120px] sm:min-h-[140px]"
                placeholder="Tell me about your project, role, or just say hello..."
              />
            </div>
            
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full min-h-[48px] rounded-lg bg-sky-500 px-4 py-3.5 text-base font-medium text-slate-950 hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99] transition-colors"
            >
              {status === 'submitting' ? 'Sending...' : 'Send message'}
            </button>
            
            {status === 'success' && (
              <p className="text-sm text-emerald-400">
                Message sent! I'll get back to you within 24–48 hours.
              </p>
            )}
            {status === 'error' && (
              <p className="text-sm text-red-400">
                Something went wrong. Try emailing me directly at zubair.nizami@yahoo.com
              </p>
            )}
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-5 sm:space-y-8">
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 sm:p-6">
            <h3 className="text-base font-semibold text-slate-100 mb-3 sm:mb-4 sm:text-lg">
              Let's connect
            </h3>
            <div className="space-y-3 sm:space-y-4">
              <a
                href="mailto:zubair.nizami@yahoo.com"
                className="flex min-h-[44px] items-center gap-3 rounded-lg py-2 text-sm text-slate-300 hover:text-sky-400 transition-colors active:bg-slate-800/50 sm:min-h-0 sm:py-0"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-800 sm:h-8 sm:w-8">
                  📧
                </span>
                <span className="break-all">zubair.nizami@yahoo.com</span>
              </a>
              <a
                href="https://linkedin.com/in/zubairnizami"
                className="flex min-h-[44px] items-center gap-3 rounded-lg py-2 text-sm text-slate-300 hover:text-sky-400 transition-colors active:bg-slate-800/50 sm:min-h-0 sm:py-0"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-800 sm:h-8 sm:w-8">
                  💼
                </span>
                LinkedIn
              </a>
              <a
                href="https://github.com/boozinix"
                className="flex min-h-[44px] items-center gap-3 rounded-lg py-2 text-sm text-slate-300 hover:text-sky-400 transition-colors active:bg-slate-800/50 sm:min-h-0 sm:py-0"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-800 sm:h-8 sm:w-8">
                  💻
                </span>
                GitHub
              </a>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 sm:p-6">
            <h3 className="text-base font-semibold text-slate-100 mb-3 sm:mb-4 sm:text-lg">
              What I'm looking for
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-sky-400 mt-0.5">•</span>
                AI Product Manager roles at growth-stage companies
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-400 mt-0.5">•</span>
                Product collaboration on consumer fintech or career tools
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-400 mt-0.5">•</span>
                Advisory opportunities for AI-powered products
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-400 mt-0.5">•</span>
                Conversations about building and scaling consumer products
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 sm:p-6">
            <h3 className="text-base font-semibold text-slate-100 mb-1.5 sm:mb-2 sm:text-lg">
              Response time
            </h3>
            <p className="text-sm text-slate-300">
              I typically respond within 24-48 hours. For urgent matters, 
              feel free to mention it in your message.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}