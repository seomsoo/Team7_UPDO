// -----------------------------------------------------------------------------
// NOTE: 팀 공용 UI Input 인터페이스(placeholder, errorMessage, inputSize, rightSlot 등)
//       를 100% 준수하는 회원가입 폼 구현입니다.
//       - RHF + Zod 유효성 검사 통합
//       - 입력 중 과도한 검증 방지를 위한 디바운스 적용
//       - 라우팅 의존성 제거(성공 시 동작을 onSignupSuccess 콜백으로 외부 주입)
//       - Storybook(Vite) 환경에서도 Next Router 없이 안전하게 렌더링 가능
// -----------------------------------------------------------------------------

'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { JoinFormSchema } from '@/schemas/authsSchema';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import useDebounce from '@/hooks/useDebounce';
import { authService } from '@/services/auths/authService';

// Zod 스키마로부터 TS 타입 자동 생성
export type JoinFormType = z.infer<typeof JoinFormSchema>;

// 외부에서 라우팅 등 성공 후 동작을 주입받기 위한 prop
type SignupFormProps = {
  onSignupSuccess?: (data?: JoinFormType) => void; // 예: Next.js 환경에서 router.replace('/login')
};

const SignupForm: React.FC<SignupFormProps> = ({ onSignupSuccess }) => {
  const {
    register, // input에 연결(값/이벤트 바인딩)
    handleSubmit, // 제출 시 검증+핸들 실행
    trigger, // 특정 필드만 수동 검증할 때 사용
    setError, // 서버/비즈니스 로직 에러를 필드에 바인딩
    formState: { errors, isSubmitting }, // 에러 오브젝트 및 제출 상태
  } = useForm<JoinFormType>({
    resolver: async values => {
      // Zod + RHF 통합 검증 : resolver 직접 구현
      const result = JoinFormSchema.safeParse(values);
      if (result.success) {
        return { values: result.data, errors: {} };
      }
      // Zod 에러를 RHF 포맷으로 변환
      const formErrors = result.error.flatten().fieldErrors;
      return {
        values: {},
        errors: Object.entries(formErrors).reduce(
          (acc, [key, messages]) => {
            acc[key as keyof JoinFormType] = {
              type: 'manual',
              message: messages?.[0],
            };
            return acc;
          },
          {} as Record<string, { type: string; message: string }>,
        ),
      };
    },
    mode: 'onBlur', // blur 시 1차 검증
    reValidateMode: 'onChange', // 값 변경 시 재검증
  });

  // 입력 중 과도한 trigger 호출 억제: 사용자가 멈춘 뒤 1000ms 후 검증
  const debouncedValidate = useDebounce((field: keyof JoinFormType) => {
    void trigger(field);
  }, 1000);

  // RHF register에 onBlur/onChange를 결합해 일관된 UX 제공
  const registerWithValidation = (name: keyof JoinFormType) => {
    const base = register(name);
    return {
      ...base,
      onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
        base.onBlur(e);
        void trigger(name); // blur 즉시 검증
      },
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        base.onChange(e);
        debouncedValidate(name); // 입력 멈춤 1000ms 후 디바운스 검증
      },
    };
  };

  // 제출 핸들러: 서버에 회원가입 요청 → 성공 시 onSignupSuccess 콜백 실행
  const onSubmit = handleSubmit(async data => {
    try {
      // 서버에 회원가입 요청
      await authService.signup({
        email: data.email,
        password: data.password,
        name: data.name,
        companyName: data.companyName,
      });

      // 라우팅/토스트 등 성공 후 동작은 외부에서 주입받아 실행
      onSignupSuccess?.(data);
    } catch (err: unknown) {
      // 서버 응답 예: { status, code, message, parameter }
      // parameter가 있으면 해당 필드 하단에 에러 메시지를 표시
      if (typeof err === 'object' && err !== null) {
        const e = err as { parameter?: string; message?: string };
        const targetField = (e.parameter as keyof JoinFormType) || 'email';
        setError(targetField, {
          type: 'server',
          message: e.message ?? '회원가입에 실패했습니다.',
        });
      }
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      // 스타일: 기능 우선형. 팀 공용 디자인 토큰/유틸이 확정되면 교체
      className="flex w-full max-w-[400px] flex-col gap-5 rounded-xl bg-white p-6 shadow-md"
      noValidate // 브라우저 기본 검증 메시지 비활성화(RHF/Zod만 사용)
    >
      {/* //////////////////////////////////////////////////////////////////////////////
          이름
      ////////////////////////////////////////////////////////////////////////////// */}
      <div className="flex flex-col gap-1">
        {/* // 접근성: label(htmlFor) ↔ input(id) 연결 */}
        <label htmlFor="name" className="pl-1 text-sm font-medium text-gray-700">
          이름
        </label>
        <Input
          id="name"
          inputSize="lg" // 팀 공용 Input 크기 규격
          placeholder="이름을 입력하세요"
          {...registerWithValidation('name')}
          errorMessage={errors.name?.message} // 에러 문구는 공용 prop명 사용
          disabled={isSubmitting} // 제출 중에는 입력 잠금(선택)
        />
      </div>

      {/* //////////////////////////////////////////////////////////////////////////////
          회사명
      ////////////////////////////////////////////////////////////////////////////// */}
      <div className="flex flex-col gap-1">
        <label htmlFor="companyName" className="pl-1 text-sm font-medium text-gray-700">
          회사명
        </label>
        <Input
          id="companyName"
          inputSize="lg"
          placeholder="회사명을 입력하세요"
          {...registerWithValidation('companyName')}
          errorMessage={errors.companyName?.message}
          disabled={isSubmitting}
        />
      </div>

      {/* //////////////////////////////////////////////////////////////////////////////
          이메일
      ////////////////////////////////////////////////////////////////////////////// */}
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="pl-1 text-sm font-medium text-gray-700">
          이메일
        </label>
        <Input
          id="email"
          inputSize="lg"
          type="email" // HTML 표준 타입
          placeholder="이메일 주소를 입력하세요"
          {...registerWithValidation('email')}
          errorMessage={errors.email?.message}
          disabled={isSubmitting}
          autoComplete="email" // 브라우저 자동완성 힌트
        />
      </div>

      {/* //////////////////////////////////////////////////////////////////////////////
          비밀번호
      ////////////////////////////////////////////////////////////////////////////// */}
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
          autoComplete="new-password"
        />
      </div>

      {/* //////////////////////////////////////////////////////////////////////////////
          비밀번호 확인
      ////////////////////////////////////////////////////////////////////////////// */}
      <div className="flex flex-col gap-1">
        <label htmlFor="passwordConfirm" className="pl-1 text-sm font-medium text-gray-700">
          비밀번호 확인
        </label>
        <Input
          id="passwordConfirm"
          inputSize="lg"
          type="password"
          placeholder="비밀번호를 다시 입력하세요"
          {...registerWithValidation('passwordConfirm')}
          errorMessage={errors.passwordConfirm?.message}
          disabled={isSubmitting}
          autoComplete="new-password"
        />
      </div>

      {/* //////////////////////////////////////////////////////////////////////////////
          제출 버튼
      ////////////////////////////////////////////////////////////////////////////// */}
      <Button
        type="submit"
        variant="primary"
        disabled={isSubmitting}
        className="mt-4 h-[48px] w-full text-base font-semibold"
        aria-label="회원가입">
        {/* // 제출 중이면 스피너, 아니면 텍스트 */}
        {isSubmitting ? <LoadingSpinner size="xs" color="white" /> : '회원가입'}
      </Button>
    </form>
  );
};

export default SignupForm;
