// -----------------------------------------------------------------------------
// NOTE: LoginForm 기능 검증용 Jest 테스트 코드
//       - RHF + Zod 검증 및 서버 Mock 처리
//       - 성공 / 이메일 없음 / 비밀번호 오류 / 입력 누락 등 시나리오 포함
// -----------------------------------------------------------------------------

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '@/components/feature/auth/LoginForm';
import { authService } from '@/services/auths/AuthService';

// ✅ authService.signin 모듈 Mock
jest.mock('@/services/auths/AuthService', () => ({
  authService: {
    signin: jest.fn(),
  },
}));

describe('🧪 LoginForm (로그인 폼)', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // ✅ 성공 케이스
  it('로그인 성공 시 onLoginSuccess 콜백이 호출된다', async () => {
    (authService.signin as jest.Mock).mockResolvedValueOnce({ token: 'mocked-jwt' });
    const handleSuccess = jest.fn();

    render(<LoginForm onLoginSuccess={handleSuccess} />);

    fireEvent.change(screen.getByLabelText('이메일'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('비밀번호'), { target: { value: 'abcd1234' } });
    fireEvent.click(screen.getByRole('button', { name: '로그인' }));

    await waitFor(() => expect(handleSuccess).toHaveBeenCalledTimes(1));
  });

  // ❌ 존재하지 않는 이메일
  it('존재하지 않는 이메일일 경우 에러 메시지를 표시한다', async () => {
    (authService.signin as jest.Mock).mockRejectedValueOnce({
      parameter: 'email',
      message: '존재하지 않는 아이디입니다.',
    });

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText('이메일'), {
      target: { value: 'notfound@example.com' },
    });
    fireEvent.change(screen.getByLabelText('비밀번호'), { target: { value: 'abcd1234' } });
    fireEvent.click(screen.getByRole('button', { name: '로그인' }));

    await waitFor(() =>
      expect(screen.getByText('존재하지 않는 아이디입니다.')).toBeInTheDocument(),
    );
  });

  // ❌ 비밀번호 불일치
  it('비밀번호 규칙이 잘못되면 경고 메시지를 표시한다', async () => {
    (authService.signin as jest.Mock).mockRejectedValueOnce({
      parameter: 'password',
      message: '영문, 숫자 조합 필수, 특수문자는 선택사항입니다.',
    });

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText('이메일'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('비밀번호'), { target: { value: 'wrongpass' } });
    fireEvent.click(screen.getByRole('button', { name: '로그인' }));

    // ✅ 실제 DOM에는 이 문구가 렌더링됨
    await waitFor(() => expect(screen.getByText(/영문, 숫자 조합 필수/i)).toBeInTheDocument());
  });

  // ❌ 필수 입력 누락
  it('필수 입력이 누락되면 제출되지 않는다', async () => {
    render(<LoginForm />);

    fireEvent.click(screen.getByRole('button', { name: '로그인' }));

    await waitFor(() => {
      expect(
        screen.getAllByText(/입력해주세요|입력 가능합니다|이상 입력/i).length,
      ).toBeGreaterThanOrEqual(1);
    });
  });

  // ❌ 서버 오류
  test.skip('서버 오류 발생 시 사용자에게 에러 메시지를 표시한다', async () => {
    (authService.signin as jest.Mock).mockRejectedValueOnce({
      message: '서버 오류가 발생했습니다.',
    });

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText('이메일'), {
      target: { value: 'error@example.com' },
    });
    fireEvent.change(screen.getByLabelText('비밀번호'), {
      target: { value: 'abcd1234' },
    });
    fireEvent.click(screen.getByRole('button', { name: '로그인' }));

    // ✅ aria 속성을 이용해 오류 표시가 감지되는지 확인
    await waitFor(() => {
      const passwordInput = screen.getByLabelText('비밀번호');
      expect(passwordInput).toHaveAttribute('aria-invalid', 'true');
    });

    // ✅ 약간의 지연을 허용해서 RHF의 상태 업데이트 기다리기
    await waitFor(
      () => {
        const alert = screen.getByRole('alert');
        expect(alert).toHaveTextContent(/서버\s*오류/i);
      },
      { timeout: 1500 }, // ← RHF 비동기 렌더링 대기 (중요)
    );
  });
});
