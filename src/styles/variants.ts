import { cva, type VariantProps } from 'class-variance-authority';

/* ── Topic palette (text/bg/border) ───────────────────────── */
export const topicText = cva('', {
  variants: {
    topic: {
      growth: 'text-[var(--color-mint-600)]',
      learn: 'text-[var(--color-yellow-600)]',
      challenge: 'text-[var(--color-pink-600)]',
      connect: 'text-[var(--color-blue-600)]',
      default: 'text-[var(--color-purple-500)]',
    },
  },
});

export const topicBgSoft = cva('', {
  variants: {
    topic: {
      growth: 'bg-[var(--color-mint-100)]',
      learn: 'bg-[var(--color-yellow-100)]',
      challenge: 'bg-[var(--color-pink-100)]',
      connect: 'bg-[var(--color-blue-100)]',
      default: 'bg-[var(--color-purple-100)]',
    },
  },
});

export const topicBgSolid = cva('', {
  variants: {
    topic: {
      growth: 'bg-[var(--color-mint-500)]',
      learn: 'bg-[var(--color-yellow-500)]',
      challenge: 'bg-[var(--color-pink-500)]',
      connect: 'bg-[var(--color-blue-500)]',
      default: 'bg-[var(--color-purple-500)]',
    },
  },
});

export const topicBorder = cva('border', {
  variants: {
    topic: {
      growth: 'border-[var(--color-mint-600)]',
      learn: 'border-[var(--color-yellow-600)]',
      challenge: 'border-[var(--color-pink-600)]',
      connect: 'border-[var(--color-blue-600)]',
      default: 'border-[var(--color-purple-500)]',
    },
  },
});

/* ── Typography (단일 소스) ──────────────────────────────── */
export const typo = cva('text-[var(--color-body)]', {
  variants: {
    variant: {
      /* Headings */
      h1: 'h1',
      h1Semibold: 'h1Semibold',
      h1Bold: 'h1Bold',
      h2: 'h2',
      h2Semibold: 'h2Semibold',
      h2Bold: 'h2Bold',
      h3: 'h3',
      h3Semibold: 'h3Semibold',
      h3Bold: 'h3Bold',
      h4: 'h4',
      h4Semibold: 'h4Semibold',
      h4Bold: 'h4Bold',
      h5: 'h5',
      h5Semibold: 'h5Semibold',
      h5Bold: 'h5Bold',

      /* Titles */
      pageTitle: 'page-title',
      sectionTitle: 'section-title',
      cardTitle: 'card-title',
      modalTitle: 'modal-title',

      /* Card/Main Title (28/32) */
      cardTitleLarge: 'card-title-large',
      cardTitleLargeBold: 'card-title-large-bold',

      /* Body / Meta */
      body: 'typo-body',
      bodyBold: 'typo-body-bold',
      bodyLg: 'typo-body-lg',
      bodySm: 'typo-body-sm',
      caption: 'caption',
      captionBold: 'caption-bold',
      eyebrow: 'eyebrow',
      tag: 'tag',
      badge: 'badge',

      /* Forms */
      formSectionLabel: 'page-title' /* 24/32 600 */,
      fieldLabel: 'label' /* 14/20 600 */,

      /* Special */
      cta: 'cta-label',
      metric40: 'metric-40',
    },
    color: {
      default: '',
      body: 'text-[var(--color-body)]',
      subtle: 'text-[var(--color-subtle)]',
      secondary: 'text-[var(--color-secondary)]',
      primary: 'text-[var(--color-primary)]',
      danger: 'text-[var(--color-red-500)]',
    },
    align: { left: 'text-left', center: 'text-center', right: 'text-right' },
    weight: { inherit: '', medium: 'font-medium', semibold: 'font-semibold', bold: 'font-bold' },
  },
  defaultVariants: { variant: 'body', color: 'body', align: 'left', weight: 'inherit' },
});
export type TypoProps = VariantProps<typeof typo>;
