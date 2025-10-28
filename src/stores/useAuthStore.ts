'use client';

import { create } from 'zustand';

interface AuthState {
  token: string | null;
  tokenExpiry: number | null;
  isAuthenticated: boolean;

  // 🔒 임시 잠금 관련 상태
  failedAttempts: number;
  isLocked: boolean;
  lockExpiry: number | null; // 잠금 만료 시각(ms)

  // 인증 관련 메서드
  setToken: (token: string | null, expiryMs?: number) => void;
  logout: () => void;
  checkTokenValidity: () => boolean;

  // 잠금 관련 메서드
  increaseFailedAttempts: () => void;
  resetFailedAttempts: () => void;
  checkLockStatus: () => boolean; // 만료 여부 확인
}

// ✅ 브라우저 환경에서만 localStorage 접근
const readFromStorage = () => {
  if (typeof window === 'undefined') {
    return {
      token: null as string | null,
      tokenExpiry: null as number | null,
      failedAttempts: 0,
      isLocked: false,
      lockExpiry: null,
    };
  }

  // 안전 숫자 파서
  const parseNum = (v: string | null): number | null => {
    const n = v != null ? Number(v) : NaN;
    return Number.isFinite(n) ? n : null;
  };

  const token = localStorage.getItem('access_token');
  const expiryStr = localStorage.getItem('token_expiry');
  const lockExpiryStr = localStorage.getItem('lock_expiry');
  const failedAttemptsStr = localStorage.getItem('failed_attempts');

  const tokenExpiry = parseNum(expiryStr);
  const lockExpiry = parseNum(lockExpiryStr);
  const faNum = failedAttemptsStr != null ? Number(failedAttemptsStr) : NaN;
  const failedAttempts = Number.isFinite(faNum) ? faNum : 0;

  const isLocked = !!lockExpiry && Date.now() < lockExpiry;

  return { token, tokenExpiry, failedAttempts, isLocked, lockExpiry };
};

// 파일 상단(전역)
export const LOCK_THRESHOLD = 5;
export const LOCK_MS = 30_000;
let unlockTimer: ReturnType<typeof setTimeout> | null = null;

// -----------------------------------------------------------------------------
// ✅ Zustand 스토어 정의
// -----------------------------------------------------------------------------

// ✅ 순환참조 없이 get() 사용
export const useAuthStore = create<AuthState>((set, get) => {
  const { token, tokenExpiry, failedAttempts, isLocked, lockExpiry } = readFromStorage();

  return {
    token,
    tokenExpiry,
    isAuthenticated: !!token && !!tokenExpiry && Date.now() < tokenExpiry,
    failedAttempts,
    isLocked,
    lockExpiry,

    // -------------------------------------------------------------------------
    // 🧩 토큰 설정 / 삭제
    // -------------------------------------------------------------------------

    setToken: (newToken, expiryMs) => {
      if (typeof window !== 'undefined') {
        if (newToken) {
          const expiry =
            typeof expiryMs === 'number' ? Date.now() + expiryMs : Date.now() + 60 * 60 * 1000;
          localStorage.setItem('access_token', newToken);
          localStorage.setItem('token_expiry', String(expiry));
          set({
            token: newToken,
            tokenExpiry: expiry,
            isAuthenticated: true,
            failedAttempts: 0, // 로그인 성공 시 실패횟수 초기화
            isLocked: false,
            lockExpiry: null,
          });
          localStorage.removeItem('failed_attempts');
          localStorage.removeItem('lock_expiry');
        } else {
          localStorage.removeItem('access_token');
          localStorage.removeItem('token_expiry');
          set({ token: null, tokenExpiry: null, isAuthenticated: false });
        }
      } else {
        set({ token: newToken, tokenExpiry: null, isAuthenticated: !!newToken });
      }
    },

    // -------------------------------------------------------------------------
    // 🧩 로그인 실패 횟수 증가
    // -------------------------------------------------------------------------
    increaseFailedAttempts: () => {
      let scheduledUnlockAt: number | null = null;
      // functional set을 사용해 원자적으로 계산/저장
      set(state => {
        const nextAttempts = state.failedAttempts + 1;
        const crossing = !state.isLocked && nextAttempts >= LOCK_THRESHOLD; // 임계점 '진입' 여부
        const lockUntil = crossing ? Date.now() + LOCK_MS : state.lockExpiry;
        if (typeof window !== 'undefined') {
          // 잠금 분기에서 failed_attempts를 localStorage에 저장
          localStorage.setItem('failed_attempts', String(nextAttempts));
          if (crossing && lockUntil) {
            localStorage.setItem('lock_expiry', String(lockUntil));
          }
        }
        scheduledUnlockAt = crossing ? lockUntil : null;
        return {
          failedAttempts: nextAttempts,
          isLocked: crossing ? true : state.isLocked,
          lockExpiry: lockUntil ?? null,
        };
      });
      // 남은 시간 기준 자동 해제
      if (scheduledUnlockAt) {
        if (unlockTimer) clearTimeout(unlockTimer);
        const delay = Math.max(scheduledUnlockAt - Date.now(), 0);
        unlockTimer = setTimeout(() => {
          const { lockExpiry } = get();
          if (lockExpiry && Date.now() >= lockExpiry) {
            if (typeof window !== 'undefined') {
              localStorage.removeItem('lock_expiry');
              localStorage.removeItem('failed_attempts');
            }
            set({ isLocked: false, failedAttempts: 0, lockExpiry: null });
          }
          unlockTimer = null;
        }, delay);
      }
    },

    // -------------------------------------------------------------------------
    // 🧩 실패 횟수 초기화
    // -------------------------------------------------------------------------
    resetFailedAttempts: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('failed_attempts');
        localStorage.removeItem('lock_expiry');
      }
      set({ failedAttempts: 0, isLocked: false, lockExpiry: null });
    },

    // -------------------------------------------------------------------------
    // 🧩 잠금 상태 확인 및 자동 해제
    // -------------------------------------------------------------------------
    checkLockStatus: () => {
      const { isLocked, lockExpiry } = get();
      if (isLocked && lockExpiry && Date.now() >= lockExpiry) {
        // 잠금 만료됨 → 초기화
        if (typeof window !== 'undefined') {
          localStorage.removeItem('lock_expiry');
          localStorage.removeItem('failed_attempts');
        }
        set({ isLocked: false, failedAttempts: 0, lockExpiry: null });
        return false;
      }
      return isLocked;
    },

    // -------------------------------------------------------------------------
    // 🧩 토큰 유효성 검사
    // -------------------------------------------------------------------------
    checkTokenValidity: () => {
      const state = get(); // ✅ 안전하게 상태 접근
      if (state.token && state.tokenExpiry && Date.now() >= state.tokenExpiry) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('access_token');
          localStorage.removeItem('token_expiry');
        }
        set({ token: null, tokenExpiry: null, isAuthenticated: false });
        return false;
      }

      // 잠금 상태 검사
      const locked = state.checkLockStatus();
      if (locked) return false;

      return !!state.token && !!state.isAuthenticated;
    },

    logout: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token');
        localStorage.removeItem('token_expiry');
      }
      set({ token: null, tokenExpiry: null, isAuthenticated: false });
    },
  };
});
