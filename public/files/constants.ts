// lib/constants.ts

import type { DrinkType, LegalLimit } from '@/types/calculator'

export const DRINK_TYPES: DrinkType[] = [
  { id: 'beer',        label: 'Regular Beer',    alcoholOz: 0.6,  description: '12 oz, 5% ABV' },
  { id: 'strong-beer', label: 'Strong Beer',     alcoholOz: 0.9,  description: '12 oz, 7.5% ABV' },
  { id: 'wine',        label: 'Wine',            alcoholOz: 0.6,  description: '5 oz, 12% ABV' },
  { id: 'shot',        label: 'Shot / Spirits',  alcoholOz: 0.6,  description: '1.5 oz, 40% ABV' },
  { id: 'double',      label: 'Double Shot',     alcoholOz: 1.2,  description: '3 oz, 40% ABV' },
  { id: 'cocktail',    label: 'Mixed Cocktail',  alcoholOz: 0.75, description: 'Avg 1–1.5 oz spirits' },
]

export const LEGAL_LIMITS: LegalLimit[] = [
  { country: 'United States', flag: '🇺🇸', limitPercent: 0.08, notes: 'Utah: 0.05%. Zero tolerance under 21.' },
  { country: 'United Kingdom', flag: '🇬🇧', limitPercent: 0.08, notes: 'Scotland: 0.05%' },
  { country: 'Most of Europe', flag: '🇪🇺', limitPercent: 0.05, notes: 'Germany, France, Italy, Spain' },
  { country: 'Canada',         flag: '🇨🇦', limitPercent: 0.08, notes: 'Warning range starts at 0.05%' },
  { country: 'Australia',      flag: '🇦🇺', limitPercent: 0.05, notes: '0.00% for probationary drivers' },
  { country: 'Japan',          flag: '🇯🇵', limitPercent: 0.03, notes: 'Strict enforcement; near zero tolerance' },
]

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bac-calculator.com'
