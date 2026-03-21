# BAC Calculator — Next.js Project Architecture

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Next.js 15 (App Router) | SSG/SSR for SEO, RSC for performance |
| Language | TypeScript | Type safety for Widmark formula logic |
| Styling | Tailwind CSS + CSS Variables | Utility-first, custom design tokens |
| Animation | Framer Motion | Smooth result transitions |
| SEO | next-seo + next/metadata | Structured meta, OpenGraph, JSON-LD |
| Deployment | Vercel | Edge CDN, Core Web Vitals optimized |

---

## Directory Structure

```
bac-calculator/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout — fonts, global meta, Google Analytics
│   ├── page.tsx                  # Homepage → redirects or renders /bac-calculator
│   ├── bac-calculator/
│   │   └── page.tsx              # Main SEO landing page (SSG, generateMetadata)
│   ├── blog/                     # Content hub for long-tail SEO
│   │   ├── page.tsx              # Blog index
│   │   └── [slug]/
│   │       └── page.tsx          # Individual article (MDX)
│   ├── sitemap.ts                # Auto-generated sitemap.xml
│   ├── robots.ts                 # robots.txt
│   └── globals.css               # CSS variables, base styles
│
├── components/
│   ├── calculator/
│   │   ├── BACCalculator.tsx     # Main calculator orchestrator (Client Component)
│   │   ├── InputForm.tsx         # Weight / drinks / time inputs
│   │   ├── ResultPanel.tsx       # Animated BAC result display
│   │   ├── BACBar.tsx            # Color-coded progress bar
│   │   └── DrinkSelector.tsx     # Standard drink picker
│   ├── content/
│   │   ├── BACTable.tsx          # BAC level effects table
│   │   ├── FactorsGrid.tsx       # 6-factor info cards
│   │   ├── LegalLimits.tsx       # Country/state legal BAC table
│   │   └── FAQ.tsx               # Accordion FAQ (Schema FAQPage)
│   ├── layout/
│   │   ├── Header.tsx            # Sticky nav
│   │   └── Footer.tsx            # Disclaimer + links
│   └── ui/
│       ├── RadioGroup.tsx        # Reusable pill toggle
│       ├── NumberInput.tsx       # Styled numeric input
│       └── SectionLabel.tsx      # Mono uppercase section tag
│
├── lib/
│   ├── bac.ts                    # Widmark formula — pure functions, fully typed
│   ├── constants.ts              # Legal limits, drink standards, BAC thresholds
│   └── metadata.ts               # Centralized SEO metadata factory
│
├── types/
│   └── calculator.ts             # BACInput, BACResult, DrinkType interfaces
│
├── content/                      # MDX blog articles (long-tail SEO)
│   ├── how-bac-is-calculated.mdx
│   ├── bac-calculator-vs-breathalyzer.mdx
│   └── legal-bac-limits-by-state.mdx
│
├── public/
│   ├── og-image.png              # 1200×630 OpenGraph image
│   └── favicon.ico
│
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Key File Responsibilities

### `lib/bac.ts` — Core Logic
```ts
// Pure, testable Widmark formula
export function calculateBAC(input: BACInput): BACResult {
  const r = input.sex === 'male' ? 0.68 : 0.55
  const weightG = input.weightLbs * 453.592
  const alcoholG = input.drinks * input.alcoholOzPerDrink * 23.36
  const rawBAC = (alcoholG / (weightG * r)) * 100
  const bac = Math.max(0, rawBAC - 0.015 * input.hoursElapsed)
  return { bac, level: getBACLevel(bac), soberInHours: bac / 0.015 }
}
```

### `app/bac-calculator/page.tsx` — SEO Page
```ts
// Static generation + full metadata
export const generateMetadata = (): Metadata => ({
  title: 'BAC Calculator – Check Blood Alcohol Level Instantly',
  description: '...',
  alternates: { canonical: 'https://bac-calculator.com/bac-calculator' },
  openGraph: { ... },
})

// Server Component wraps Client calculator
export default function BACCalculatorPage() {
  return (
    <>
      <JsonLd schema={webAppSchema} />   {/* Schema.org WebApplication */}
      <JsonLd schema={faqSchema} />      {/* Schema.org FAQPage */}
      <HeroSection />
      <BACCalculator />                  {/* "use client" boundary */}
      <BACTable />
      <FactorsGrid />
      <LegalLimits />
      <FAQ />
    </>
  )
}
```

### `app/sitemap.ts`
```ts
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://bac-calculator.com/bac-calculator', priority: 1.0 },
    { url: 'https://bac-calculator.com/blog', priority: 0.8 },
    // ... blog posts
  ]
}
```

---

## SEO Architecture

```
bac-calculator.com/
├── /bac-calculator          ← 核心词页 (priority 1.0)
├── /blog/
│   ├── how-bac-is-calculated          ← 长尾: "how is bac calculated"
│   ├── bac-calculator-vs-breathalyzer ← 长尾: "bac calculator vs breathalyzer"
│   └── legal-bac-limits-by-state      ← 长尾: "legal bac limit [state]"
├── /sitemap.xml             ← Auto-generated
└── /robots.txt              ← Allow all, point to sitemap
```

### Schema.org Types Used
- `WebApplication` on `/bac-calculator` (calculator tool)
- `FAQPage` on `/bac-calculator` (FAQ section)
- `Article` on each `/blog/[slug]`
- `BreadcrumbList` on all pages

---

## Component Architecture

```
BACCalculatorPage (Server Component)
└── BACCalculator (Client Component — "use client")
    ├── InputForm
    │   ├── RadioGroup (sex)
    │   ├── RadioGroup (weight unit)
    │   ├── NumberInput (weight)
    │   ├── NumberInput (drinks)
    │   ├── NumberInput (hours)
    │   └── DrinkSelector
    └── ResultPanel
        ├── BACDisplay (animated number)
        ├── BACBar (color-coded)
        └── ResultMeta (time to sober, etc.)
```

---

## Performance Strategy

| Goal | Implementation |
|------|---------------|
| LCP < 2.5s | Hero is Server Component, no JS blocking |
| CLS = 0 | Result panel pre-allocated height |
| FID / INP | Calculator logic is synchronous, no async |
| Core Web Vitals | next/font (zero layout shift), next/image |
| Bundle size | Calculator logic in `lib/bac.ts` — zero deps |

---

## Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://bac-calculator.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX   # Google Analytics 4
```
