import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { button, topicBgSoft, topicBgSolid, topicText, typo } from '../../../src/styles/variants';
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
  <div className="mt-2 caption text-[color:var(--color-subtle)]">{items.join(' · ')}</div>
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
      <section className="grid md:grid-cols-2 gap-6">
        {(['growth', 'connect'] as Topic[]).map(topic => (
          <article
            key={topic}
            className="bg-surface rounded-xl p-6 space-y-3 shadow-xl border border-[color:var(--color-gray-200)]">
            <header className="flex items-center gap-2">
              <span className="tag chip-rounded px-2.5 py-1">
                <span className={topicText({ topic })}>
                  # {topic === 'growth' ? '성장' : '연결'}
                </span>
              </span>
              <span className="caption chip-full px-2.5 py-1 border border-[color:var(--color-gray-300)] text-[color:var(--color-gray-600)] bg-white">
                1월 7일
              </span>
              <span className="caption chip-full px-2.5 py-1 border border-[color:var(--color-gray-300)] text-[color:var(--color-gray-600)] bg-white">
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

      {/* METRICS */}
      <section className="space-y-1">
        <div className="rounded-xl p-6 bg-[color:var(--color-purple-100)]/35">
          <div className={typo({ variant: 'metric40' })}>4.0</div>
          <p className={typo({ variant: 'caption', color: 'subtle' })}>
            리뷰 점수 숫자 전용 — metric-40(40/36 · 700)
          </p>
          <Spec items={['metric: typo/metric-40(40/36·700)', 'meta: caption/subtle']} />
        </div>
      </section>

      {/* FORM LABELS */}
      <section className="grid md:grid-cols-2 gap-6">
        {/* 필터/라디오 영역 */}
        <div className="space-y-2">
          <div className={typo({ variant: 'fieldLabel' })}>선택 서비스</div>
          <div className="flex gap-2">
            <span className="tag chip-full px-3 py-1 text-[color:var(--color-purple-500)] bg-[color:var(--color-purple-100)]/50">
              이용 예정
            </span>
            <span className="tag chip-full px-3 py-1 border border-[color:var(--color-gray-300)] text-[color:var(--color-gray-600)] bg-white">
              개설대기
            </span>
            <span className="tag chip-rounded px-2.5 py-1 bg-[color:var(--color-gray-100)] text-[color:var(--color-gray-600)]">
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
            className="w-full h-11 px-4 rounded-lg bg-white text-[var(--color-gray-700)] border border-[color:var(--color-gray-300)]"
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

      {/* ONBOARDING / HERO */}
      <section className="space-y-2">
        <h2 className={typo({ variant: 'h1Semibold' })}>온보딩 히어로 문구</h2>
        <p className="typo-body-lg text-[color:var(--color-subtle)] max-w-3xl">
          서비스의 핵심 가치를 한 문장으로 전달합니다. 부제/설명은 18/28 가독성 본문을 사용합니다.
        </p>
        <Spec items={['hero: typo/h1Semibold', 'sub: typo/typo-body-lg + subtle']} />
      </section>

      {/* PAGE HEADER PATTERN */}
      <section className="space-y-1">
        <h2 className={typo({ variant: 'h3Semibold' })}>페이지 타이틀 패턴</h2>
        <p className="caption text-[color:var(--color-subtle)]">
          모든 페이지 상단 타이틀은 h3Semibold(32/36)로 통일
        </p>
        <Spec items={['page title: typo/h3Semibold', 'meta: caption/subtle']} />
      </section>

      {/* CARD: List with Meta */}
      <section className="grid md:grid-cols-2 gap-6">
        {[
          { topic: 'growth', title: '코딩 알고리즘 스터디' },
          { topic: 'connect', title: '개발자 네트워킹 모임 밤' },
        ].map((c, i) => (
          <article
            key={i}
            className="rounded-xl shadow-xl border border-[color:var(--color-gray-200)] p-6 flex items-start gap-6 bg-surface">
            <div className="w-[160px] h-[120px] rounded-lg bg-[color:var(--color-gray-100)]" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={`tag chip-rounded px-2.5 py-1 ${topicText({
                    topic: c.topic as Topic,
                  })}`}>
                  #{c.topic === 'growth' ? '성장' : '연결'}
                </span>
                <span className="caption chip-full px-3 py-1 border border-[color:var(--color-gray-300)] text-[color:var(--color-gray-600)] bg-white">
                  1월 7일
                </span>
                <span className="caption chip-full px-3 py-1 border border-[color:var(--color-gray-300)] text-[color:var(--color-gray-600)] bg-white">
                  17:30
                </span>
                <span
                  className={`caption chip-rounded px-2.5 py-1 text-white ${topicBgSolid({
                    topic: c.topic as Topic,
                  })}`}>
                  오늘 21시 마감
                </span>
              </div>

              <h3 className={typo({ variant: 'cardTitle' }) + ' mt-3'}>{c.title}</h3>

              <p className="typo-body mt-2 text-[color:var(--color-body)]">
                모임에 대한 간단한 소개 문장이 들어갑니다. 위치/시간 등은 아래 캡션으로 보조
                표기합니다.
              </p>

              <div className="mt-3 flex items-center gap-2">
                <span className="caption text-[color:var(--color-subtle)]">서울 · 강남구</span>
                <span className="caption text-[color:var(--color-subtle)]">4/20</span>
              </div>

              <div className="mt-5 flex items-center justify-end gap-2">
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
              </div>

              <Spec
                items={[
                  'topic tag: tag + topicText',
                  'meta: caption + chip-full',
                  'status: caption + topicBgSolid',
                  'title: card-title',
                  'buttons: outline/primary · size:md · radius:md · bold',
                ]}
              />
            </div>
          </article>
        ))}
      </section>

      {/* META CHIPS (Rounded vs Full) */}
      <section className="space-y-2">
        <h3 className="section-title">메타 칩 모서리 패턴</h3>
        <div className="flex flex-wrap items-center gap-3">
          <span className="caption chip-rounded px-2.5 py-1 border border-[color:var(--color-gray-300)] text-[color:var(--color-gray-600)] bg-white">
            오늘 21시 마감 (rounded)
          </span>
          <span className="caption chip-full px-3 py-1 border border-[color:var(--color-gray-300)] text-[color:var(--color-gray-600)] bg-white">
            오늘 21시 마감 (full)
          </span>
        </div>
        <Spec items={['chips: caption + chip-rounded/full', 'border: gray-300', 'bg: white']} />
      </section>

      {/* FORM / ERROR / HELP 데모 */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="label" htmlFor="email">
            이메일
          </label>
          <input
            id="email"
            className="w-full h-11 px-4 rounded-sm bg-white text-[color:var(--color-gray-700)] border border-[color:var(--color-gray-300)]"
            placeholder="you@example.com"
            aria-describedby="email-help"
          />
          <p id="email-help" className="caption text-[color:var(--color-subtle)]">
            로그인에 사용할 이메일
          </p>
          <Spec
            items={[
              'label: .label(14/20·600)',
              'helper: caption/subtle',
              'field: rounded-sm + gray-300',
              'a11y: aria-describedby',
            ]}
          />
        </div>
        <div className="space-y-2">
          <label className="label" htmlFor="pw">
            비밀번호
          </label>
          <input
            id="pw"
            className="w-full h-11 px-4 rounded-sm bg-white text-[color:var(--color-gray-700)] border border-[color:var(--color-red-500)]"
            placeholder="••••••••"
            aria-invalid={true}
            aria-describedby="pw-err"
          />
          <p id="pw-err" className="caption text-[color:var(--color-red-500)]">
            8자 이상 입력하세요
          </p>
          <Spec
            items={[
              'error: border red-500',
              'error text: caption/red-500',
              'a11y: aria-invalid + aria-describedby',
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
              className="bg-surface rounded-lg p-4 border border-[color:var(--color-gray-200)]">
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
        <ul className="caption text-[color:var(--color-subtle)] list-disc pl-4 space-y-1">
          <li>페이지 타이틀: h3Semibold(32/36) 통일</li>
          <li>카드 제목: card-title(18/28)</li>
          <li>날짜/장소/상태: caption(12/16) + chip-rounded/full</li>
          <li>리뷰 점수: metric-40 전용</li>
        </ul>
      </section>
    </main>
  ),
};
