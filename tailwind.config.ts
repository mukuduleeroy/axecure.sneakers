import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'lilac-veil': 'var(--color-lilac-veil)',
        'ink-black': 'var(--color-ink-black)',
        'warm-parchment': 'var(--color-warm-parchment)',
        'ivory-mist': 'var(--color-ivory-mist)',
        'brand-orange': 'var(--brand-orange)',
        'brand-red': 'var(--brand-red)',
        'brand-blue': 'var(--brand-blue)',
        'brand-paper': 'var(--brand-paper)',
      },
      fontFamily: {
        'good-sans': ['var(--font-good-sans)'],
        redaction: ['var(--font-redaction)'],
      },
      fontSize: {
        caption: ['var(--text-caption)', { lineHeight: 'var(--leading-caption)', letterSpacing: 'var(--tracking-caption)' }],
        body: ['var(--text-body)', { lineHeight: 'var(--leading-body)', letterSpacing: 'var(--tracking-body)' }],
        subheading: ['var(--text-subheading)', { lineHeight: 'var(--leading-subheading)', letterSpacing: 'var(--tracking-subheading)' }],
        heading: ['var(--text-heading)', { lineHeight: 'var(--leading-heading)', letterSpacing: 'var(--tracking-heading)' }],
        display: ['var(--text-display)', { lineHeight: 'var(--leading-display)', letterSpacing: 'var(--tracking-display)' }],
      },
      spacing: {
        5: 'var(--spacing-5)',
        10: 'var(--spacing-10)',
        15: 'var(--spacing-15)',
        20: 'var(--spacing-20)',
        30: 'var(--spacing-30)',
        60: 'var(--spacing-60)',
        80: 'var(--spacing-80)',
      },
      maxWidth: {
        page: 'var(--page-max-width)',
      },
      borderRadius: {
        card: 'var(--radius-cards)',
        badge: 'var(--radius-badges)',
        image: 'var(--radius-images)',
        button: 'var(--radius-buttons)',
      },
    },
  },
  plugins: [],
} satisfies Config;
