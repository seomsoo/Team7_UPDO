// src/components/feature/auth/SignupForm.stories.tsx

/* eslint-disable @typescript-eslint/no-explicit-any */
// -----------------------------------------------------------------------------
// NOTE: Storybook(Vite)용 스토리 파일
//       - main.ts/preview.ts 수정 없이 동작하도록 설계
//       - 서버 통신(authService.signup)만 스토리별로 mock 처리
//       - 라우팅은 onSignupSuccess 콜백으로 콘솔 로그만 출력(실동작은 Next 래퍼가 수행)
// NOTE: Storybook용 회원가입 폼 Mock
//       - 실제 서비스에서는 Next Router를 사용하지만,
//         스토리북에서는 onSignupSuccess 콜백만 로그 출력.
// -----------------------------------------------------------------------------

import type { Meta, StoryObj } from '@storybook/nextjs-vite'; // 팀의 기존 스토리 타입과 일치
import React from 'react';

import SignupForm from './SignupForm';
import { authService } from '@/services/auths/AuthService';

// CSF3: 기본 메타는 최상위에서 객체 리터럴로 선언해야 Storybook이 인식
const meta: Meta<typeof SignupForm> = {
  title: 'Feature/Auth/SignupForm',
  component: SignupForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '팀 공용 Input 인터페이스 기반 SignupForm. RHF + Zod + Debounce 검증 통합. 라우팅은 onSignupSuccess 콜백으로 주입(Storybook에서는 콘솔 로그).',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof SignupForm>;

// 유틸: 서버 호출 mocking
function mockSignupResolve() {
  (authService.signup as unknown as () => Promise<{ message: string }>) = async () =>
    Promise.resolve({ message: 'ok' });
}
function mockSignupReject(field: 'email' | 'password' | 'name' | 'companyName', message: string) {
  (authService.signup as any) = async () =>
    Promise.reject({
      status: 400,
      code: 'VALIDATION_ERROR',
      parameter: field,
      message,
    });
}

// ✅ 성공 케이스: 회원가입 OK → 콜백에서 라우팅(여기서는 콘솔로 대체)
export const Success: Story = {
  name: 'Success (Resolved)',
  render: () => {
    mockSignupResolve();
    return (
      <SignupForm
        onSignupSuccess={() => {
          console.log('[Storybook] 회원가입 성공 → (실서비스라면) /login 이동');
        }}
      />
    );
  },
};

// ❌ 이메일 중복 케이스(서버 유효성 오류)
export const EmailConflict: Story = {
  name: 'Email Conflict (Rejected)',
  render: () => {
    mockSignupReject('email', '중복된 이메일입니다.');
    return <SignupForm />;
  },
};

// ❌ 비밀번호 규칙 위반 케이스(서버 유효성 오류)
export const PasswordInvalid: Story = {
  name: 'Password Invalid (Rejected)',
  render: () => {
    mockSignupReject('password', '비밀번호 규칙을 확인해주세요.');
    return <SignupForm />;
  },
};
