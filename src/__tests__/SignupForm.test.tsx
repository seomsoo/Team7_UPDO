// -----------------------------------------------------------------------------
// NOTE: SignupForm 기능 검증용 Jest 테스트 코드
//       - RHF + Zod 유효성 검증 및 서버 Mock 처리
//       - 성공 / 중복 이메일 / 비밀번호 불일치 / 입력 누락 / 서버 오류 등 시나리오 포함
// -----------------------------------------------------------------------------

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignupForm from '@/components/feature/auth/SignupForm';
import { authService } from '@/services/auths/AuthService';

// ✅ authService.signup 모듈 Mock
jest.mock('@/services/auths/AuthService', () => ({
  authService: {
    signup: jest.fn(),
  },
}));

describe('🧪 SignupForm (회원가입 폼)', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // ✅ 성공 케이스
  it('회원가입 성공 시 onSignupSuccess 콜백이 호출된다', async () => {
    (authService.signup as jest.Mock).mockResolvedValueOnce({ message: 'ok' });
    const handleSuccess = jest.fn();

    render(<SignupForm onSignupSuccess={handleSuccess} />);

    fireEvent.change(screen.getByLabelText('이름'), { target: { value: '홍길동' } });
    fireEvent.change(screen.getByLabelText('회사명'), { target: { value: '달램컴퍼니' } });
    fireEvent.change(screen.getByLabelText('이메일'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('비밀번호'), { target: { value: 'abcd1234' } });
    fireEvent.change(screen.getByLabelText('비밀번호 확인'), { target: { value: 'abcd1234' } });
    fireEvent.click(screen.getByRole('button', { name: '회원가입' }));

    await waitFor(() => expect(handleSuccess).toHaveBeenCalledTimes(1));
  });

  // ❌ 이메일 중복 에러
  it('이메일 중복 시 해당 에러 메시지를 표시한다', async () => {
    (authService.signup as jest.Mock).mockRejectedValueOnce({
      parameter: 'email',
      message: '중복된 이메일입니다.',
    });

    render(<SignupForm />);

    fireEvent.change(screen.getByLabelText('이름'), { target: { value: '홍길동' } });
    fireEvent.change(screen.getByLabelText('회사명'), { target: { value: '달램컴퍼니' } });
    fireEvent.change(screen.getByLabelText('이메일'), { target: { value: 'dup@example.com' } });
    fireEvent.change(screen.getByLabelText('비밀번호'), { target: { value: 'abcd1234' } });
    fireEvent.change(screen.getByLabelText('비밀번호 확인'), { target: { value: 'abcd1234' } });
    fireEvent.click(screen.getByRole('button', { name: '회원가입' }));

    await waitFor(() => expect(screen.getByText('중복된 이메일입니다.')).toBeInTheDocument());
  });

  // ❌ 비밀번호 불일치
  it('비밀번호와 비밀번호 확인이 일치하지 않으면 에러 메시지를 표시한다', async () => {
    render(<SignupForm />);

    fireEvent.change(screen.getByLabelText('비밀번호'), { target: { value: 'abcd1234' } });
    fireEvent.change(screen.getByLabelText('비밀번호 확인'), { target: { value: 'zzzz9999' } });
    fireEvent.click(screen.getByRole('button', { name: '회원가입' }));

    await waitFor(
      () => expect(screen.getByText(/비밀번호가 일치하지 않습니다/i)).toBeInTheDocument(),
      { timeout: 1500 },
    );
  });

  // ❌ 필수 입력 누락
  it('필수 필드를 모두 입력하지 않으면 제출되지 않는다', async () => {
    render(<SignupForm />);

    fireEvent.click(screen.getByRole('button', { name: '회원가입' }));

    await waitFor(() => {
      expect(
        screen.getAllByText(/입력해주세요|입력 가능합니다|이상 입력/i).length,
      ).toBeGreaterThanOrEqual(1);
    });
  });

  // ❌ 서버 내부 오류
  it('서버 오류 발생 시 일반 에러 메시지를 표시한다', async () => {
    (authService.signup as jest.Mock).mockRejectedValueOnce({
      message: '서버 오류가 발생했습니다.',
    });

    render(<SignupForm />);

    fireEvent.change(screen.getByLabelText('이름'), { target: { value: '홍길동' } });
    fireEvent.change(screen.getByLabelText('회사명'), { target: { value: '테스트주식회사' } });
    fireEvent.change(screen.getByLabelText('이메일'), { target: { value: 'error@example.com' } });
    fireEvent.change(screen.getByLabelText('비밀번호'), { target: { value: 'abcd1234' } });
    fireEvent.change(screen.getByLabelText('비밀번호 확인'), { target: { value: 'abcd1234' } });
    fireEvent.click(screen.getByRole('button', { name: '회원가입' }));

    await waitFor(() => expect(screen.getByText(/서버 오류가 발생했습니다/i)).toBeInTheDocument());
  });
});
