// src/components/feature/auth/LoginForm.stories.tsx

// -----------------------------------------------------------------------------
// NOTE: Storybook(Vite) 대응용 로그인 폼 스토리 (v2)
//       - Router 미의존 구조(LoginForm 단독)
//       - 실제 API(authService.signin) 호출을 mock 처리하여 테스트 가능
//       - 시나리오:
//           ✅ Success (정상 로그인)
//           ❌ InvalidEmail (존재하지 않는 이메일)
//           ❌ WrongPassword (비밀번호 불일치)
// -----------------------------------------------------------------------------

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
import LoginForm from './LoginForm';
import { authService } from '@/services/auths/AuthService';

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
          '팀 공용 Input/Button 기반 로그인 폼. RHF + Zod + useDebounce 통합. 라우팅은 onLoginSuccess 콜백으로 주입되어 Storybook에서도 안전하게 동작합니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

// -----------------------------------------------------------------------------
// ✅ Mock 유틸 함수들
// -----------------------------------------------------------------------------

// ✅ 로그인 성공 Mock
function mockSigninSuccess() {
  (authService.signin as unknown as () => Promise<{ token: string }>) = async () => {
    console.log('[Mock API] 로그인 성공');
    return Promise.resolve({ token: 'mocked-jwt-token' });
  };
}

// ❌ 존재하지 않는 이메일 Mock
function mockSigninInvalidEmail() {
  (authService.signin as unknown as () => Promise<{ token: string }>) = async () => {
    console.warn('[Mock API] 존재하지 않는 이메일 오류');
    return Promise.reject({
      status: 404,
      code: 'USER_NOT_FOUND',
      parameter: 'email',
      message: '존재하지 않는 아이디입니다.',
    });
  };
}

// ❌ 비밀번호 불일치 Mock
function mockSigninWrongPassword() {
  (authService.signin as unknown as () => Promise<{ token: string }>) = async () => {
    console.warn('[Mock API] 비밀번호 불일치 오류');
    return Promise.reject({
      status: 401,
      code: 'INVALID_CREDENTIALS',
      parameter: 'password',
      message: '비밀번호가 일치하지 않습니다.',
    });
  };
}

// -----------------------------------------------------------------------------
// ✅ 성공 시나리오
// -----------------------------------------------------------------------------
export const Success: Story = {
  name: '✅ Success (Resolved)',
  render: () => {
    mockSigninSuccess();
    return (
      <LoginForm
        onLoginSuccess={() => {
          console.log('[Storybook] 로그인 성공 → (실서비스라면) /dashboard 이동');
        }}
      />
    );
  },
};

// -----------------------------------------------------------------------------
// ❌ 존재하지 않는 이메일
// -----------------------------------------------------------------------------
export const InvalidEmail: Story = {
  name: '❌ Invalid Email (Rejected)',
  render: () => {
    mockSigninInvalidEmail();
    return <LoginForm />;
  },
};

// -----------------------------------------------------------------------------
// ❌ 비밀번호 불일치
// -----------------------------------------------------------------------------
export const WrongPassword: Story = {
  name: '❌ Wrong Password (Rejected)',
  render: () => {
    mockSigninWrongPassword();
    return <LoginForm />;
  },
};
