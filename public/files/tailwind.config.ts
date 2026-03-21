// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:       'var(--bg)',
        surface:  'var(--surface)',
        card:     'var(--card)',
        border:   'var(--border)',
        accent:   'var(--accent)',
        accent2:  'var(--accent2)',
        muted:    'var(--muted)',
        danger:   'var(--danger)',
      },
      fontFamily: {
        mono:  ['var(--font-mono)', 'monospace'],
        serif: ['var(--font-serif)', 'serif'],
        sans:  ['var(--font-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
