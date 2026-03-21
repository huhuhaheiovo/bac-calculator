// lib/bac.ts
// Pure Widmark formula — no side effects, fully testable

import type { BACInput, BACResult, BACLevel } from '@/types/calculator'

const WIDMARK_R = { male: 0.68, female: 0.55 } as const
const METABOLISM_RATE = 0.015 // % BAC per hour (average)
const LBS_TO_GRAMS = 453.592
const FL_OZ_ALCOHOL_TO_GRAMS = 23.36 // 1 fl oz pure alcohol = 23.36g

export function calculateBAC(input: BACInput): BACResult {
  const r = WIDMARK_R[input.sex]
  const weightG = input.weightLbs * LBS_TO_GRAMS
  const alcoholG = input.drinks * input.alcoholOzPerDrink * FL_OZ_ALCOHOL_TO_GRAMS

  const rawBAC = (alcoholG / (weightG * r)) * 100
  const bac = Math.max(0, rawBAC - METABOLISM_RATE * input.hoursElapsed)
  const bacRounded = Math.round(bac * 1000) / 1000

  return {
    bac: bacRounded,
    level: getBACLevel(bacRounded),
    soberInHours: bac > 0 ? Math.ceil((bac / METABOLISM_RATE) * 10) / 10 : 0,
    isLegal: bacRounded < 0.08,
  }
}

export function getBACLevel(bac: number): BACLevel {
  if (bac === 0) return 'sober'
  if (bac < 0.05) return 'minimal'
  if (bac < 0.08) return 'mild'
  if (bac < 0.15) return 'impaired'
  if (bac < 0.25) return 'severe'
  return 'danger'
}

export const BAC_LEVEL_CONFIG: Record<BACLevel, {
  label: string
  color: string
  bgColor: string
  description: string
}> = {
  sober:    { label: 'SOBER',                color: '#00d4aa', bgColor: 'rgba(0,212,170,0.08)',   description: 'No measurable blood alcohol content.' },
  minimal:  { label: 'MINIMAL',              color: '#00d4aa', bgColor: 'rgba(0,212,170,0.08)',   description: 'Slight relaxation. Below legal limits.' },
  mild:     { label: 'MILD IMPAIRMENT',      color: '#80e040', bgColor: 'rgba(128,224,64,0.08)',  description: 'Approaching legal limit. Judgment subtly affected.' },
  impaired: { label: 'IMPAIRED — DO NOT DRIVE', color: '#ffd166', bgColor: 'rgba(255,209,102,0.08)', description: 'Above legal limit. Significant impairment.' },
  severe:   { label: 'SEVERELY IMPAIRED',    color: '#ff6b35', bgColor: 'rgba(255,107,53,0.08)', description: 'Dangerous BAC. Major coordination loss.' },
  danger:   { label: '⚠ DANGER — SEEK HELP', color: '#ff4757', bgColor: 'rgba(255,71,87,0.08)',  description: 'Potentially life-threatening. Call emergency services.' },
}
