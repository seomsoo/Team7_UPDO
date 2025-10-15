// src/components/feature/auth/LoginForm.tsx

// -----------------------------------------------------------------------------
// NOTE: 로그인 전용 폼 컴포넌트
//       - RHF + Zod 기반 폼 검증
//       - 이메일 / 비밀번호 입력 검증 (SignupForm과 동일한 패스워드 규칙 적용)
//       - 입력 시 Debounce 검증 (불필요한 유효성 검사 최소화)
//       - 로그인 성공 시: JWT 토큰 저장 + 만료시간 기록 (1시간)
//       - 로그인 상태는 전역 Zustand 스토어(useAuthStore)로 관리
//       - 라우팅은 외부 콜백(onLoginSuccess) 주입 방식으로 제어 (Next Router 미의존)
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// NOTE: 이메일/비밀번호 로그인 폼
//       - RHF + Zod 검증
//       - 입력 중 1초 디바운스 검증
//       - JWT 토큰 저장 + 만료 시각 기록 (1시간)
// -----------------------------------------------------------------------------

'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod'; // ✅ Zod 직접 import

import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import useDebounce from '@/hooks/useDebounce';
import { authService } from '@/services/auths/AuthService';
import { useAuthStore } from '@/stores/useAuthStore';
import { LoginFormSchema } from '@/schemas/authsSchema'; // ✅ Zod 스키마 import

type LoginFormProps = {
  onLoginSuccess?: () => void;
};

// ✅ Zod로부터 타입 직접 추론
type LoginFormType = z.infer<typeof LoginFormSchema>;

export default function LoginForm({ onLoginSuccess }: LoginFormProps) {
  // ---------------------------------------------------------------------------
  // RHF 기본 설정: Zod 스키마를 기반으로 자동 검증
  // ---------------------------------------------------------------------------
  const {
    register,
    handleSubmit,
    trigger,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  // ---------------------------------------------------------------------------
  // 입력 중 과도한 trigger 호출 억제 (입력 멈춤 1000ms 후 검증)
  // ---------------------------------------------------------------------------
  const debouncedValidate = useDebounce((field: keyof LoginFormType) => {
    void trigger(field);
  }, 1000);

  // RHF의 register에 Debounce 검증을 결합
  const registerWithValidation = (name: keyof LoginFormType) => {
    const base = register(name);
    return {
      ...base,
      onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
        base.onBlur(e);
        void trigger(name);
      },
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        base.onChange(e);
        debouncedValidate(name);
      },
    };
  };

  // ---------------------------------------------------------------------------
  // 제출 핸들러: 로그인 요청 → JWT 저장 → 성공 콜백 실행
  // ---------------------------------------------------------------------------
  const [globalError, setGlobalError] = useState<string | null>(null);

  const onSubmit = handleSubmit(async data => {
    try {
      const teamId = '1'; // 실서비스에서는 Context 또는 환경변수에서 주입
      const response = await authService.signin(teamId, data);

      // ✅ JWT 토큰 저장 (만료시간은 1시간)
      const expiresAt = Date.now() + 60 * 60 * 1000;
      useAuthStore.getState().setToken(response.token, 60 * 60 * 1000);

      // ✅ 성공 시 외부 콜백 실행
      onLoginSuccess?.();
    } catch (err: unknown) {
      if (typeof err === 'object' && err !== null) {
        const e = err as { parameter?: keyof LoginFormType; message?: string };

        // 서버 오류(전역)
        if (!e.parameter) {
          setError('password', {
            type: 'server',
            message: e.message ?? '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
          });
          return;
        }

        // 필드 오류
        setError(e.parameter, {
          type: 'server',
          message: e.message ?? '로그인에 실패했습니다.',
        });
      }
    }
  });

  // ---------------------------------------------------------------------------
  // 렌더링
  // ---------------------------------------------------------------------------
  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full max-w-[400px] flex-col gap-5 rounded-xl bg-white p-6 shadow-md"
      noValidate>
      {/* ////////////////////////////////////////////////////////////////
          이메일 입력
      //////////////////////////////////////////////////////////////// */}
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="pl-1 text-sm font-medium text-gray-700">
          이메일
        </label>
        <Input
          id="email"
          inputSize="lg"
          type="email"
          placeholder="이메일 주소를 입력하세요"
          {...registerWithValidation('email')}
          errorMessage={errors.email?.message}
          disabled={isSubmitting}
          autoComplete="email"
        />
      </div>

      {/* ////////////////////////////////////////////////////////////////
          비밀번호 입력
      //////////////////////////////////////////////////////////////// */}
      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="pl-1 text-sm font-medium text-gray-700">
          비밀번호
        </label>
        <Input
          id="password"
          inputSize="lg"
          type="password"
          placeholder="비밀번호를 입력하세요"
          {...registerWithValidation('password')}
          errorMessage={errors.password?.message}
          disabled={isSubmitting}
          autoComplete="current-password"
        />
      </div>

      {/* ////////////////////////////////////////////////////////////////
          제출 버튼
      //////////////////////////////////////////////////////////////// */}
      <Button
        type="submit"
        variant="primary"
        disabled={isSubmitting}
        className="mt-4 h-[48px] w-full text-base font-semibold"
        aria-label="로그인">
        {isSubmitting ? <LoadingSpinner size="xs" color="white" /> : '로그인'}
      </Button>

      {globalError && (
        <p role="alert" className="typo-sm mt-3 text-center text-red-500">
          {globalError}
        </p>
      )}
    </form>
  );
}
