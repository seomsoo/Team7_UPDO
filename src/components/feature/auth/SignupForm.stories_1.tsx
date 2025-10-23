import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SignupForm from './SignupForm';

const meta: Meta<typeof SignupForm> = {
  title: 'Feature/Auth/SignupForm',
  component: SignupForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '회원가입 폼 UI 프리뷰. RHF + Zod 기반 검증 구조. 실제 검증 및 서버 연동은 테스트 코드에서 검증합니다.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof SignupForm>;

export const Default: Story = { args: {} };
