'use client'
// components/calculator/BACCalculator.tsx

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { calculateBAC, BAC_LEVEL_CONFIG } from '@/lib/bac'
import { DRINK_TYPES } from '@/lib/constants'
import type { Sex, WeightUnit, BACResult } from '@/types/calculator'

export default function BACCalculator() {
  const [sex, setSex] = useState<Sex>('male')
  const [unit, setUnit] = useState<WeightUnit>('lbs')
  const [weight, setWeight] = useState('')
  const [drinks, setDrinks] = useState('')
  const [hours, setHours] = useState('')
  const [drinkTypeId, setDrinkTypeId] = useState('beer')
  const [result, setResult] = useState<BACResult | null>(null)
  const [error, setError] = useState('')

  const selectedDrink = DRINK_TYPES.find(d => d.id === drinkTypeId)!

  function handleCalculate() {
    const w = parseFloat(weight)
    const d = parseFloat(drinks)
    const h = parseFloat(hours) || 0

    if (!w || w <= 0) { setError('Please enter your body weight.'); return }
    if (!d || d < 0)  { setError('Please enter number of drinks.'); return }
    setError('')

    const weightLbs = unit === 'kg' ? w * 2.20462 : w
    const res = calculateBAC({ sex, weightLbs, drinks: d, alcoholOzPerDrink: selectedDrink.alcoholOz, hoursElapsed: h })
    setResult(res)
  }

  const cfg = result ? BAC_LEVEL_CONFIG[result.level] : null
  const barPct = result ? Math.min((result.bac / 0.30) * 100, 100) : 0

  return (
    <section className="py-16 border-b border-border">
      <div className="max-w-3xl mx-auto px-6">
        <p className="font-mono text-xs text-accent tracking-widest uppercase mb-3">Interactive Tool</p>
        <h2 className="font-serif text-2xl md:text-3xl mb-2">How the BAC Calculator Works</h2>
        <p className="text-muted text-sm mb-8 max-w-lg">
          Input your details below. The BAC Calculator applies the Widmark formula to estimate
          your blood alcohol content instantly.
        </p>

        {/* Card */}
        <div className="bg-card border border-border rounded-sm overflow-hidden">

          {/* Card header */}
          <div className="bg-surface border-b border-border px-6 py-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="w-2 h-2 rounded-full bg-yellow-400" />
            <span className="w-2 h-2 rounded-full bg-green-400" />
            <span className="font-mono text-xs text-muted ml-2">bac-calculator.com — Widmark Formula Engine</span>
          </div>

          {/* Inputs */}
          <div className="p-7 grid grid-cols-1 sm:grid-cols-2 gap-5">

            {/* Sex */}
            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs text-muted uppercase tracking-widest">Biological Sex</label>
              <div className="flex gap-3">
                {(['male', 'female'] as Sex[]).map(s => (
                  <button key={s} onClick={() => setSex(s)}
                    className={`flex-1 py-2.5 font-mono text-xs border rounded-sm transition-all
                      ${sex === s
                        ? 'border-accent text-accent bg-accent/5'
                        : 'border-border text-muted hover:border-muted'}`}>
                    {s === 'male' ? '♂ Male' : '♀ Female'}
                  </button>
                ))}
              </div>
            </div>

            {/* Unit */}
            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs text-muted uppercase tracking-widest">Weight Unit</label>
              <div className="flex gap-3">
                {(['lbs', 'kg'] as WeightUnit[]).map(u => (
                  <button key={u} onClick={() => setUnit(u)}
                    className={`flex-1 py-2.5 font-mono text-xs border rounded-sm transition-all
                      ${unit === u
                        ? 'border-accent text-accent bg-accent/5'
                        : 'border-border text-muted hover:border-muted'}`}>
                    {u}
                  </button>
                ))}
              </div>
            </div>

            {/* Weight */}
            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs text-muted uppercase tracking-widest">Body Weight</label>
              <input type="number" value={weight} onChange={e => setWeight(e.target.value)}
                placeholder={unit === 'lbs' ? 'e.g. 160' : 'e.g. 72'} min="1" />
            </div>

            {/* Hours */}
            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs text-muted uppercase tracking-widest">Hours Drinking</label>
              <input type="number" value={hours} onChange={e => setHours(e.target.value)}
                placeholder="e.g. 2" min="0" step="0.5" />
            </div>

            {/* Drinks */}
            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs text-muted uppercase tracking-widest">Number of Drinks</label>
              <input type="number" value={drinks} onChange={e => setDrinks(e.target.value)}
                placeholder="e.g. 3" min="0" />
            </div>

            {/* Drink type */}
            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs text-muted uppercase tracking-widest">Drink Type</label>
              <select value={drinkTypeId} onChange={e => setDrinkTypeId(e.target.value)}>
                {DRINK_TYPES.map(d => (
                  <option key={d.id} value={d.id}>{d.label} ({d.description})</option>
                ))}
              </select>
            </div>

          </div>

          {/* Result */}
          <AnimatePresence>
            {result && cfg && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mx-7 mb-5 bg-surface border border-border rounded-sm p-6"
              >
                <div className="flex items-baseline gap-2 mb-3">
                  <motion.span
                    key={result.bac}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="font-mono text-5xl font-semibold leading-none"
                    style={{ color: cfg.color }}
                  >
                    {result.bac.toFixed(3)}%
                  </motion.span>
                  <span className="font-mono text-sm text-muted">BAC (g/dL)</span>
                </div>

                <span className="inline-block font-mono text-xs font-semibold tracking-widest uppercase px-2.5 py-1 rounded-sm mb-4 border"
                  style={{ color: cfg.color, background: cfg.bgColor, borderColor: cfg.color + '40' }}>
                  {cfg.label}
                </span>

                {/* Bar */}
                <div className="h-1.5 bg-border rounded-full overflow-hidden mb-4">
                  <motion.div className="h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${barPct}%` }}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{ background: cfg.color }}
                  />
                </div>

                <div className="font-mono text-xs text-muted leading-loose">
                  <span className="text-text font-semibold">Time to sober:</span> ~{result.soberInHours}h &nbsp;|&nbsp;
                  <span className="text-text font-semibold">Legal (US):</span> {result.isLegal ? '✓ Below 0.08%' : '✗ Above 0.08%'}
                  <div className="mt-2 text-muted/70">{cfg.description}</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error */}
          {error && <p className="mx-7 mb-4 font-mono text-xs text-danger">{error}</p>}

          {/* CTA */}
          <div className="px-7 pb-7">
            <button onClick={handleCalculate}
              className="w-full bg-accent text-bg font-mono text-sm font-semibold tracking-widest uppercase
                         py-4 rounded-sm hover:opacity-90 active:scale-99 transition-all">
              ▶ Calculate My BAC Now
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}
