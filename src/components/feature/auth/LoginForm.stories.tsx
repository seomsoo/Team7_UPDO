// -----------------------------------------------------------------------------
// NOTE: 로그인 폼 Storybook (UI 프리뷰 전용)
//       - RHF + Zod + useDebounce 기반 구조
//       - 실제 서버통신(authService.signin)은 테스트 코드에서 검증
//       - Storybook에서는 기본 UI만 확인
// -----------------------------------------------------------------------------

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import LoginForm from './LoginForm';

// -----------------------------------------------------------------------------
// 기본 Storybook 메타 구성 (CSF3 표준)
// -----------------------------------------------------------------------------
const meta: Meta<typeof LoginForm> = {
  title: 'Feature/Auth/LoginForm',
  component: LoginForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '팀 공용 Input/Button 기반 로그인 폼. RHF + Zod + useDebounce 통합. \
          Storybook에서는 UI 기본 상태만 렌더링합니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

// -----------------------------------------------------------------------------
// ✅ 기본 상태(UI 프리뷰)
// -----------------------------------------------------------------------------
export const Default: Story = {
  args: {},
};
