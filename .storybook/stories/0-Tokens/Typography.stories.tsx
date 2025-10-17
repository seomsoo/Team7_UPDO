import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { typo } from '../../../src/styles/variants';

const meta: Meta = {
  title: 'Design System/Tokens/Typography',
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj;

const Section: React.FC<{ title: string; desc?: string; children: React.ReactNode }> = ({
  title,
  desc,
  children,
}) => (
  <section className="space-y-3">
    <h3 className="section-title">{title}</h3>
    {desc ? <p className="caption text-[var(--color-subtle)]">{desc}</p> : null}
    {children}
  </section>
);

export const All: Story = {
  render: () => (
    <main className="space-y-12">
      {/* SCALE */}
      <Section
        title="Type Scale"
        desc="디자인 기준 px/line-height. 참고용 스케일 — 실제 사용은 아래 시맨틱 클래스 사용">
        <div className="bg-surface space-y-2 rounded-lg border border-[color:var(--color-gray-200)] p-5">
          <div className="typo-5xl">typo-5xl — 56/64</div>
          <div className="typo-4xl">typo-4xl — 40/40</div>
          <div className="typo-3xl">typo-3xl — 32/36</div>
          <div className="typo-2xl">typo-2xl — 24/32</div>
          <div className="typo-xl">typo-xl — 20/28</div>
          <div className="typo-lg">typo-lg — 18/28</div>
          <div className="typo-base">typo-base — 16/24</div>
          <div className="typo-sm">typo-sm — 14/20</div>
          <div className="typo-xs">typo-xs — 12/16</div>
        </div>
      </Section>

      {/* HEADINGS */}
      <Section title="Headings (h1~h5)" desc="페이지 타이틀은 h3Semibold(32/36) 권장">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-surface space-y-2 rounded-lg border border-[color:var(--color-gray-200)] p-5">
            <div className={typo({ variant: 'h1' })}>h1 (56/64 · 400)</div>
            <div className={typo({ variant: 'h1Semibold' })}>h1Semibold (56/64 · 600)</div>
            <div className={typo({ variant: 'h1Bold' })}>h1Bold (56/64 · 700)</div>
            <hr className="my-2 border-[color:var(--color-gray-200)]" />
            <div className={typo({ variant: 'h2' })}>h2 (40/44 · 400)</div>
            <div className={typo({ variant: 'h2Semibold' })}>h2Semibold (40/44 · 600)</div>
            <div className={typo({ variant: 'h2Bold' })}>h2Bold (40/44 · 700)</div>
          </div>
          <div className="bg-surface space-y-2 rounded-lg border border-[color:var(--color-gray-200)] p-5">
            <div className={typo({ variant: 'h3' })}>h3 (32/36 · 400)</div>
            <div className={typo({ variant: 'h3Semibold' })}>h3Semibold (32/36 · 600)</div>
            <div className={typo({ variant: 'h3Bold' })}>h3Bold (32/36 · 700)</div>
            <hr className="my-2 border-[color:var(--color-gray-200)]" />
            <div className="h4">h4 (24/32 · 400)</div>
            <div className="h4Semibold">h4Semibold (24/32 · 600)</div>
            <div className="h4Bold">h4Bold (24/32 · 700)</div>
            <hr className="my-2 border-[color:var(--color-gray-200)]" />
            <div className="h5">h5 (20/28 · 400)</div>
            <div className="h5Semibold">h5Semibold (20/28 · 600)</div>
            <div className="h5Bold">h5Bold (20/28 · 700)</div>
          </div>
        </div>
      </Section>

      {/* TITLES */}
      <Section title="Titles (중간 계층)" desc="페이지/섹션/카드/모달">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-surface space-y-2 rounded-lg border border-[color:var(--color-gray-200)] p-5">
            <div className="page-title">page-title — 24/32 · 600</div>
            <div className="modal-title">modal-title — 24/32 · 600</div>
          </div>
          <div className="bg-surface space-y-2 rounded-lg border border-[color:var(--color-gray-200)] p-5">
            <div className="section-title">section-title — 20/28 · 600</div>
            <div className="card-title">card-title — 18/28 · 600</div>
          </div>
        </div>
      </Section>

      {/* BODY / META */}
      <Section title="Body / Meta" desc="본문/보조문/라벨/캡션">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-surface space-y-2 rounded-lg border border-[color:var(--color-gray-200)] p-5">
            <p className="typo-body">typo-body — 16/24 · 500</p>
            <p className="typo-body-bold">typo-body-bold — 16/24 · 600</p>
            <p className="typo-body-lg">typo-body-lg — 18/28 · 400</p>
            <p className="typo-body-sm">typo-body-sm — 14/20 · 500</p>
          </div>
          <div className="bg-surface space-y-2 rounded-lg border border-[color:var(--color-gray-200)] p-5">
            <div className="eyebrow">eyebrow — 14/20 · 600</div>
            <div className="label">label — 14/20 · 600</div>
            <div className="label-sm">label-sm — 12/16 · 600</div>
            <div className="caption">caption — 12/16 · 400</div>
            <div className="caption-bold">caption-bold — 12/16 · 600</div>
          </div>
        </div>
      </Section>

      {/* SPECIAL */}
      <Section title="Special" desc="태그/배지/지표">
        <div className="bg-surface space-y-2 rounded-lg border border-[color:var(--color-gray-200)] p-5">
          <div className="tag text-[var(--color-body)]">tag — 14/20 · 500</div>

          {/* badge 라인 표기 (숫자 샘플 X) */}
          <div className="badge-xs text-[var(--color-body)]">badge-xs — 10/11 · 600</div>
          <div className="badge-lg text-[var(--color-body)]">badge-lg — 12/16 · 700</div>
          <div className="metric-40 text-[var(--color-body)]">metric-40 — 40/36 · 700</div>
        </div>
      </Section>
    </main>
  ),
};
