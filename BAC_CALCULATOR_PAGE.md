# BAC Calculator — /bac-calculator Page Optimization Tasks

## Context

- **Route**: `app/[locale]/bac-calculator/page.tsx`
- **Purpose**: The full-featured BAC Calculator page. This is the primary SEO landing page targeting the keyword "BAC Calculator".
- **Search intent**: Mixed — users want to use the calculator AND learn about BAC, legal limits, and the Widmark formula.
- **Word count target**: 800+ words of body text across all sections.
- **Current live reference**: https://baccalculator.me/bac-calculator

---

## Current Problems Summary

| # | Problem | Severity |
|---|---------|----------|
| 1 | Calculator missing country selector | High |
| 2 | Only 3 drink types, no dropdown for more | High |
| 3 | No lbs/kg unit toggle on weight field | High |
| 4 | Simple/Normal tab with no clear distinction | Medium |
| 5 | Legal limits table only shows 6 countries | High |
| 6 | FAQ all collapsed except first item | Medium |
| 7 | "Method" section content is thin and vague | Medium |
| 8 | H1 appears after calculator, not before | Medium |
| 9 | Title tag not differentiated enough from homepage | Low |
| 10 | No Schema markup for FAQPage | Medium |

---

## Page Structure (Target State)

```
/bac-calculator
├── SEO Metadata (generateMetadata)
├── JSON-LD: WebApplication schema
├── JSON-LD: FAQPage schema
├── <Header />
└── <main>
    ├── Section 1: Hero
    ├── Section 2: Full Calculator  ← BACCalculator.tsx (upgraded)
    ├── Section 3: BAC Level Table
    ├── Section 4: Factors Grid
    ├── Section 5: Legal Limits     ← 22 countries (upgraded)
    ├── Section 6: Method / Formula
    ├── Section 7: FAQ              ← all expanded (upgraded)
    └── <Footer />
```

---

## Task 1 — Upgrade Calculator: Add Country Selector

### File
`components/calculator/BACCalculator.tsx`

### Problem
No country selector exists. Users cannot see whether their BAC is legal in their jurisdiction.

### Action
Add a country `<select>` as the **first field** in the calculator form, above all other inputs.

#### Data source
Import `COUNTRIES` array from `lib/constants.ts`. The array contains 22 countries with:
- `country`: display name
- `flag`: emoji flag
- `limitPercent`: legal BAC limit (number, e.g. `0.08`)
- `notes`: extra context string

#### UI spec
```tsx
// Full-width select, spans both grid columns
<div className="sm:col-span-2">
  <label>Your Country / Legal BAC Limit</label>
  <select value={countryIdx} onChange={...}>
    {COUNTRIES.map((c, i) => (
      <option value={i}>
        {c.flag}  {c.country}  —  {c.limitPercent === 0 ? 'Zero Tolerance' : `${c.limitPercent.toFixed(3)}%`}
      </option>
    ))}
  </select>
  {/* Info strip below select showing selected country notes */}
  <div className="info-strip">
    {selectedCountry.flag} {selectedCountry.country}
    · Legal limit: {legalLimitLabel}
    · {selectedCountry.notes}
  </div>
</div>
```

#### Result panel addition
After calculating, show a legal verdict card inside the result panel:

```tsx
// Green if BAC <= country limit, red if BAC > country limit
<div className={isLegalInCountry ? 'verdict-safe' : 'verdict-danger'}>
  {selectedCountry.flag}
  {isLegalInCountry
    ? `✓ Below ${selectedCountry.country} legal limit (${legalLimitLabel})`
    : `✗ EXCEEDS ${selectedCountry.country} legal limit (${legalLimitLabel})`
  }
  <p>{selectedCountry.notes}</p>
</div>
```

#### Default country
Default to index `0` = United States (`limitPercent: 0.08`).

---

## Task 2 — Upgrade Calculator: Add More Drink Types

### File
`components/calculator/BACCalculator.tsx`

### Problem
Only 3 drink types available (Regular Beer, Wine, Shot). Missing strong beer, double shot, cocktail.

### Action
Replace the 3 icon-button drink selector with a `<select>` dropdown populated from `DRINK_TYPES` in `lib/constants.ts`.

#### Data source
`DRINK_TYPES` array in `lib/constants.ts` — 6 items:

| id | label | alcoholOz | description |
|----|-------|-----------|-------------|
| beer | Regular Beer | 0.6 | 12 oz, 5% ABV |
| strong-beer | Strong Beer | 0.9 | 12 oz, 7.5% ABV |
| wine | Wine | 0.6 | 5 oz, 12% ABV |
| shot | Shot / Spirits | 0.6 | 1.5 oz, 40% ABV |
| double | Double Shot | 1.2 | 3 oz, 40% ABV |
| cocktail | Mixed Cocktail | 0.75 | Avg 1–1.5 oz spirits |

#### UI spec
```tsx
<select value={drinkTypeId} onChange={e => setDrinkTypeId(e.target.value)}>
  {DRINK_TYPES.map(d => (
    <option key={d.id} value={d.id}>
      {d.label} ({d.description})
    </option>
  ))}
</select>
```

---

## Task 3 — Upgrade Calculator: Add lbs/kg Unit Toggle

### File
`components/calculator/BACCalculator.tsx`

### Problem
Body weight field has no unit indicator. Non-US users don't know whether to enter lbs or kg.

### Action
Add a `lbs / kg` toggle pill alongside the weight field. Maintain state with `useState<'lbs' | 'kg'>('lbs')`.

#### Conversion logic
```ts
const weightLbs = unit === 'kg' ? weightRaw * 2.20462 : weightRaw
```

Pass `weightLbs` to `calculateBAC()` — the core formula always uses lbs internally.

#### UI spec
```tsx
<div className="field-group">
  <label>Body Weight</label>
  <div className="input-with-toggle">
    <input type="number" value={weight} placeholder={unit === 'lbs' ? '160' : '72'} />
    <div className="unit-toggle">
      <button className={unit === 'lbs' ? 'active' : ''} onClick={() => setUnit('lbs')}>lbs</button>
      <button className={unit === 'kg'  ? 'active' : ''} onClick={() => setUnit('kg')}>kg</button>
    </div>
  </div>
</div>
```

---

## Task 4 — Remove Simple / Normal Tab from Full Calculator

### File
`components/calculator/BACCalculator.tsx`

### Problem
The `Simple / Normal` tab switcher has no clear UX purpose on the full calculator page.
The full calculator is always the "Normal" version.

### Action
Remove the tab switcher entirely. The full calculator always shows all fields.

---

## Task 5 — Upgrade Legal Limits Section: 22 Countries

### File
`components/content/LegalLimits.tsx`

### Problem
The current legal limits section only shows 6 countries (US, UK England, UK Scotland, Canada, Australia, Germany).
Our `COUNTRIES` array in `lib/constants.ts` already has 22 countries.

### Action
Replace the hardcoded 6-country display with a full table using the `COUNTRIES` array.

#### Color coding by limit severity
```ts
const limitColor =
  c.limitPercent === 0    ? 'var(--danger)'   // Zero tolerance → red
  : c.limitPercent <= 0.02 ? 'var(--accent2)'  // ≤ 0.02% → orange
  : c.limitPercent <= 0.05 ? 'var(--accent3)'  // ≤ 0.05% → yellow
  : 'var(--text)'                              // 0.08% → white
```

#### Table columns
| Country | Legal Limit | Notes |
|---------|-------------|-------|

#### Full country list to render (from `COUNTRIES` in `lib/constants.ts`)
All 22 entries including:
- United States (0.08%) — Utah 0.05%, zero tolerance under 21
- UK England & Wales (0.08%)
- UK Scotland (0.05%)
- Canada (0.08%)
- Australia (0.05%)
- Germany (0.05%)
- France (0.05%)
- Japan (0.03%)
- China (0.02%)
- Sweden (0.02%)
- Brazil (Zero)
- Hungary (Zero)
- Czech Republic (Zero)
- India (0.03%)
- Mexico (0.08%)
- New Zealand (0.05%)
- South Africa (0.05%)
- South Korea (0.03%)
- Singapore (0.08%)
- Norway (0.02%)
- Poland (0.02%)
- Russia (0.035%)

#### Add color legend below table
```tsx
<p>
  <span style={{ color: 'var(--danger)' }}>■</span> Zero tolerance &nbsp;
  <span style={{ color: 'var(--accent2)' }}>■</span> ≤ 0.02% &nbsp;
  <span style={{ color: 'var(--accent3)' }}>■</span> ≤ 0.05% &nbsp;
  <span>■</span> 0.08%
</p>
```

---

## Task 6 — FAQ: Default All Items Expanded

### File
`components/content/FAQ.tsx`

### Problem
All FAQ items are collapsed by default except the first one.
Collapsed content receives slightly lower SEO weight than visible content.
The most important FAQ items (Widmark formula, safe driving) are hidden on load.

### Action
Change the default `open` state so all items are expanded on initial render.

```tsx
// Before
const [open, setOpen] = useState<number | null>(null)

// After — all items open by default
const [openItems, setOpenItems] = useState<Set<number>>(
  () => new Set([0, 1, 2, 3, 4, 5, 6])  // all 7 items open
)

// Toggle handler
function toggle(i: number) {
  setOpenItems(prev => {
    const next = new Set(prev)
    next.has(i) ? next.delete(i) : next.add(i)
    return next
  })
}
```

#### FAQ item order (most important first)
Reorder FAQ items so the most SEO-valuable questions appear first:

1. How accurate is this BAC Calculator?
2. What is the Widmark formula used in this BAC Calculator?
3. How long does it take for BAC to return to zero?
4. What counts as one standard drink in the BAC Calculator?
5. Why does biological sex affect the BAC Calculator result?
6. Does eating food lower my BAC?
7. Can I use the BAC Calculator to decide if I am safe to drive?

---

## Task 7 — Upgrade "Method" Section Content

### File
`app/[locale]/bac-calculator/page.tsx` or a new `components/content/Method.tsx`

### Problem
The "Why This BAC Calculator Uses These Inputs" section exists but the content is vague and thin.
Each subsection is only 1–2 sentences. This is a missed opportunity for keyword-rich content.

### Action
Expand each subsection to 3–4 sentences minimum. Target 200+ words for the full section.

#### Required subsections and minimum content

**Widmark Formula** (target: 80 words)
- Explain what the formula is: `BAC = (A / W × r) × 100 − (0.015 × T)`
- Define each variable: A = alcohol in grams, W = body weight in grams, r = distribution constant, T = hours elapsed
- Note that r = 0.68 for males, 0.55 for females
- Mention Erik Widmark developed it in the 1930s and it remains the forensic standard

**Standard Drink Conversion** (target: 60 words)
- Define one US standard drink = 0.6 fl oz = 14g pure alcohol
- Give examples: 12 oz beer (5%), 5 oz wine (12%), 1.5 oz spirits (40%)
- Explain why drink type matters: strong beer has ~50% more alcohol than regular beer

**Average Metabolism Rate** (target: 60 words)
- State 0.015% BAC per hour is the average
- Note that real metabolism can range from 0.010% to 0.020% depending on liver health, food, genetics
- Explicitly state: coffee, water, cold showers do NOT accelerate metabolism
- Only time reduces BAC

---

## Task 8 — Fix H1 Position

### File
`app/[locale]/bac-calculator/page.tsx`

### Problem
The H1 tag currently appears inside the "Instant Estimator" hero block, which renders after the calculator card in the HTML flow.

### Action
Ensure the H1 is the **first semantic heading** in `<main>`, above the calculator card.

```tsx
<main>
  <section className="hero">
    {/* Section label */}
    <p className="section-label">Blood Alcohol Content Tool</p>

    {/* H1 MUST be here — first heading in main */}
    <h1>BAC Calculator: Know Your Blood Alcohol Content Before You Drive</h1>

    <p className="subtitle">
      Our free BAC Calculator uses the scientifically validated Widmark formula
      to estimate your blood alcohol content in seconds.
    </p>
    <div className="disclaimer-banner">
      ⚠ Educational purposes only. Never use to decide whether to drive.
    </div>
  </section>

  {/* Calculator comes AFTER H1 */}
  <BACCalculator />

  {/* Rest of content */}
  ...
</main>
```

---

## Task 9 — Update SEO Metadata

### File
`app/[locale]/bac-calculator/page.tsx` — `generateMetadata()`

### Current (live)
```
title: "BAC Calculator - Check Blood Alcohol Content Online"
```

### Target
```ts
title: "BAC Calculator — Blood Alcohol Content by Country & Drink Type | bac-calculators.org"
description: "Free BAC Calculator for 22 countries. Enter your drinks, weight, and time to estimate blood alcohol content using the Widmark formula. Compare your BAC against local legal limits."
canonical: "https://bac-calculators.org/bac-calculator"
```

#### hreflang alternates (for i18n)
```ts
alternates: {
  canonical: 'https://bac-calculators.org/bac-calculator',
  languages: {
    'en':        'https://bac-calculators.org/bac-calculator',
    'zh':        'https://bac-calculators.org/zh/bac-calculator',
    'ja':        'https://bac-calculators.org/ja/bac-calculator',
    'x-default': 'https://bac-calculators.org/bac-calculator',
  }
}
```

---

## Task 10 — Add FAQPage JSON-LD Schema

### File
`lib/metadata.ts` — update `faqSchema` + inject into page

### Problem
No `FAQPage` structured data exists. This is a missed opportunity for Google FAQ rich results, which can significantly increase CTR from search.

### Action
The `faqSchema` object already exists in `lib/metadata.ts`. Ensure it is injected into the page via a `<JsonLd>` component and covers all 7 FAQ items.

```tsx
// In app/[locale]/bac-calculator/page.tsx
function JsonLd({ schema }: { schema: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default function BACCalculatorPage() {
  return (
    <>
      <JsonLd schema={webAppSchema} />
      <JsonLd schema={faqSchema} />   {/* ← ensure this is present */}
      ...
    </>
  )
}
```

#### Verify faqSchema covers all 7 questions
Update `faqSchema` in `lib/metadata.ts` to include all 7 FAQ items matching the expanded FAQ component:

1. How accurate is this BAC Calculator?
2. What is the Widmark formula used in this BAC Calculator?
3. How long does it take for BAC to return to zero?
4. What counts as one standard drink?
5. Why does biological sex affect the result?
6. Does eating food lower my BAC?
7. Can I use the BAC Calculator to decide if I am safe to drive?

---

## Keyword Requirements for the Full Page

The `/bac-calculator` page is the primary SEO target. Ensure these densities across all visible body text:

| Keyword | Minimum occurrences | Locations |
|---------|--------------------|----|
| `BAC Calculator` | 12+ | H1, H2s, intro para, calculator label, table intro, FAQ questions, method section |
| `blood alcohol content` | 5+ | Hero subtitle, BAC table intro, method section, FAQ answers |
| `Widmark formula` | 4+ | Calculator card header, method section (×2), FAQ answer |
| `legal limit` | 6+ | Country selector label, result verdict, legal limits section intro, FAQ |
| `blood alcohol` | 3+ | Scattered naturally in body text |

---

## Expected Final Page Structure

```
app/[locale]/bac-calculator/page.tsx
│
├── generateMetadata()                     ← Task 9
├── JsonLd: webAppSchema
├── JsonLd: faqSchema (all 7 items)        ← Task 10
│
├── <Header />
│
└── <main>
    │
    ├── [Section 1] Hero
    │   ├── section-label: "Blood Alcohol Content Tool"
    │   ├── <h1> BAC Calculator: Know Your Blood Alcohol Content Before You Drive
    │   ├── subtitle paragraph (contains "BAC Calculator" + "blood alcohol content")
    │   └── disclaimer banner (1 instance only)
    │
    ├── [Section 2] Full Calculator        ← BACCalculator.tsx
    │   ├── section-label: "Interactive Tool"
    │   ├── <h2> How the BAC Calculator Works
    │   ├── description paragraph
    │   └── Calculator card
    │       ├── Country selector (22 countries)   ← Task 1
    │       ├── Sex toggle
    │       ├── lbs/kg weight field               ← Task 3
    │       ├── Drink type select (6 types)        ← Task 2
    │       ├── Number of drinks input
    │       ├── Hours input
    │       ├── [Calculate My BAC Now] button
    │       └── Result panel
    │           ├── BAC number (color-coded)
    │           ├── Status label
    │           ├── Progress bar
    │           ├── Country legal verdict card     ← Task 1
    │           └── Meta stats (sober time, etc.)
    │
    ├── [Section 3] BAC Level Table        ← BACTable.tsx (unchanged)
    │   ├── section-label: "Education"
    │   ├── <h2> What Your BAC Level Really Means
    │   ├── intro paragraph (2 paragraphs, 100+ words)
    │   └── 5-row table (0.01–0.05, 0.06–0.08, 0.09–0.15, 0.16–0.25, 0.26%+)
    │
    ├── [Section 4] Factors Grid           ← FactorsGrid.tsx (unchanged)
    │   ├── section-label: "Science"
    │   ├── <h2> Factors That Affect Your BAC
    │   ├── intro paragraph
    │   └── 6 cards: Weight, Sex, Time, Food, Medications, Genetics
    │
    ├── [Section 5] Legal Limits           ← LegalLimits.tsx (upgraded)
    │   ├── section-label: "Legal Reference"
    │   ├── <h2> Legal BAC Limits by State & Country
    │   ├── intro paragraph (mentions 0.08% US, zero tolerance countries)
    │   ├── US breakdown grid (Most States / Utah / Under 21 / CDL)
    │   ├── Full 22-country table with color coding  ← Task 5
    │   └── color legend + disclaimer note
    │
    ├── [Section 6] Method / Formula       ← upgraded inline or new component
    │   ├── section-label: "Method"
    │   ├── <h2> Why This BAC Calculator Uses These Inputs
    │   ├── <h3> Widmark Formula (80+ words)    ← Task 7
    │   ├── <h3> Standard Drink Conversion (60+ words)
    │   └── <h3> Average Metabolism Rate (60+ words)
    │
    ├── [Section 7] FAQ                    ← FAQ.tsx (upgraded)
    │   ├── section-label: "Help"
    │   ├── <h2> BAC Calculator FAQ
    │   ├── intro paragraph
    │   └── 7 accordion items — ALL EXPANDED BY DEFAULT  ← Task 6
    │       ├── Q1: How accurate is this BAC Calculator?
    │       ├── Q2: What is the Widmark formula?
    │       ├── Q3: How long does it take for BAC to return to zero?
    │       ├── Q4: What counts as one standard drink?
    │       ├── Q5: Why does biological sex affect the result?
    │       ├── Q6: Does eating food lower my BAC?
    │       └── Q7: Can I use this to decide if I am safe to drive?
    │
    └── <Footer />
```

---

## Files to Modify

| File | Tasks |
|------|-------|
| `app/[locale]/bac-calculator/page.tsx` | Task 8, Task 9, Task 10 |
| `components/calculator/BACCalculator.tsx` | Task 1, Task 2, Task 3, Task 4 |
| `components/content/LegalLimits.tsx` | Task 5 |
| `components/content/FAQ.tsx` | Task 6 |
| `lib/metadata.ts` | Task 10 (expand faqSchema to 7 items) |

## Files to Leave Unchanged

| File | Reason |
|------|--------|
| `components/content/BACTable.tsx` | Content and structure are correct |
| `components/content/FactorsGrid.tsx` | Content and structure are correct |
| `components/layout/Header.tsx` | Handled in OPTIMIZATION.md |
| `components/layout/Footer.tsx` | No changes needed |
| `lib/bac.ts` | Core logic unchanged |
| `lib/constants.ts` | Already has 22 countries and 6 drink types |
| `types/calculator.ts` | Type definitions unchanged |
