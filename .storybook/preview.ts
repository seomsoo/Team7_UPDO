import '../src/app/globals.css';
import type { Preview } from '@storybook/nextjs-vite';

function ensurePretendardLoaded() {
  if (typeof document === 'undefined') return;

  // 1) Pretendard Variable <link> 세팅 (중복 방지)
  const LINK_ID = 'sb-pretendard-var';
  if (!document.getElementById(LINK_ID)) {
    const link = document.createElement('link');
    link.id = LINK_ID;
    link.rel = 'stylesheet';
    link.href =
      'https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable.css';
    document.head.appendChild(link);
  }

  // 2) 전역 CSS 변수 & 기본 font-family 세팅 (중복 방지)
  const STYLE_ID = 'sb-font-vars';
  if (!document.getElementById(STYLE_ID)) {
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      :root {
        --font-sans: 'Pretendard Variable', Pretendard, system-ui, -apple-system, 'Segoe UI', Roboto,
                     'Noto Sans KR', 'Apple SD Gothic Neo', 'Malgun Gothic', 'Helvetica Neue', Arial,
                     'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
        --default-font-family: var(--font-sans);
      }
      html, body { font-family: var(--font-sans); }
    `;
    document.head.appendChild(style);
  }
}

export const decorators: Preview['decorators'] = [
  Story => {
    ensurePretendardLoaded();
    return Story();
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
