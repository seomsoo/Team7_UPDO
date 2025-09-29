import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

/** Surfaces + Shapes + Chips를 한 파일에서 모두 제공(타이틀 충돌 방지) */
const meta: Meta = {
  title: 'Design System/Tokens/Surfaces & Shapes',
};
export default meta;

type Story = StoryObj;

/* 공통 박스 (안전한 border 처리) */
const TokenBox: React.FC<{ className?: string; label: string; sub?: string }> = ({
  className = '',
  label,
  sub,
}) => (
  <div className="space-y-2">
    <div
      className={`h-24 w-full bg-[var(--surface)] border ${className}`}
      style={{ borderColor: 'var(--color-gray-200)' }}
    />
    <div className="caption text-[var(--color-secondary)]">{label}</div>
    {sub ? <div className="caption text-[var(--color-gray-600)]">{sub}</div> : null}
  </div>
);

/* 내부 패딩 시각화용 */
function SurfaceDemo({
  title,
  className,
  note,
}: {
  title: string;
  className: string;
  note?: string;
}) {
  return (
    <div
      className="bg-canvas p-4 rounded-lg border"
      style={{ borderColor: 'var(--color-gray-200)' }}>
      <div className="caption text-[var(--color-secondary)] mb-2">{title}</div>
      <div className={className}>
        <div
          className="typo-body-sm"
          style={{
            border: '1px dashed var(--color-gray-300)',
            borderRadius: 8,
            height: 96,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-gray-600)',
          }}>
          Inner content (padding 시각화)
        </div>
      </div>
      {note ? <div className="caption text-[var(--color-secondary)] mt-2">{note}</div> : null}
    </div>
  );
}

/* 1) Radii + Shadow (padded) */
export const RadiiAndShadow: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <main className="space-y-10">
      {/* RADII */}
      <section className="space-y-3">
        <h3 className="section-title">Radii</h3>
        <p className="caption text-[var(--color-subtle)]">
          <code>--radius-*</code> 토큰 기반 유틸(<code>rounded-*</code>).
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <TokenBox className="rounded-xs" label="rounded-xs" sub="--radius-xs = 6px" />
          <TokenBox className="rounded-sm" label="rounded-sm" sub="--radius-sm = 8px" />
          <TokenBox className="rounded-md" label="rounded-md" sub="--radius-md = 12px" />
          <TokenBox className="rounded-lg" label="rounded-lg" sub="--radius-lg = 16px" />
          <TokenBox className="rounded-xl" label="rounded-xl" sub="--radius-xl = 24px" />
          <TokenBox className="rounded-2xl" label="rounded-2xl" sub="--radius-2xl = 32px" />
          <TokenBox className="rounded-3xl" label="rounded-3xl" sub="--radius-3xl = 40px" />
          <div className="space-y-2">
            <div
              className="h-24 w-24 bg-[var(--surface)] border rounded-full"
              style={{ borderColor: 'var(--color-gray-200)' }}
            />
            <div className="caption text-[var(--color-secondary)]">rounded-full</div>
            <div className="caption text-[var(--color-gray-600)]">9999px</div>
          </div>
        </div>
      </section>

      {/* SHADOW */}
      <section className="space-y-3">
        <h3 className="section-title">Shadow</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div
              className="h-24 w-full bg-[var(--surface)] border rounded-lg shadow-xl"
              style={{ borderColor: 'var(--color-gray-200)' }}
            />
            <div className="caption text-[var(--color-secondary)]">shadow-xl</div>
            <p className="caption text-[var(--color-subtle)]">
              <code>--shadow-xl</code> 토큰 기반 유틸(<code>shadow-xl</code>).
            </p>
            <div className="caption text-[var(--color-gray-600)]">0 0 50px 0 rgb(0 0 0 / 0.08)</div>
          </div>
        </div>
      </section>
    </main>
  ),
};

/* 2) Layout Presets + Chip helpers (fullscreen) */
export const LayoutPresetsAndChips: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <main className="bg-canvas min-h-screen p-6 space-y-10">
      {/* Layout wrappers */}
      <section className="space-y-3">
        <h2 className="h4Semibold">Layout wrappers</h2>
        <p className="caption text-[var(--color-secondary)]">
          <code>layout-container</code>: 좌우 패딩(반응형), <code>layout-content</code>:{' '}
          <code>max-width: 1280px</code> 중앙정렬.
        </p>
        <div className="layout-container">
          <div
            className="layout-content rounded-lg border p-3"
            style={{ borderColor: 'var(--color-gray-200)' }}>
            <div
              className="typo-body-sm"
              style={{
                border: '1px dashed var(--color-gray-300)',
                height: 72,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-gray-600)',
              }}>
              layout-content (max-width 1280px / auto center)
            </div>
          </div>
        </div>
      </section>

      {/* Surface presets */}
      <section className="space-y-3">
        <h2 className="h4Semibold">Surface presets</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <SurfaceDemo
            title="surface-card"
            className="surface-card"
            note="shadow-xl, rounded-xl, border + padding(16/24/28)"
          />
          <SurfaceDemo
            title="surface-section"
            className="surface-section"
            note="rounded-lg, border + padding(16/20)"
          />
          <SurfaceDemo
            title="surface-modal"
            className="surface-modal"
            note="rounded-3xl, shadow-xl + padding(24)"
          />
        </div>
      </section>

      {/* Caption chips (rounded/full) */}
      <section className="space-y-3">
        <h2 className="h4Semibold">Caption chips (radius helpers)</h2>
        <div className="flex flex-wrap gap-8">
          <div>
            <div className="caption text-[var(--color-secondary)] mb-2">chip-rounded (24px)</div>
            <span
              className="caption bg-white px-3 py-1 chip-rounded border"
              style={{ color: 'var(--color-gray-600)', borderColor: 'var(--color-gray-300)' }}>
              오늘 21시 마감
            </span>
          </div>
          <div>
            <div className="caption text-[var(--color-secondary)] mb-2">chip-full (pill)</div>
            <span
              className="caption bg-white px-3 py-1 chip-full border"
              style={{ color: 'var(--color-gray-600)', borderColor: 'var(--color-gray-300)' }}>
              오늘 21시 마감
            </span>
          </div>
          <div>
            <div className="caption text-[var(--color-secondary)] mb-2">chip-full (pill)</div>
            <span
              className="caption bg-white px-3 py-1 chip-full border"
              style={{ color: 'var(--color-gray-600)', borderColor: 'var(--color-gray-300)' }}>
              오늘 21시 마감
            </span>
          </div>
        </div>
      </section>
    </main>
  ),
};
