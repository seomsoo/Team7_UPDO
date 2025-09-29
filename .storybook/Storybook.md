---
title: Storybook
tags: ✅ Test
link: https://storybook.js.org
date: 2025.09.26
writer: 김채원
---

## 1. Stories (스토리 정의 방법)

### 1-1. Custom render function

**render 함수를 직접 정의**하여 렌더링 제어하는 방법

- **기본 구조**
  render 속성 : args만 넣어서 렌더링하는 것이 아니라, 원하는 HTML 구조 안에 컴포넌트를 배치할 수 있음

  ```tsx
  // This story uses a render function to fully control how the component renders.
  export const Example: Story = {
    render: () => (
      <div style={{ maxWidth: '300px' }}>
        <MyComponent prop1="Something" prop2={false} />
      </div>
    ),
  };
  ```

- **render 기본 구조** : render를 사용한 맞춤형 UI

  > @/components/ui/stories/Avatar.stories.tsx

  ```tsx
  import type { Meta, StoryObj } from '@storybook/nextjs-vite';
  import Avatar from '../Avatar';

  const meta = {
    title: 'components/ui/Avatar',
    component: Avatar,
    parameters: { layout: 'centered' },
  } satisfies Meta<typeof Avatar>;

  export default meta;

  type Story = StoryObj<typeof meta>;

  export const Example: Story = {
    render: () => (
      <table style={{ borderCollapse: 'collapse' }}>
        <tbody>
          <tr>
            <td style={{ padding: '8px' }}>
              <Avatar size="md">MD</Avatar>
            </td>
            <td style={{ padding: '8px' }}>
              <Avatar size="lg">LG</Avatar>
            </td>
          </tr>
        </tbody>
      </table>
    ),
  };
  ```

- **render 심화 구조** : arguments를 받는 render 사용한 맞춤형 UI

  ```tsx
  import type { Meta, StoryObj } from '@storybook/nextjs-vite';
  import TextField from '../TextField'; // 실제 컴포넌트 경로에 맞게 수정
  const meta = {
    title: 'samples/TextField',
    component: TextField,
    parameters: { layout: 'centered' }, // centered: 가운데 정렬, fullscreen: 캔버스 꽉 채우기(페이지 단위 컴포넌트용), padded: 기본값, 약간의 padding
    argTypes: {
      placeholder: { control: 'text' },
      type: {
        control: { type: 'radio' },
        options: ['text', 'password', 'email'],
      },
      disabled: { control: 'boolean' },
    },
  } satisfies Meta<typeof TextField>;

  export default meta;

  type Story = StoryObj<typeof meta>;

  export const Example: Story = {
    render: args => <TextField {...args} />,
    args: {
      placeholder: 'Type here...',
      type: 'text',
      disabled: false,
    },
  };
  ```

### 1-2. CSF3 기반 기본 스토리 예시

```tsx
// MyComponent.story.ts|tsx

import type { Meta, StoryObj } from '@storybook/react';

import { MyComponent } from './MyComponent';

const meta: Meta<typeof MyComponent> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Path/To/MyComponent',
  component: MyComponent,
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const Basic: Story = {
  args: {
    prop1: 'Something',
    prop2: true,
  },
};

// https://storybook.js.org/docs/react/api/csf#spreadable-story-objects
export const BasicOnDark: Story = {
  ...Basic,
  parameters: { background: { default: 'dark' } },
};
```

## 2. Config (설정 파일 설명)

main.js, preview.js 설정 예시
(addons, parameters, decorators, custom sort 등)

[Declarative Storybook configuration](https://medium.com/storybookjs/declarative-storybook-configuration-49912f77b78)

### 2-1. main.js

• stories glob 패턴 지정 (src/**/\*.stories.tsx, docs/**/\*.mdx)
• addons 등록 (links, essentials, a11y, custom paddings 등)
• TypeScript 옵션 (reactDocgen: 'none')

```js
// main.js
const path = require('path');
const SRC_PATH = path.join(__dirname, '../src');

module.exports = {
  stories: [
    '../docs/**/*.stories.mdx',
    '../src/**/*.stories.mdx',
    '../**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-paddings',
    'storybook-addon-color-mode',
    '@storybook/addon-a11y',
  ],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'none',
  },
};
```

### 2-2. preview.js

• parameters: 레이아웃(fullscreen), actions, backgrounds, viewport, paddings, color mode
• options: storySort → 사이드바 정렬 순서 커스텀
• decorators: withPaddings, ThemeProvider로 스토리 감싸기

- 심화 코드 예시

  ```js
  // preview.js
  import React from 'react';
  import { withPaddings } from 'storybook-addon-paddings';
  import { ThemeProvider } from 'theme-ui';
  import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
  import theme from '../src/theme/index.js';

  export const parameters = {
    layout: 'fullscreen',
    actions: { argTypesRegex: '^on[A-Z].*' },
    // Set some different background colours
    backgrounds: {
      default: 'white',
      values: [
        { name: 'white', value: '#fff' },
        { name: 'peach', value: 'hsla(36, 100%, 92%, 1)' },
        { name: 'pink', value: 'hsla(0, 69%, 91%, 1)' },
        { name: 'green', value: 'hsla(114, 70%, 93%, 1)' },
        { name: 'light blue', value: 'hsla(199, 100%, 93%, 1)' },
        { name: 'blue', value: 'hsl(240, 100%, 22%)' },
        { name: 'dark', value: 'hsl(109, 0%, 16%)' },
      ],
    },
    viewport: {
      viewports: {
        // A few custom viewports
        iphoneSe: {
          name: 'iPhone SE',
          styles: {
            height: '667px',
            width: '375px',
          },
          type: 'mobile',
        },
        iphone12Mini: {
          name: 'iPhone 12 Mini',
          styles: {
            height: '812px',
            width: '375px',
          },
          type: 'mobile',
        },
        // the default viewports from Storybook
        ...INITIAL_VIEWPORTS,
      },

      // storybook-addon-paddings
      paddings: [
        { name: 'Small', value: '16px' },
        { name: 'Medium', value: '32px', default: true },
        { name: 'Large', value: '64px' },
      ],

      // storybook-addon-color-mode
      colorMode: {
        defaultMode: 'default',
        modes: {
          light: {
            name: 'Light',
          },
        },
      },
    },
    options: {
      // custom sidebar sorting
      storySort: {
        order: [
          'Introduction',
          ['Welcome', 'Getting Started'],
          'Docs',
          'Advanced',
          'Typography',
          'Layout',
          'Design System',
          'Page sections',
          'Atoms',
          'Components',
        ],
      },
    },
  };

  export const decorators = [
    withPaddings,
    Story => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ];
  ```

### Useful addons

• paddings, color-mode, story-description-loader 등
• 설치 명령어(yarn add --dev …)까지 포함

- 유용한 에드온 목록과 설치 명령어들

- [storybook-addon-paddings](https://github.com/rbardini/storybook-addon-paddings)
- [story-description-loader](https://github.com/izhan/storybook-description-loader)
- [storybook-addon-color-mode](https://gitlab.com/joshrasmussen/storybook-addons/-/tree/next/packages%2Fcolor-mode)

```sh
yarn add --dev @storybook/preset-typescript @storybook/addon-docs/preset @storybook/addon-links/register @storybook/addon-actions/register @storybook/addon-backgrounds/register @storybook/addon-a11y/register @storybook/addon-knobs/register @storybook/addon-viewport/register storybook-addon-color-mode/register storybook-addon-paddings story-description-loader
```

With Gatsby: https://www.gatsbyjs.org/docs/visual-testing-with-storybook/
