# BAC Calculator — Homepage Optimization Tasks

## Context

- **Site**: baccalculator.me
- **Tech stack**: Next.js 15 App Router, TypeScript, Tailwind CSS, Framer Motion
- **Homepage route**: `app/[locale]/page.tsx`
- **Full calculator route**: `app/[locale]/bac-calculator/page.tsx`
- **Quick calculator component**: `components/calculator/QuickBACCalculator.tsx`

---

## Goal

The homepage serves drunk users who need to check their BAC immediately.
Design principle: **minimum cognitive load, maximum speed to result.**

The homepage is a **tool-first page (Transactional intent)**, not an informational page.
All educational content (BAC table, factors, legal limits, FAQ) belongs on `/bac-calculator` only.

---

## Task 1 — Remove Duplicate Content from Homepage

### Problem
The homepage currently contains the same content as `/bac-calculator`:
- BAC level table
- Factors that affect BAC (6 cards)
- Legal BAC limits by state and country
- FAQ section (7 questions)

This causes duplicate content issues and dilutes SEO across both pages.

### Action
Delete the following sections from `app/[locale]/page.tsx`:
- `<BACTable />` component
- `<FactorsGrid />` component
- `<LegalLimits />` component
- `<FAQ />` component

Keep these sections only in `app/[locale]/bac-calculator/page.tsx`.

---

## Task 2 — Replace Full Calculator with Quick Calculator on Homepage

### Problem
The homepage uses the same `<BACCalculator />` component as the full page.
This includes fields that are too complex for a quick check:
- Country selector (22 countries)
- 6 drink types via dropdown
- Detailed result panel with legal comparison

### Action
Create `components/calculator/QuickBACCalculator.tsx` as a new simplified component.

#### Field spec

| Field | UI Pattern | Default Value | Notes |
|-------|-----------|---------------|-------|
| Drink type | 3 large icon buttons | Beer | Beer / Wine / Shot only |
| Number of drinks | Stepper `− N +` | 2 | No keyboard required |
| Biological sex | Toggle pill | Male | |
| Body weight | Stepper `− N +` + lbs/kg toggle | 160 lbs | Switch between lbs and kg |
| Hours since first drink | Stepper `− N +` | 1 | Step: 0.5 |

#### Result display
- Show BAC number (large, color-coded)
- Show single status label (e.g. "IMPAIRED — DO NOT DRIVE")
- Show estimated hours to sober
- Do NOT show country legal comparison (save for full calculator)
- Show CTA link: "→ Full calculator with country limits" pointing to `/bac-calculator`

#### Stepper behavior
- Drinks: min 0, max 30, step 1
- Weight lbs: min 80, max 400, step 5
- Weight kg: min 35, max 180, step 1
- Hours: min 0, max 24, step 0.5

---

## Task 3 — Fix Field Order in Quick Calculator

### Problem
Current field order puts "Number of Drinks" last.
Drunk users want to enter drinks first — it is the most intuitive starting point.

### Action
Use this field order in `QuickBACCalculator.tsx`:

1. Drink type (Beer / Wine / Shot)
2. Number of drinks
3. Biological sex
4. Body weight + unit toggle
5. Hours since first drink

---

## Task 4 — Fix H1 Position on Homepage

### Problem
The H1 tag appears inside the "Instant Estimator" section, after the calculator card.
Google weights H1 tags higher when they appear near the top of the page.

### Action
In `app/[locale]/page.tsx`, place the H1 as the first visible text element above the calculator card.

```tsx
// Correct structure
<main>
  <section>
    <h1>BAC Calculator — Know Your Blood Alcohol Content Instantly</h1>
    <p>/* subtitle */</p>
    <QuickBACCalculator />   {/* calculator below H1 */}
  </section>
</main>
```

---

## Task 5 — Remove Simple / Normal Tab

### Problem
The homepage shows a `Simple / Normal` tab switcher.
The distinction between the two modes is unclear to users.
This adds cognitive friction, especially for drunk users.

### Action
Remove the tab switcher entirely from the homepage calculator.
The homepage only shows the Simple (quick) version.
The Normal / full version is accessible via the `/bac-calculator` link.

---

## Task 6 — Add Lightweight Anchor Text Below Calculator

### Problem
If all educational content is removed, the homepage has near-zero body text.
While Google accepts low word count for tool pages, the page needs minimal keyword anchoring and internal links.

### Action
Add a short text block (target: 150–200 words) below the calculator card.
Do NOT reproduce full educational content — just anchor text and internal links.

#### Required elements

```tsx
<section>
  <h2>How This BAC Calculator Works</h2>
  <p>
    This BAC Calculator uses the Widmark formula to estimate blood alcohol content
    from your weight, sex, drinks, and time elapsed. Results are educational estimates —
    not a substitute for a breathalyzer or medical test.
  </p>
  <a href="/bac-calculator">See full methodology →</a>
</section>

<section>
  <h2>Is Your BAC Legal Where You Are?</h2>
  <p>
    Legal BAC limits vary by country — from 0.08% in the US and Canada,
    to zero tolerance in Brazil, Hungary, and Czech Republic.
    The full BAC Calculator lets you select your country and see
    exactly where you stand against local law.
  </p>
  <a href="/bac-calculator#legal">Check legal limits by country →</a>
</section>
```

#### Keyword requirements
- "BAC Calculator" must appear at least 4 times in the page body
- "blood alcohol content" must appear at least 2 times
- Both H2s must contain "BAC Calculator"

---

## Task 7 — Deduplicate Disclaimer

### Problem
The "Use Responsibly" disclaimer block appears twice on the homepage:
once in the calculator section, once in the hero section.

### Action
Keep only one disclaimer instance, placed directly below the calculate button inside the calculator card.

```tsx
// Single disclaimer — inside calculator card, below CTA button
<p className="font-mono text-xs text-muted text-center mt-3">
  Educational estimate only. Never use to decide whether to drive.
</p>
```

Remove the standalone "Use Responsibly" section block from the hero.

---

## Task 8 — Update Navigation Label

### Problem
The nav link says "Calculator" but the homepage already has a calculator.
Users clicking "Calculator" expect to go to a different page, causing confusion.

### Action
In `components/layout/Header.tsx`, change the nav link label:

```tsx
// Before
<Link href="/bac-calculator">Calculator</Link>

// After
<Link href="/bac-calculator">Full Calculator</Link>
```

---

## Task 9 — Homepage SEO Metadata

### Action
Update `generateMetadata` in `app/[locale]/page.tsx`:

```ts
title: "BAC Calculator — Check Your Blood Alcohol Content Instantly"
description: "Free BAC Calculator. Enter your drinks, weight, and time to estimate blood alcohol content in seconds. No login required."
canonical: "https://bac-calculators.org"
```

The homepage canonical must point to the root URL (no `/en/` prefix per the `localePrefix: 'as-needed'` config).

---

## Task 10 — Add CTA Link to Full Calculator

### Action
Inside `QuickBACCalculator.tsx`, below the result panel, add a persistent link:

```tsx
<div className="text-center mt-4">
  <Link href="/bac-calculator" className="font-mono text-xs text-accent">
    Full calculator — country legal limits, more drink types →
  </Link>
</div>
```

This link must always be visible (not just after calculation), so users on `/bac-calculator` understand what the full version offers before they calculate.

---

## Expected Page Structure After All Tasks

```
app/[locale]/page.tsx (Homepage)
├── <Header />
├── <main>
│   ├── <h1> BAC Calculator ... </h1>          ← Task 4
│   ├── <QuickBACCalculator />                  ← Task 2, 3, 5
│   │   ├── Drink type (3 icon buttons)
│   │   ├── Number of drinks (stepper)
│   │   ├── Sex toggle
│   │   ├── Weight stepper + lbs/kg
│   │   ├── Hours stepper
│   │   ├── [Calculate My BAC Now]
│   │   ├── Result panel (BAC + status + sober time)
│   │   ├── Disclaimer (single instance)        ← Task 7
│   │   └── → Full Calculator link              ← Task 10
│   ├── <section> How This BAC Calculator Works ← Task 6
│   └── <section> Is Your BAC Legal ...         ← Task 6
├── <Footer />

app/[locale]/bac-calculator/page.tsx (Full Calculator)
├── <Header />
├── <main>
│   ├── Hero section with H1
│   ├── <BACCalculator />     ← full version, unchanged
│   ├── <BACTable />
│   ├── <FactorsGrid />
│   ├── <LegalLimits />       ← 22 countries
│   └── <FAQ />               ← all 7 questions expanded
├── <Footer />
```

---

## Files to Modify

| File | Change |
|------|--------|
| `app/[locale]/page.tsx` | Remove educational sections, add QuickBACCalculator, fix H1, add anchor text |
| `components/calculator/QuickBACCalculator.tsx` | Create new file |
| `components/layout/Header.tsx` | Change "Calculator" → "Full Calculator" |
| `app/[locale]/bac-calculator/page.tsx` | Ensure all educational content present, FAQ default open |
| `components/content/FAQ.tsx` | Change default state to all items open |

## Files to Leave Unchanged

| File | Reason |
|------|--------|
| `components/calculator/BACCalculator.tsx` | Full calculator, used only on `/bac-calculator` |
| `components/content/BACTable.tsx` | Stays on `/bac-calculator` only |
| `components/content/FactorsGrid.tsx` | Stays on `/bac-calculator` only |
| `components/content/LegalLimits.tsx` | Stays on `/bac-calculator` only |
| `lib/bac.ts` | Core logic unchanged |
| `lib/constants.ts` | Data unchanged |
