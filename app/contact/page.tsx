'use client';

import { useState } from 'react';
import { Metadata } from 'next';

// Note: Metadata export doesn't work in client components, so we'll add it to layout or use a wrapper
// For now, we'll handle this in the root layout or create a server component wrapper

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
    
    // For now, simulate form submission with mailto
    const subject = encodeURIComponent(`zeebuilds Contact: ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    
    window.location.href = `mailto:zubair.nizami@yahoo.com?subject=${subject}&body=${body}`;
    
    setStatus('success');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="mx-auto max-w-4xl px-4 pb-16 pt-12">
      <header className="mb-12">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Contact
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-slate-300 sm:text-base">
          Best way to reach me is email. I'm open to AI PM roles, product collaboration, 
          and interesting conversations about building consumer products.
        </p>
      </header>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Contact Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 placeholder-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 placeholder-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                placeholder="your.email@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 placeholder-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 resize-none"
                placeholder="Tell me about your project, role, or just say hello..."
              />
            </div>
            
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full rounded-lg bg-sky-500 px-4 py-3 text-sm font-medium text-slate-950 hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {status === 'submitting' ? 'Sending...' : 'Send message'}
            </button>
            
            {status === 'success' && (
              <p className="text-sm text-emerald-400">
                Message sent! Your email client should have opened with the message.
              </p>
            )}
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-8">
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-6">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">
              Let's connect
            </h3>
            <div className="space-y-4">
              <a
                href="mailto:zubair.nizami@yahoo.com"
                className="flex items-center gap-3 text-sm text-slate-300 hover:text-sky-400 transition-colors"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800">
                  📧
                </span>
                zubair.nizami@yahoo.com
              </a>
              <a
                href="https://linkedin.com/in/zubairnizami"
                className="flex items-center gap-3 text-sm text-slate-300 hover:text-sky-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800">
                  💼
                </span>
                LinkedIn
              </a>
              <a
                href="https://github.com/boozinix"
                className="flex items-center gap-3 text-sm text-slate-300 hover:text-sky-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800">
                  💻
                </span>
                GitHub
              </a>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-6">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">
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

          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-6">
            <h3 className="text-lg font-semibold text-slate-100 mb-2">
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