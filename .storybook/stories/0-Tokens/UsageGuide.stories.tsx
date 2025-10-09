import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Badge from '../../../src/components/ui/Badge';
import { button, topicBgSoft, topicText, typo } from '../../../src/styles/variants';
import type { VariantProps } from 'class-variance-authority';

const meta: Meta = {
  title: 'Design System/UsageGuide',
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj;

/** Topic 유니온 타입 추출 */
type Topic = NonNullable<VariantProps<typeof topicText>['topic']>;

const Spec: React.FC<{ items: string[] }> = ({ items }) => (
  <div className="caption mt-2 text-[color:var(--color-subtle)]">{items.join(' · ')}</div>
);

export const Examples: Story = {
  render: () => (
    <main className="space-y-12">
      {/* PAGE HEADER */}
      <section className="space-y-1">
        <h1 className={typo({ variant: 'h3Semibold' })}>모든 리뷰</h1>
        <p className={typo({ variant: 'caption', color: 'subtle' })}>
          페이지 타이틀은 h3Semibold(32/36)를 사용
        </p>
        <Spec items={['typo: h3Semibold(32/36)', 'meta: caption/subtle']} />
      </section>

      {/* SECTION TITLE */}
      <section className="space-y-1">
        <h2 className={typo({ variant: 'pageTitle' })}>리뷰 모아보기</h2>
        <p className={typo({ variant: 'caption', color: 'subtle' })}>
          섹션 타이틀은 page-title(24/32 · 600)
        </p>
        <Spec items={['typo: page-title(24/32·600)', 'meta: caption/subtle']} />
      </section>

      {/* CARD SAMPLE */}
      <section className="grid gap-6 md:grid-cols-2">
        {(['growth', 'connect'] as Topic[]).map(topic => (
          <article
            key={topic}
            className="bg-surface space-y-3 rounded-xl border border-[color:var(--color-gray-200)] p-6 shadow-xl">
            <header className="flex items-center gap-2">
              <span className="tag chip-rounded px-2.5 py-1">
                <span className={topicText({ topic })}>
                  # {topic === 'growth' ? '성장' : '연결'}
                </span>
              </span>
              <span className="caption chip-full border border-[color:var(--color-gray-300)] bg-white px-2.5 py-1 text-[color:var(--color-gray-600)]">
                1월 7일
              </span>
              <span className="caption chip-full border border-[color:var(--color-gray-300)] bg-white px-2.5 py-1 text-[color:var(--color-gray-600)]">
                17:30
              </span>
              <span
                className={`caption chip-rounded px-2.5 py-1 text-white ${topicBgSoft({
                  topic,
                })} ${topicText({ topic })}`}>
                오늘 21시 마감
              </span>
            </header>

            <h3 className={typo({ variant: 'cardTitle' })}>모임 제목 예시</h3>

            <p className={typo({ variant: 'body' })}>
              카드 본문 예시 텍스트. 날짜/장소 등 작은 정보는 caption 스타일을 사용한다.
            </p>

            <footer className="flex items-center justify-end gap-2">
              <button
                className={
                  button({ variant: 'outline', size: 'md', typo: 'tag', radius: 'md' }) +
                  ' font-bold'
                }>
                공유하기
              </button>
              <button
                className={
                  button({ variant: 'primary', size: 'md', typo: 'cta', radius: 'md' }) +
                  ' font-bold'
                }>
                참여하기
              </button>
            </footer>

            <Spec
              items={[
                'title: typo/card-title(18/28)',
                'body: typo/typo-body(16/24)',
                'chips: caption + chip-rounded/full',
                `status chip: topicBgSoft(${topic}) + topicText(${topic})`,
                'buttons: button/outline + button/primary · size:md · radius:md · weight:bold',
              ]}
            />
          </article>
        ))}
      </section>

      {/* 숫자 배지 */}
      <section className="space-y-2">
        <h3 className="section-title">Badge</h3>
        <div className="flex items-center gap-6">
          <Badge size="sm" value={1} />
          <Badge size="sm" value={27} />
          <Badge size="sm" value={120} /> {/* 99+ 확인 */}
          <Badge size="lg" value={1} />
          <Badge size="lg" value={27} />
          <Badge size="lg" value={120} /> {/* 99+ 확인 */}
          {/* <Badge size="sm" value={0} />  // 0이면 렌더되지 않음 */}
        </div>
        <Spec items={['0이면 비노출', '기본 max=99 → 100 이상은 99+']} />
      </section>

      {/* METRICS */}
      <section className="space-y-1">
        <div className="rounded-xl bg-[color:var(--color-purple-100)]/35 p-6">
          <div className={typo({ variant: 'metric40' })}>4.0</div>
          <p className={typo({ variant: 'caption', color: 'subtle' })}>
            리뷰 점수 숫자 전용 — metric-40(40/36 · 700)
          </p>
          <Spec items={['metric: typo/metric-40(40/36·700)', 'meta: caption/subtle']} />
        </div>
      </section>

      {/* FORM LABELS */}
      <section className="grid gap-6 md:grid-cols-2">
        {/* 필터/라디오 영역 */}
        <div className="space-y-2">
          <div className={typo({ variant: 'fieldLabel' })}>선택 서비스</div>
          <div className="flex gap-2">
            <span className="tag chip-full px-3 py-1">
              <span className={topicText({ topic: 'default' })}>이용 예정</span>
            </span>
            <span className="tag chip-full border border-[color:var(--color-gray-300)] bg-white px-3 py-1 text-[color:var(--color-gray-600)]">
              개설대기
            </span>
            <span className="caption chip-rounded bg-[color:var(--color-gray-100)] px-2.5 py-1 text-[color:var(--color-gray-700)]">
              이용 완료
            </span>
          </div>
          <Spec
            items={[
              'label: typo/fieldLabel(14/20·600)',
              'chips: tag(14/20) + chip-full/rounded',
              'grays/purple tokens 사용',
            ]}
          />
        </div>

        {/* 날짜 필드 + helper */}
        <div className="space-y-2">
          <label className={typo({ variant: 'fieldLabel' })} htmlFor="meet-dt">
            모임 날짜
          </label>
          <input
            id="meet-dt"
            className="h-11 w-full rounded-lg border border-[color:var(--color-gray-300)] bg-white px-4 text-[var(--color-gray-700)]"
            defaultValue="2024-11-14 12:00 PM"
            aria-describedby="meet-dt-help"
          />
          <p id="meet-dt-help" className="caption text-[color:var(--color-subtle)]">
            예: 2024-11-14 12:00 PM
          </p>
          <Spec
            items={[
              'field: input/base + rounded-lg',
              'helper: caption/subtle',
              'a11y: aria-describedby',
            ]}
          />
        </div>
      </section>

      {/* DENSE LIST */}
      <section className="space-y-2">
        <h3 className="section-title">밀집 리스트(본문+캡션)</h3>
        <ul className="space-y-3">
          {[1, 2, 3].map(i => (
            <li
              key={i}
              className="bg-surface rounded-lg border border-[color:var(--color-gray-200)] p-4">
              <div className="typo-body">리스트 아이템 {i}</div>
              <div className="caption text-[color:var(--color-subtle)]">메타 정보 · 2025.09.26</div>
            </li>
          ))}
        </ul>
        <Spec items={['item: typo-body', 'meta: caption/subtle', 'card: rounded-lg + gray-200']} />
      </section>

      {/* FOOTER NOTE */}
      <section className="space-y-1">
        <h4 className="h5Semibold">용례 요약</h4>
        <ul className="caption list-disc space-y-1 pl-4 text-[color:var(--color-subtle)]">
          <li>페이지 타이틀: h3Semibold(32/36) 통일</li>
          <li>카드 제목: card-title(18/28)</li>
          <li>날짜/장소/상태: caption(12/16) + chip-rounded/full</li>
          <li>리뷰 점수: metric-40 전용</li>
        </ul>
      </section>
    </main>
  ),
};
