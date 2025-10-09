import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Badge from '../../../src/components/ui/Badge';
import type { BadgeProps } from '../../../src/components/ui/Badge';

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
  '--color-body',
  '--color-subtle',
  '--color-secondary',
  '--color-danger',
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

  showBadge: boolean;
  badgeValue: number;
  badgeSize: NonNullable<BadgeProps['size']>;
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

    showBadge,
    badgeValue,
    badgeSize,
  } = props;

  const radiusClass =
    radius === 'lg' ? 'rounded-lg' : radius === 'full' ? 'rounded-full' : `rounded-${radius}`;
  const shadowClass = shadow === 'xl' ? 'shadow-xl' : '';
  const widthClass =
    width === 'sm'
      ? 'max-w[560px]'
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
          : '';

  const borderStyle: React.CSSProperties =
    bgKind === 'transparent'
      ? { border: '1px dashed var(--color-gray-300)' }
      : { border: '1px solid var(--color-gray-200)' };

  return (
    <div className="bg-canvas p-6">
      <div
        className={cls('mx-auto', widthClass, bgClass, radiusClass, shadowClass)}
        style={{ padding: `${paddingPx}px`, ...borderStyle }}>
        <div className="flex items-start justify-between gap-4">
          <div className={variant} style={{ color: `var(${textColor})` }}>
            {sampleText}
          </div>

          {showBadge && <Badge size={badgeSize} value={badgeValue} />}
        </div>

        <div className="caption mt-3 text-[color:var(--color-subtle)]">
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

    showBadge: true,
    badgeValue: 7, // 100 이상으로 올리면 "99+"
    badgeSize: 'sm' as NonNullable<BadgeProps['size']>,
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

    // Badge controls
    showBadge: { control: 'boolean' },
    badgeValue: { control: { type: 'number', min: 0 } },
    badgeSize: { control: 'radio', options: ['sm', 'lg'] },
  },
  render: args => <Preview {...(args as PlaygroundProps)} />,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sandbox: Story = {};
