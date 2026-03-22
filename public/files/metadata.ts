// lib/metadata.ts
import type { Metadata } from 'next'
import { SITE_URL } from './constants'

export function buildMetadata({
  title,
  description,
  path,
  ogImage = '/og-image.png',
}: {
  title: string
  description: string
  path: string
  ogImage?: string
}): Metadata {
  const url = `${SITE_URL}${path}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'baccalculator.me',
      images: [{ url: `${SITE_URL}${ogImage}`, width: 1200, height: 630 }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_URL}${ogImage}`],
    },
  }
}

// JSON-LD schemas
export const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'BAC Calculator',
  description: 'Free online BAC Calculator using the Widmark formula to estimate blood alcohol content.',
  url: `${SITE_URL}/bac-calculator`,
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0' },
  publisher: { '@type': 'Organization', name: 'baccalculator.me', url: SITE_URL },
}

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How accurate is this BAC Calculator?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The BAC Calculator uses the Widmark formula, the standard method used by forensic toxicologists. Individual metabolism variation means results may differ by ±15–20%. Use as an educational guide only.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a standard drink for the BAC Calculator?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'One standard drink contains 0.6 fl oz (14g) of pure alcohol: one 12 oz regular beer (5%), one 5 oz glass of wine (12%), or one 1.5 oz shot of spirits (40%).',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take for BAC to return to zero?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The average person metabolizes alcohol at approximately 0.015% BAC per hour. At 0.08% BAC, it takes roughly 5–6 hours to reach 0.00%. Only time reduces BAC — coffee and water do not.',
      },
    },
  ],
}
