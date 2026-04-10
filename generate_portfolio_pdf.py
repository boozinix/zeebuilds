#!/usr/bin/env python3
"""Generate a PDF of the zubairnizami.com portfolio website."""

from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable,
    Table, TableStyle, KeepTogether
)
from reportlab.lib.enums import TA_LEFT, TA_CENTER

# ── Color palette (matches site) ──────────────────────────────────────────────
SLATE_50   = colors.HexColor('#f8fafc')
SLATE_100  = colors.HexColor('#f1f5f9')
SLATE_200  = colors.HexColor('#e2e8f0')
SLATE_300  = colors.HexColor('#cbd5e1')
SLATE_400  = colors.HexColor('#94a3b8')
SLATE_500  = colors.HexColor('#64748b')
SLATE_600  = colors.HexColor('#475569')
SLATE_700  = colors.HexColor('#334155')
SLATE_800  = colors.HexColor('#1e293b')
SLATE_900  = colors.HexColor('#0f172a')
SLATE_950  = colors.HexColor('#020617')

SKY_400    = colors.HexColor('#38bdf8')
SKY_500    = colors.HexColor('#0ea5e9')
VIOLET_400 = colors.HexColor('#a78bfa')
VIOLET_500 = colors.HexColor('#8b5cf6')
FUCHSIA    = colors.HexColor('#e879f9')
EMERALD    = colors.HexColor('#34d399')
AMBER      = colors.HexColor('#fbbf24')

PAGE_BG    = SLATE_950
TEXT_MAIN  = SLATE_50
TEXT_BODY  = SLATE_300
TEXT_MUTED = SLATE_400


def make_styles():
    styles = getSampleStyleSheet()

    base = dict(fontName='Helvetica', fontSize=10, leading=14,
                textColor=TEXT_BODY, backColor=PAGE_BG)

    def add(name, **kw):
        s = ParagraphStyle(name, **{**base, **kw})
        styles.add(s)
        return s

    add('SiteTitle',    fontName='Helvetica-Bold', fontSize=28, leading=34,
        textColor=TEXT_MAIN, spaceAfter=4, alignment=TA_CENTER)
    add('SiteSubtitle', fontSize=13, leading=18, textColor=TEXT_BODY,
        spaceAfter=6, alignment=TA_CENTER)
    add('SiteURL',      fontSize=10, textColor=SKY_400, alignment=TA_CENTER, spaceAfter=4)

    add('PageHeading',  fontName='Helvetica-Bold', fontSize=20, leading=26,
        textColor=TEXT_MAIN, spaceBefore=14, spaceAfter=6)
    add('SectionHeading', fontName='Helvetica-Bold', fontSize=14, leading=18,
        textColor=SKY_400, spaceBefore=10, spaceAfter=4)
    add('SubHeading',   fontName='Helvetica-Bold', fontSize=11, leading=14,
        textColor=VIOLET_400, spaceBefore=6, spaceAfter=3)
    add('Body',         fontSize=10, leading=15, textColor=TEXT_BODY, spaceAfter=4)
    add('BodySmall',    fontSize=9,  leading=13, textColor=TEXT_MUTED, spaceAfter=3)
    add('BulletItem',   fontSize=10, leading=14, textColor=TEXT_BODY,
        leftIndent=14, firstLineIndent=-8, spaceAfter=2)
    add('Label',        fontName='Helvetica-Bold', fontSize=9, leading=12,
        textColor=SKY_400, spaceAfter=2)
    add('PillText',     fontSize=9, textColor=EMERALD, spaceAfter=2)
    add('MetricValue',  fontName='Helvetica-Bold', fontSize=22, leading=26,
        textColor=EMERALD, alignment=TA_CENTER)
    add('MetricLabel',  fontSize=9, leading=12, textColor=TEXT_MUTED,
        alignment=TA_CENTER, spaceAfter=2)
    add('RoleTitle',    fontName='Helvetica-Bold', fontSize=12, leading=15,
        textColor=TEXT_MAIN, spaceAfter=1)
    add('RoleSubtitle', fontSize=10, leading=13, textColor=SKY_400, spaceAfter=2)
    add('RolePeriod',   fontSize=9,  leading=12, textColor=TEXT_MUTED, spaceAfter=3)

    return styles


def hr(color=SLATE_700, thickness=0.5):
    return HRFlowable(width='100%', thickness=thickness, color=color, spaceAfter=8, spaceBefore=4)


def bullet(text, styles):
    return Paragraph(f'<bullet>\u2022</bullet> {text}', styles['BulletItem'])


def section_box_header(title, icon_char, icon_color, styles):
    """Returns a list of flowables that look like a section card header."""
    return [
        Spacer(1, 6),
        Paragraph(f'<font color="{icon_color.hexval()}">{icon_char}</font>  {title}',
                  styles['SectionHeading']),
        hr(SLATE_700),
    ]


def build_cover(story, styles):
    story.append(Spacer(1, 0.5 * inch))
    story.append(Paragraph('Zubair Nizami', styles['SiteTitle']))
    story.append(Paragraph('AI Product Manager &amp; Solo Builder', styles['SiteSubtitle']))
    story.append(Paragraph('zubairnizami.com', styles['SiteURL']))
    story.append(Spacer(1, 0.15 * inch))
    story.append(Paragraph(
        'I design and build consumer AI products end-to-end — from uncovering real problems '
        'to shipping production-grade experiences. This document is a PDF export of my '
        'portfolio site, covering my work, background, and the products I own.',
        styles['Body']))
    story.append(Spacer(1, 0.1 * inch))
    story.append(hr(SKY_500, 1.5))
    story.append(Spacer(1, 0.2 * inch))

    # Quick contact row
    contact_data = [
        [Paragraph('<b>Email</b>', styles['Label']),
         Paragraph('zubair.nizami@yahoo.com', styles['Body'])],
        [Paragraph('<b>GitHub</b>', styles['Label']),
         Paragraph('github.com/boozinix', styles['Body'])],
        [Paragraph('<b>LinkedIn</b>', styles['Label']),
         Paragraph('linkedin.com/in/zubairnizami', styles['Body'])],
        [Paragraph('<b>Location</b>', styles['Label']),
         Paragraph('San Francisco Bay Area', styles['Body'])],
    ]
    t = Table(contact_data, colWidths=[1.3 * inch, 4.5 * inch])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), PAGE_BG),
        ('TEXTCOLOR',  (0, 0), (-1, -1), TEXT_BODY),
        ('VALIGN',     (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
    ]))
    story.append(t)
    story.append(Spacer(1, 0.3 * inch))
    story.append(hr(SLATE_600))


def build_home(story, styles):
    story.append(Spacer(1, 0.2 * inch))
    story.append(Paragraph('Home', styles['PageHeading']))
    story.append(Paragraph(
        'I build and ship <font color="#38bdf8">AI-powered tools</font> for careers and finance.',
        styles['SiteTitle']))
    story.append(Spacer(1, 0.05 * inch))
    story.append(Paragraph(
        'I design and build consumer products end-to-end — from uncovering real problems to shipping '
        'production-grade experiences. Below are two live applications I own.',
        styles['Body']))
    story.append(Spacer(1, 0.1 * inch))
    story.append(Paragraph(
        'Actively looking for full-time AI PM roles. Let\'s talk.',
        styles['BodySmall']))
    story.append(hr(SLATE_700))


def build_about(story, styles):
    story.append(Spacer(1, 0.2 * inch))
    story.append(Paragraph('About', styles['PageHeading']))

    # Bio
    bio_paras = [
        "I'm obsessed with AI-powered consumer products that solve real problems — especially in "
        "careers and fintech. I'd rather de-risk ideas by shipping than by deck. That means going "
        "from problem to prototype to production myself, so I can speak from experience when I lead "
        "product: I've felt the tradeoffs, the latency, and the joy of watching something work in "
        "users' hands.",

        "ApplyStudio, Card Scout, and Neural Mob are the proof. I identified problems from my own experience, "
        "validated them with others, then built and launched the full stack — product, UX, and backend. "
        "I learned how fast you can iterate when you own the whole loop: discovery, hypothesis, build, "
        "ship, learn. That PM arc — problem, insight, decision, outcome — is what I care about, whether "
        "I'm building solo or with a team.",

        "I'm looking for my next AI PM role at a company that ships. I want to own a product or area "
        "where AI is central to the value proposition, and where I can combine product sense with "
        "hands-on building. I'm also open to product collaboration and advisory work for teams betting "
        "on AI-powered consumer or fintech products.",
    ]
    for p in bio_paras:
        story.append(Paragraph(p, styles['Body']))
        story.append(Spacer(1, 4))

    story.append(Spacer(1, 0.12 * inch))

    # Skills
    story.append(Paragraph('✦  Skills', styles['SectionHeading']))
    story.append(hr(SLATE_700))

    skills = [
        ('Product',   SKY_400, [
            'Problem discovery & validation',
            'Product strategy & roadmapping',
            'User research & feedback loops',
            'Metrics & success criteria',
            'Go-to-market planning',
        ]),
        ('Technical', VIOLET_400, [
            'TypeScript & Next.js',
            'AI/LLM integration (OpenAI, Anthropic)',
            'Web scraping & data pipelines',
            'Database design (Postgres, JSON)',
            'Deployment & DevOps (Vercel, AWS)',
        ]),
        ('Domain',    FUCHSIA, [
            'Fintech & rewards optimization',
            'Job search & career tools',
            'AI-powered workflows',
            'Consumer product strategy',
            'B2C growth & retention',
        ]),
    ]

    for title, color, items in skills:
        story.append(Paragraph(f'<font color="{color.hexval()}"><b>{title}</b></font>',
                               styles['SubHeading']))
        for item in items:
            story.append(bullet(item, styles))
        story.append(Spacer(1, 6))

    story.append(Spacer(1, 0.12 * inch))

    # Experience
    story.append(Paragraph('📈  Experience', styles['SectionHeading']))
    story.append(hr(SLATE_700))

    experiences = [
        {
            'company': 'AWS',
            'role': 'Senior Partner Manager',
            'period': 'May 2025 – Present',
            'desc': 'Led product strategy for AWS Marketplace partnerships, driving 157% revenue growth ($84M → $216M) and improving customer retention by 20% through a new License Switching feature.',
        },
        {
            'company': 'Meta',
            'role': 'Product Manager, Infrastructure & Data Centers',
            'period': 'Jun 2024 – Apr 2025',
            'desc': 'Owned the Digital Twin platform for AI data centers — redesigned the UI (60% adoption increase), cut costs by $250M per region, and shipped two 0→1 tools including an ML-enabled alerting system.',
        },
        {
            'company': 'Zoox',
            'role': 'Senior Technical Product Manager',
            'period': 'Feb 2022 – Jun 2024',
            'desc': 'Built 0→1 robotaxi tools including remote diagnostics, autonomous braking, and a 3D rider visualization app, while cutting ML infrastructure costs by 25% across 200+ engineers.',
        },
        {
            'company': 'Apple',
            'role': 'Product Design Lead',
            'period': 'May 2015 – Feb 2022',
            'desc': "Led NPI programs for four iPhone generations and Vision Pro's 4K display testing line. Built Apple's first OLED chip-level testing platform, improving yield by 50% and securing $2M in investment.",
        },
    ]

    for exp in experiences:
        story.append(KeepTogether([
            Paragraph(exp['company'], styles['RoleTitle']),
            Paragraph(exp['role'], styles['RoleSubtitle']),
            Paragraph(exp['period'], styles['RolePeriod']),
            Paragraph(exp['desc'], styles['Body']),
            Spacer(1, 8),
        ]))

    story.append(hr(SLATE_700))


def build_work_index(story, styles):
    story.append(Spacer(1, 0.2 * inch))
    story.append(Paragraph('Work', styles['PageHeading']))
    story.append(Paragraph(
        'Selected products I designed and built end-to-end. Each represents a complete journey '
        'from problem identification to production deployment.',
        styles['Body']))
    story.append(Spacer(1, 0.1 * inch))
    story.append(hr(SLATE_700))


def build_project(story, styles, project):
    story.append(Spacer(1, 0.2 * inch))
    story.append(Paragraph(project['name'], styles['PageHeading']))
    story.append(Paragraph(
        f'<font color="{EMERALD.hexval()}">Live Product</font>  ·  {project["role"]}  ·  {project["timeframe"]}',
        styles['BodySmall']))
    story.append(Spacer(1, 4))
    story.append(Paragraph(project['tagline'], styles['Body']))

    links_text = '  ·  '.join(
        f'<font color="{SKY_400.hexval()}">{lk["label"]}</font>: {lk["href"]}'
        for lk in project['links']
    )
    story.append(Paragraph(links_text, styles['BodySmall']))
    story.append(Spacer(1, 0.1 * inch))

    # ── Problem ──────────────────────────────────────────────────────────────
    story.append(Paragraph('⚠  The Problem', styles['SectionHeading']))
    story.append(hr(SLATE_700))
    story.append(Paragraph(project['problem'], styles['Body']))
    if project.get('whyNow'):
        story.append(Paragraph(
            f'<b><font color="{TEXT_MUTED.hexval()}">Why now:</font></b> {project["whyNow"]}',
            styles['Body']))
    story.append(Spacer(1, 0.08 * inch))

    # ── Insight & approach ────────────────────────────────────────────────────
    story.append(Paragraph('💡  Insight & Approach', styles['SectionHeading']))
    story.append(hr(SLATE_700))
    story.append(Paragraph(project['solution'], styles['Body']))
    story.append(Spacer(1, 4))
    for item in project['responsibilities'][:3]:
        story.append(bullet(item, styles))
    story.append(Spacer(1, 0.08 * inch))

    # ── What I built ─────────────────────────────────────────────────────────
    story.append(Paragraph('⬡  What I Built', styles['SectionHeading']))
    story.append(hr(SLATE_700))
    story.append(Paragraph(project['architecture']['overview'], styles['Body']))
    story.append(Spacer(1, 4))
    for b in project['architecture']['bullets']:
        story.append(bullet(b, styles))
    story.append(Spacer(1, 0.08 * inch))

    # ── Results ───────────────────────────────────────────────────────────────
    story.append(Paragraph('📈  Results', styles['SectionHeading']))
    story.append(hr(SLATE_700))
    for outcome in project['outcomes']:
        story.append(bullet(outcome, styles))
    story.append(Spacer(1, 8))

    if project.get('metrics'):
        cols = len(project['metrics'])
        col_w = 5.8 * inch / cols
        metric_data = [[
            [
                Paragraph(m['value'], styles['MetricValue']),
                Paragraph(m['label'],  styles['MetricLabel']),
            ]
            for m in project['metrics']
        ]]
        mt = Table(metric_data, colWidths=[col_w] * cols)
        mt.setStyle(TableStyle([
            ('BACKGROUND',    (0, 0), (-1, -1), SLATE_800),
            ('ROUNDEDCORNERS', [6]),
            ('ALIGN',         (0, 0), (-1, -1), 'CENTER'),
            ('VALIGN',        (0, 0), (-1, -1), 'MIDDLE'),
            ('TOPPADDING',    (0, 0), (-1, -1), 10),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
        ]))
        story.append(mt)
        story.append(Spacer(1, 0.08 * inch))

    # ── Tech stack ────────────────────────────────────────────────────────────
    story.append(Paragraph('⚡  Tech Stack', styles['SectionHeading']))
    story.append(hr(SLATE_700))
    story.append(Paragraph(
        '  ·  '.join(f'<font color="{VIOLET_400.hexval()}">{t}</font>' for t in project['stack']),
        styles['Body']))
    story.append(Spacer(1, 0.2 * inch))
    story.append(hr(SLATE_600))


# ── Project data ──────────────────────────────────────────────────────────────
PROJECTS = [
    {
        'name': 'ApplyStudio',
        'tagline': 'AI-powered job application platform: resume tailoring, cover letters, ATS scoring — per application in under 90 seconds, across 20+ jobs at once.',
        'role': 'Product Manager & Solo Builder',
        'timeframe': '2026 – Present',
        'stack': [
            'Next.js',
            'TypeScript',
            'Vercel',
            'Multi-agent AI',
            'LLM APIs (OpenAI, Anthropic, Google Gemini)',
            'GPT-5.1',
        ],
        'links': [
            {'label': 'Live app', 'href': 'https://applystudio.net'},
            {'label': 'GitHub',   'href': 'https://github.com/boozinix'},
        ],
        'problem': (
            'Job seekers spend hours per application customizing resumes, writing cover letters, '
            'and answering application questions — all manually, for each role — while still '
            'missing ATS keywords that filter them out.'
        ),
        'whyNow': (
            'GPT-5.1 and multi-agent orchestration make it possible to parallelize complex '
            'rewriting tasks across dozens of job postings at once, compressing what used to '
            'take days into minutes.'
        ),
        'solution': (
            'I built an in-house job scraper outperforming commercial solutions, then '
            'layered a multi-agent AI workflow (OpenAI, Anthropic, Google Gemini) for resume tailoring '
            '(bullet-by-bullet accept/edit/reject UI), cover letter generation, application Q&A, and '
            'comprehensive ATS scoring — all running in parallel across 20+ jobs.'
        ),
        'outcomes': [
            'Scraped job descriptions more accurately than ScrapingBee (20% improvement on difficult sites).',
            'Enabled candidates to process 20+ simultaneous job postings with full AI-tailored applications.',
            'Reduced per-application work from hours to under 90 seconds while maintaining candidate voice and control.',
            'Real-time ATS fit scoring surfaces high-fit opportunities and skill gaps proactively.',
        ],
        'responsibilities': [
            'Built in-house web scraper extracting job descriptions, requirements, and application questions.',
            'Designed multi-agent AI workflow using GPT-5.1 for resume tailoring with bullet-by-bullet accept/edit/reject UI.',
            'Implemented cover letter generation and application question answering at scale.',
        ],
        'architecture': {
            'overview': (
                'ApplyStudio separates job ingestion, AI orchestration, and user review into '
                'distinct layers — enabling parallel processing across dozens of jobs while '
                'keeping the human in control of every output.'
            ),
            'bullets': [
                'Scraping Layer: in-house crawler outperforms commercial solutions on difficult job sites, extracting descriptions, requirements, and application questions.',
                'Multi-agent AI Orchestration: GPT-5.1 agents run in parallel — one per job — for resume tailoring, cover letters, and application Q&A.',
                'Bullet-by-Bullet UI: accept/edit/reject interface gives users granular control over every AI-rewritten resume bullet.',
                'ATS Scoring Engine: real-time keyword matching, skill gap analysis, and ranking across 20+ jobs simultaneously.',
                'Local Persistence: draft state and preferences are persisted locally to support non-linear application workflows.',
            ],
        },
        'metrics': [
            {'value': '20+',       'label': 'Jobs processed simultaneously'},
            {'value': '<90s',      'label': 'Per-application time'},
            {'value': 'Real-time', 'label': 'ATS fit scoring'},
        ],
    },
    {
        'name': 'Neural Mob',
        'tagline': 'An AI-forward web experience focused on craft, motion, and clear product storytelling.',
        'role': 'Product Manager & Solo Builder',
        'timeframe': '2026 – Present',
        'stack': ['Next.js', 'TypeScript', 'Vercel', 'AI'],
        'links': [
            {'label': 'Live site', 'href': 'https://neuralmob.xyz/'},
        ],
        'problem': (
            'Many AI product sites feel generic or overloaded; visitors struggle to see the builder '
            'behind the product or trust that the experience was designed with care.'
        ),
        'whyNow': (
            'As AI PM hiring emphasizes both product judgment and builder credibility, a dedicated '
            'live site can signal craft and speed of execution alongside larger case studies.'
        ),
        'solution': (
            'Shipped neuralmob.xyz as a standalone experience: clear positioning, responsive layout, '
            'and performance-minded delivery so the first impression matches how I build consumer products.'
        ),
        'outcomes': [
            'Live destination recruiters and collaborators can open in seconds to see current work and visual/product sensibility.',
            'Demonstrates end-to-end ownership from concept to deployed experience on a custom domain.',
            'Pairs with ApplyStudio and Card Scout as a lighter-weight proof of taste and execution.',
        ],
        'responsibilities': [
            'Defined positioning, IA, and primary user path for the site.',
            'Implemented responsive UI, motion, and content structure for clarity on first visit.',
            'Deployed and iterated on performance, accessibility, and shareability.',
        ],
        'architecture': {
            'overview': (
                'Neural Mob is built as a modern, deployable front-end with a small surface area so '
                'changes ship quickly and the site stays easy to maintain.'
            ),
            'bullets': [
                'Presentation layer: component-driven layout with consistent typography and spacing.',
                'Motion & feedback: subtle transitions that reinforce hierarchy without distracting from the message.',
                'Deployment: production hosting on a custom domain with fast cold loads for link-in-bio and hiring contexts.',
            ],
        },
        'metrics': [
            {'value': 'Live', 'label': 'Production site'},
            {'value': 'AI', 'label': 'Core experience'},
            {'value': 'Mobile', 'label': 'Responsive UX'},
        ],
    },
    {
        'name': 'Card Scout',
        'tagline': 'AI-assisted credit card discovery with multi-model recommendations and automated data ingestion.',
        'role': 'Product Manager & Solo Builder',
        'timeframe': '2026 – Present',
        'stack': ['Next.js', 'TypeScript', 'Vercel', 'GPT-5', 'Claude', 'DeepSeek', 'Postgres'],
        'links': [
            {'label': 'Live app', 'href': 'https://thecardscout.app'},
            {'label': 'GitHub',   'href': 'https://github.com/boozinix/the-card-scout'},
        ],
        'problem': (
            'Consumers face analysis paralysis choosing among 100+ credit cards, leaving thousands '
            'of dollars in rewards unused — while most comparison sites are affiliate-driven and '
            'ignore individual spending patterns.'
        ),
        'whyNow': (
            'Multi-model LLM orchestration now makes it possible to combine structured valuation '
            'logic with AI reasoning to personalize recommendations at a level no static '
            'comparison site can match.'
        ),
        'solution': (
            'Card Scout combines multi-model AI orchestration (GPT-5, Claude, DeepSeek) with '
            'automated data ingestion using bank-specific crawlers, a guided quiz UX, and a '
            'valuation engine that ranks cards by real expected annual value for your specific '
            'spending profile.'
        ),
        'outcomes': [
            'Cuts card research time from hours to under 2 minutes.',
            'Surfaces card combinations worth hundreds to thousands of dollars annually in net rewards.',
            'Multi-model orchestration improves recommendation quality by leveraging model-specific strengths.',
            'SEO-optimized architecture for issuer rules, transfer partners, and calculator pages drives organic discovery.',
        ],
        'responsibilities': [
            'Built automated data ingestion pipelines using bank-specific crawlers with validation scripts.',
            'Implemented multi-model orchestration (GPT-5, Claude, DeepSeek) for recommendation quality.',
            'Designed guided workflow UX with autocomplete, local persistence, and mobile-first principles.',
        ],
        'architecture': {
            'overview': (
                'Card Scout separates data ingestion, valuation logic, multi-model AI orchestration, '
                'and the user-facing quiz into distinct layers — making it easy to extend to new '
                'issuers or geographies.'
            ),
            'bullets': [
                'Data Pipeline: bank-specific Playwright crawlers with validation scripts pull card terms into a structured Postgres schema.',
                'Multi-model Orchestration: GPT-5, Claude, and DeepSeek used in combination for recommendation reasoning and explanation.',
                'Valuation Engine: pure TypeScript functions compute expected annual value from spend profile, multipliers, and perk valuations.',
                'Guided Quiz UX: autocomplete-enabled flow collects priorities and constraints with local persistence for non-linear sessions.',
                'SEO Architecture: dedicated pages for issuer rules, transfer partners, and calculators optimized for organic discovery.',
            ],
        },
        'metrics': [
            {'value': '100+',   'label': 'Cards analyzed'},
            {'value': '$2,500', 'label': 'Avg. annual value'},
            {'value': '2 min',  'label': 'Research time'},
        ],
    },
]


def main():
    output = "/Users/zubairnizami/Zubair's Portfolio/zubairnizami_portfolio.pdf"

    doc = SimpleDocTemplate(
        output,
        pagesize=letter,
        leftMargin=0.85 * inch,
        rightMargin=0.85 * inch,
        topMargin=0.75 * inch,
        bottomMargin=0.75 * inch,
        title='Zubair Nizami — Portfolio',
        author='Zubair Nizami',
        subject='AI Product Manager Portfolio — zubairnizami.com',
    )

    styles = make_styles()
    story  = []

    build_cover(story, styles)
    build_home(story, styles)
    build_about(story, styles)
    build_work_index(story, styles)

    for project in PROJECTS:
        build_project(story, styles, project)

    # Build with dark background on every page
    def on_page(canvas, doc):
        canvas.saveState()
        canvas.setFillColor(PAGE_BG)
        canvas.rect(0, 0, letter[0], letter[1], fill=1, stroke=0)
        canvas.restoreState()

    doc.build(story, onFirstPage=on_page, onLaterPages=on_page)
    print(f'PDF generated → {output}')


if __name__ == '__main__':
    main()
