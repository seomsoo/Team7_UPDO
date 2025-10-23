// ✅ [1] Chromatic/Storybook 빌드 시 "client-only" 모듈을 가짜로 등록
try {
  // 이미 Node require 캐시에 등록되어 있지 않다면 빈 모듈로 대체
  require.resolve('client-only');
} catch {
  const mockModule = {
    id: 'client-only',
    filename: 'client-only',
    loaded: true,
    exports: {},
  } as unknown as NodeJS.Module; // ✅ 타입 강제 캐스팅으로 TS 오류 제거

  require.cache['client-only'] = mockModule;
}

// ✅ [2] 기존 Storybook 설정들
import '../src/app/globals.css';
import type { Preview } from '@storybook/nextjs-vite';
import { Pretendard } from '../src/lib/font';

function ensureFont() {
  if (typeof document === 'undefined') return;

  // @font-face 주입 (중복 방지)
  const STYLE_ID = 'sb-pretendard-fontface';
  if (!document.getElementById(STYLE_ID)) {
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
@font-face {
  font-family: 'Pretendard Variable';
  src: url('/fonts/PretendardVariable.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
:root {
  --font-sans: 'Pretendard Variable', Pretendard, system-ui, -apple-system, 'Segoe UI', Roboto,
               'Noto Sans KR','Apple SD Gothic Neo','Malgun Gothic','Helvetica Neue', Arial,
               'Segoe UI Emoji','Segoe UI Symbol', sans-serif;
  --default-font-family: var(--font-sans);
}
html, body { font-family: var(--font-sans); }
    `.trim();
    document.head.appendChild(style);
  }
}

export const decorators: Preview['decorators'] = [
  Story => {
    ensureFont();
    return <Story />;
  },
];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
};

export default preview;
