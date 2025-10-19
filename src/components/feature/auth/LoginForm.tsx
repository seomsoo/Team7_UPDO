// -----------------------------------------------------------------------------
// NOTE: 로그인 전용 폼 컴포넌트
//       - RHF + Zod 기반 폼 검증
//       - 이메일 / 비밀번호 입력 검증 (SignupForm과 동일한 패스워드 규칙 적용)
//       - 입력 시 Debounce 검증 (불필요한 유효성 검사 최소화)
//       - 로그인 성공 시: JWT 토큰 저장 + 만료시간 기록 (1시간)
//       - 로그인 상태는 전역 Zustand 스토어(useAuthStore)로 관리
//       - 라우팅은 외부 콜백(onLoginSuccess) 주입 방식으로 제어 (Next Router 미의존)
//       - 입력 중 1초 디바운스 검증
// -----------------------------------------------------------------------------

'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import useDebounce from '@/hooks/useDebounce';
import { authService } from '@/services/auths/authService';
import { useAuthStore } from '@/stores/useAuthStore';
import { LoginFormSchema } from '@/schemas/authsSchema';

type LoginFormProps = {
  onLoginSuccess?: () => void;
};

type LoginFormType = z.infer<typeof LoginFormSchema>;

const firstIssueMessage = (err: z.ZodError) =>
  err.issues[0]?.message ?? '입력값이 올바르지 않습니다.';

export default function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    trigger,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormType>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const [globalError, setGlobalError] = useState<string | null>(null);
  const debouncedValidate = useDebounce((field: keyof LoginFormType) => {
    void trigger(field);
  }, 1000);

  const registerWithValidation = (name: keyof LoginFormType) => {
    const shape = LoginFormSchema.shape[name];
    const base = register(name, {
      required: name === 'email' ? '이메일을 입력해주세요.' : '비밀번호를 입력해주세요.',
      validate: (value: string) => {
        const parsed = shape.safeParse(value);
        return parsed.success ? true : firstIssueMessage(parsed.error);
      },
    });

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

  const onSubmit = handleSubmit(async data => {
    // ✅ 전체 Zod 검증
    const parsed = LoginFormSchema.safeParse(data);
    if (!parsed.success) {
      parsed.error.issues.forEach(issue => {
        const path = issue.path[0] as keyof LoginFormType | undefined;
        if (path) {
          setError(path, { type: 'zod', message: issue.message });
        }
      });
      return;
    }

    try {
      const response = await authService.signin(parsed.data);
      useAuthStore.getState().setToken(response.token, 60 * 60 * 1000);
      onLoginSuccess?.();
    } catch (err: unknown) {
      if (typeof err === 'object' && err !== null) {
        const e = err as { parameter?: keyof LoginFormType; message?: string };

        // ✅ 필드별 서버 오류
        if (e.parameter) {
          setError(e.parameter, {
            type: 'server',
            message: e.message ?? '입력값이 올바르지 않습니다.',
          });
          return;
        }

        // ✅ 전역 서버 오류
        setGlobalError(e.message ?? '서버 오류가 발생했습니다.');
        return;
      }
      setGlobalError('서버 오류가 발생했습니다.');
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full max-w-[400px] flex-col gap-5 rounded-xl bg-white p-6 shadow-md"
      noValidate>
      {/* 이메일 입력 */}
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

      {/* 비밀번호 입력 */}
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

      {/* 버튼 */}
      <Button
        type="submit"
        variant="primary"
        disabled={isSubmitting}
        className="mt-4 h-[48px] w-full text-base font-semibold"
        aria-label="로그인">
        {isSubmitting ? <LoadingSpinner size="xs" color="white" /> : '로그인'}
      </Button>

      {/* 전역 오류 메시지 */}
      {globalError && (
        <p role="alert" className="typo-sm mt-3 text-center text-red-500">
          {globalError}
        </p>
      )}
    </form>
  );
}
