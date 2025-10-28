import '../src/app/globals.css';
import type { Preview } from '@storybook/nextjs-vite';
import type { Decorator } from '@storybook/react';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as NextNavigation from 'next/navigation';

try {
  if (!('useRouter' in NextNavigation)) {
    Object.defineProperty(NextNavigation, 'useRouter', {
      value: () => ({
        push: () => {},
        replace: () => {},
        prefetch: async () => {},
        back: () => {},
      }),
      configurable: true,
    });
  }
  if (!('usePathname' in NextNavigation)) {
    Object.defineProperty(NextNavigation, 'usePathname', {
      value: () => '/',
      configurable: true,
    });
  }
} catch {}

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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 0,
    },
    mutations: { retry: false },
  },
});

const withQueryClient: Decorator = Story => (
  <QueryClientProvider client={queryClient}>
    <Story />
  </QueryClientProvider>
);

export const decorators: Preview['decorators'] = [
  withQueryClient,
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
