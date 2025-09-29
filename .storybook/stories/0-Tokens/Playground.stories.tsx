import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { chip, ChipProps } from '../../../src/styles/variants';

/** ─────────────────────────────────────────────────────────
 * Playground: Typography + Surfaces + Chip
 * - 텍스트: variant / textColor / 배경(surface·canvas·transparent or gradient)
 * - Surface: radius / shadow / padding / width
 * - Chip: size / density / shape / tone / topic / icon / typo / textColor(custom 지원)
 * ───────────────────────────────────────────────────────── */

type Variant =
  | 'h1'
  | 'h1Semibold'
  | 'h1Bold'
  | 'h2'
  | 'h2Semibold'
  | 'h2Bold'
  | 'h3'
  | 'h3Semibold'
  | 'h3Bold'
  | 'h4'
  | 'h4Semibold'
  | 'h4Bold'
  | 'h5'
  | 'h5Semibold'
  | 'h5Bold'
  | 'page-title'
  | 'section-title'
  | 'card-title'
  | 'modal-title'
  | 'typo-body'
  | 'typo-body-bold'
  | 'typo-body-lg'
  | 'typo-body-sm'
  | 'label'
  | 'label-sm'
  | 'eyebrow'
  | 'caption'
  | 'caption-bold'
  | 'tag'
  | 'badge'
  | 'metric-40';

const textVariants: Variant[] = [
  'h1',
  'h1Semibold',
  'h1Bold',
  'h2',
  'h2Semibold',
  'h2Bold',
  'h3',
  'h3Semibold',
  'h3Bold',
  'h4',
  'h4Semibold',
  'h4Bold',
  'h5',
  'h5Semibold',
  'h5Bold',
  'page-title',
  'section-title',
  'card-title',
  'modal-title',
  'typo-body',
  'typo-body-bold',
  'typo-body-lg',
  'typo-body-sm',
  'label',
  'label-sm',
  'eyebrow',
  'caption',
  'caption-bold',
  'tag',
  'badge',
  'metric-40',
];

const colorVars = [
  // Semantic
  '--color-body',
  '--color-subtle',
  '--color-secondary',
  '--color-danger',
  // Brand
  '--color-purple-50',
  '--color-purple-100',
  '--color-purple-150',
  '--color-purple-200',
  '--color-purple-250',
  '--color-purple-300',
  '--color-purple-350',
  '--color-purple-400',
  '--color-purple-450',
  '--color-purple-500',
  '--color-purple-550',
  '--color-purple-600',
  '--color-purple-650',
  '--color-purple-700',
  // Accents
  '--color-mint-100',
  '--color-mint-500',
  '--color-mint-600',
  '--color-pink-100',
  '--color-pink-500',
  '--color-pink-600',
  '--color-yellow-100',
  '--color-yellow-500',
  '--color-yellow-600',
  '--color-blue-100',
  '--color-blue-500',
  '--color-blue-600',
  // Gray
  '--color-gray-50',
  '--color-gray-100',
  '--color-gray-200',
  '--color-gray-300',
  '--color-gray-400',
  '--color-gray-500',
  '--color-gray-600',
  '--color-gray-700',
  '--color-gray-800',
  '--color-gray-900',
];

const bgChoices = ['surface', 'canvas', 'transparent'] as const;
const gradients = [
  'none',
  'bg-grad-100',
  'bg-grad-500',
  'bg-grad-600a',
  'bg-grad-600b',
  'bg-grad-600c',
] as const;
const radii = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'] as const;
const shadows = ['none', 'xl'] as const;
const paddings = ['8', '12', '16', '20', '24', '28'] as const;
const widths = ['auto', 'sm', 'md', 'lg'] as const;

function cls(...t: Array<string | false | null | undefined>) {
  return t.filter(Boolean).join(' ');
}

type PlaygroundProps = {
  sampleText: string;
  variant: Variant;
  textColor: string;
  bgKind: (typeof bgChoices)[number];
  gradient: (typeof gradients)[number];
  radius: (typeof radii)[number];
  shadow: (typeof shadows)[number];
  padding: (typeof paddings)[number];
  width: (typeof widths)[number];

  // Chip controls
  showChip: boolean;
  chipText: string;
  chipSize: NonNullable<ChipProps['size']>;
  chipDensity: NonNullable<ChipProps['density']>;
  chipShape: NonNullable<ChipProps['shape']>;
  chipTone: NonNullable<ChipProps['tone']>;
  chipTopic: NonNullable<ChipProps['topic']>;
  chipIcon: NonNullable<ChipProps['icon']>;
  chipTypo: NonNullable<ChipProps['typo']>;
  chipTextColor: NonNullable<ChipProps['textColor']> | 'custom';
  chipCustomTextClass?: string; // 예: 'text-[var(--color-blue-600)]'
};

const Preview: React.FC<PlaygroundProps> = props => {
  const {
    sampleText,
    variant,
    textColor,
    bgKind,
    gradient,
    radius,
    shadow,
    padding,
    width,
    showChip,
    chipText,
    chipSize,
    chipDensity,
    chipShape,
    chipTone,
    chipTopic,
    chipIcon,
    chipTypo,
    chipTextColor,
    chipCustomTextClass,
  } = props;

  const radiusClass =
    radius === 'lg' ? 'rounded-lg' : radius === 'full' ? 'rounded-full' : `rounded-${radius}`;
  const shadowClass = shadow === 'xl' ? 'shadow-xl' : '';
  const widthClass =
    width === 'sm'
      ? 'max-w-[560px]'
      : width === 'md'
        ? 'max-w-[840px]'
        : width === 'lg'
          ? 'max-w-[1200px]'
          : 'max-w-none';
  const paddingPx = Number(padding);

  const bgClass =
    gradient !== 'none'
      ? gradient
      : bgKind === 'surface'
        ? 'bg-surface'
        : bgKind === 'canvas'
          ? 'bg-canvas'
          : ''; // transparent일 때 빈 문자열

  const borderStyle: React.CSSProperties =
    bgKind === 'transparent'
      ? { border: '1px dashed var(--color-gray-300)' }
      : { border: '1px solid var(--color-gray-200)' };

  // Chip class 조합 (textColor 'custom'이면 추후에 덧붙임)
  const chipBase = chip({
    size: chipSize,
    density: chipDensity,
    shape: chipShape,
    tone: chipTone,
    topic: chipTopic,
    icon: chipIcon,
    typo: chipTypo,
    textColor: chipTextColor as ChipProps['textColor'],
  });
  const chipClass =
    chipTextColor === 'custom' && chipCustomTextClass
      ? `${chipBase} ${chipCustomTextClass}`
      : chipBase;

  const Leading = chipIcon === 'leading' ? <span aria-hidden>✓</span> : null;
  const Trailing = chipIcon === 'trailing' ? <span aria-hidden>✓</span> : null;

  return (
    <div className="p-6 bg-canvas">
      <div
        className={cls('mx-auto', widthClass, bgClass, radiusClass, shadowClass)}
        style={{ padding: `${paddingPx}px`, ...borderStyle }}>
        <div className="flex items-start justify-between gap-4">
          <div className={variant} style={{ color: `var(${textColor})` }}>
            {sampleText}
          </div>

          {showChip && (
            <span className={chipClass} aria-label="chip">
              {Leading}
              <span>{chipText}</span>
              {Trailing}
            </span>
          )}
        </div>

        <div className="mt-3 caption text-[color:var(--color-subtle)]">
          variant: <code>{variant}</code> · textColor: <code>{textColor}</code> · bg:{' '}
          <code>{gradient !== 'none' ? gradient : bgKind}</code> · radius: <code>{radius}</code> ·
          shadow: <code>{shadow}</code> · padding: <code>{paddingPx}px</code>
        </div>
      </div>
    </div>
  );
};

const meta = {
  title: 'Design System/Playground',
  parameters: { layout: 'fullscreen' },
  args: {
    sampleText: '코딩 알고리즘 스터디',
    variant: 'page-title' as Variant,
    textColor: '--color-body',
    bgKind: 'surface' as const,
    gradient: 'none' as const,
    radius: 'xl' as const,
    shadow: 'xl' as const,
    padding: '24' as const,
    width: 'md' as const,

    // Chip 기본값
    showChip: true,
    chipText: '오늘 21시 마감',
    chipSize: 'sm' as NonNullable<ChipProps['size']>,
    chipDensity: 'normal' as NonNullable<ChipProps['density']>,
    chipShape: 'pill' as NonNullable<ChipProps['shape']>,
    chipTone: 'topicSoft' as NonNullable<ChipProps['tone']>,
    chipTopic: 'default' as NonNullable<ChipProps['topic']>,
    chipIcon: 'leading' as NonNullable<ChipProps['icon']>,
    chipTypo: 'tag' as NonNullable<ChipProps['typo']>,
    chipTextColor: 'auto' as NonNullable<ChipProps['textColor']> | 'custom',
    chipCustomTextClass: '',
  },
  argTypes: {
    sampleText: { control: 'text' },
    variant: { control: 'select', options: textVariants },
    textColor: { control: 'select', options: colorVars },
    bgKind: { control: 'radio', options: bgChoices },
    gradient: { control: 'select', options: gradients },
    radius: { control: 'select', options: radii },
    shadow: { control: 'radio', options: shadows },
    padding: { control: { type: 'select' }, options: paddings },
    width: { control: 'radio', options: widths },

    // Chip controls
    showChip: { control: 'boolean' },
    chipText: { control: 'text' },
    chipSize: { control: 'radio', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    chipDensity: { control: 'radio', options: ['normal', 'compact'] },
    chipShape: { control: 'radio', options: ['pill', 'rounded', 'square'] },
    chipTone: {
      control: 'select',
      options: ['soft', 'solid', 'outline', 'topicSoft', 'topicSolid'],
    },
    chipTopic: {
      control: 'select',
      options: ['default', 'growth', 'learn', 'challenge', 'connect'],
    },
    chipIcon: { control: 'radio', options: ['none', 'leading', 'trailing'] },
    chipTypo: { control: 'radio', options: ['tag', 'caption', 'captionBold', 'badge'] },
    chipTextColor: { control: 'select', options: ['auto', 'body', 'subtle', 'inverse', 'custom'] },
    chipCustomTextClass: {
      control: 'text',
      if: { arg: 'chipTextColor', eq: 'custom' },
      description: '예) text-[var(--color-blue-600)]',
    },
  },
  render: args => <Preview {...(args as PlaygroundProps)} />,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sandbox: Story = {};
