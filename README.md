# zeebuilds

Personal portfolio and project showcase for **Zubair Nizami** — AI Product Manager & full-stack builder. Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

**Live:** [zeebuilds.com](https://zeebuilds.com) (after deployment)

## Projects featured

- **Resume Tailor** — AI-powered resume tailoring for each job in under 30 seconds
- **Card Scout** — Intelligent credit card recommendations based on your spending and goals

## Tech stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React

## Getting started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command      | Description           |
| ------------ | --------------------- |
| `npm run dev`   | Start dev server       |
| `npm run build` | Production build       |
| `npm run start` | Start production server |
| `npm run lint`  | Run ESLint            |

## Deploy on Vercel

1. **Push this repo to GitHub**
   - Create a new repository named `zeebuilds` (or any name) on GitHub.
   - Add the remote and push:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/zeebuilds.git
   git branch -M main
   git push -u origin main
   ```

2. **Import on Vercel**
   - Go to [vercel.com/new](https://vercel.com/new).
   - Import your GitHub repository.
   - Vercel will detect Next.js; keep the default build settings.
   - Click **Deploy**.

3. **Custom domain (zeebuilds.com)**
   - After deployment, go to your project **Settings → Domains**.
   - Add `zeebuilds.com` (and optionally `www.zeebuilds.com`).
   - In your domain registrar’s DNS, add the records Vercel shows (usually A and CNAME).
   - Wait for DNS to propagate; Vercel will issue SSL automatically.

## Project structure

```
├── app/
│   ├── layout.tsx      # Root layout, nav, footer
│   ├── page.tsx        # Home
│   ├── about/          # About page
│   ├── contact/        # Contact page (mailto)
│   ├── work/           # Work list + [slug] project detail
│   ├── sitemap.ts
│   └── robots.ts
├── components/         # Navbar, Footer, Pill, Section, etc.
├── lib/
│   └── projects.ts     # Project data (Resume Tailor, Card Scout)
└── public/
```

## Contact

- **Email:** zubair.nizami@yahoo.com
- **LinkedIn:** [linkedin.com/in/zubairnizami](https://linkedin.com/in/zubairnizami)
- **GitHub:** [github.com/boozinix](https://github.com/boozinix)
