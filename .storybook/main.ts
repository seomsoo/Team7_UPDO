import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../.storybook/**/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
  ],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },
  staticDirs: [{ from: '../public/fonts', to: '/fonts' }],
  viteFinal: async cfg => {
    cfg.define = {
      ...cfg.define,
      'process.env.NEXT_PUBLIC_API_BASE_URL': JSON.stringify(
        process.env.NEXT_PUBLIC_API_BASE_URL || 'https://stub.example.com',
      ),
      'process.env.NEXT_PUBLIC_TEAM_ID': JSON.stringify(process.env.NEXT_PUBLIC_TEAM_ID || 'UPDO'),
      'import.meta.env.NEXT_PUBLIC_API_BASE_URL': JSON.stringify(
        process.env.NEXT_PUBLIC_API_BASE_URL || 'https://stub.example.com',
      ),
      'import.meta.env.NEXT_PUBLIC_TEAM_ID': JSON.stringify(
        process.env.NEXT_PUBLIC_TEAM_ID || 'UPDO',
      ),
    };

    // ✅ client-only 모듈을 외부화하여 번들에서 제외
    cfg.build = {
      ...cfg.build,
      rollupOptions: {
        ...(cfg.build?.rollupOptions || {}),
        external: ['client-only'],
      },
    };

    // ✅ client-only alias 추가 (Chromatic용)
    cfg.resolve = {
      ...(cfg.resolve || {}),
      alias: {
        ...(cfg.resolve?.alias || {}),
        'client-only': '/__mocks__/client-only.ts', // 가짜 모듈로 치환
      },
    };

    // ✅ use client 경고 줄이기
    cfg.esbuild = {
      ...cfg.esbuild,
      legalComments: 'none',
      banner: '',
    };

    return cfg;
  },
};

export default config;
