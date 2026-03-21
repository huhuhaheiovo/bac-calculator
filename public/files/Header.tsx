// components/layout/Header.tsx
import Link from 'next/link'

export default function Header() {
  return (
    <nav className="border-b border-border sticky top-0 z-50"
      style={{ background: 'rgba(10,14,15,0.95)', backdropFilter: 'blur(12px)' }}>
      <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/bac-calculator" className="font-mono text-sm font-semibold text-accent tracking-wide">
          bac-calculators<span className="text-muted">.org</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/blog" className="font-mono text-xs text-muted hover:text-text transition-colors">
            Learn
          </Link>
          <span className="font-mono text-xs text-muted border border-border px-3 py-1.5 rounded-sm">
            Free · No Login
          </span>
        </div>
      </div>
    </nav>
  )
}
