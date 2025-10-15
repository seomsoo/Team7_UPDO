// src/stores/useAuthStore.ts

// -----------------------------------------------------------------------------
// NOTE: 인증 전역 스토어 (Zustand)
//       - token: 현재 액세스 토큰(없으면 null)
//       - tokenExpiry: 만료 타임스탬프(ms). null이면 만료 관리 없음
//       - isAuthenticated: 로그인 여부
//       - setToken(token, expiryMs): 토큰/만료 등록 + localStorage 동기화
//       - logout(): 토큰/만료 제거 + 상태 초기화
//       - 초기화 시(localStorage → state) 복구 로직 포함
// -----------------------------------------------------------------------------

import { create } from 'zustand';

interface AuthState {
  token: string | null;
  tokenExpiry: number | null;
  isAuthenticated: boolean;
  setToken: (token: string | null, expiryMs?: number) => void;
  logout: () => void;
  checkTokenValidity: () => boolean;
}

// 브라우저 환경에서만 localStorage 접근
const readFromStorage = () => {
  if (typeof window === 'undefined') {
    return { token: null as string | null, tokenExpiry: null as number | null };
  }
  const token = localStorage.getItem('access_token');
  const expiryStr = localStorage.getItem('token_expiry');
  const parsed = expiryStr ? Number(expiryStr) : null;
  const tokenExpiry = parsed && !isNaN(parsed) ? parsed : null;
  return { token, tokenExpiry };
};

// ✅ 순환참조 없이 get() 사용
export const useAuthStore = create<AuthState>((set, get) => {
  const { token, tokenExpiry } = readFromStorage();

  return {
    token,
    tokenExpiry,
    isAuthenticated: !!token && !!tokenExpiry && Date.now() < tokenExpiry,

    setToken: (newToken, expiryMs) => {
      if (typeof window !== 'undefined') {
        if (newToken) {
          const expiry =
            typeof expiryMs === 'number' ? Date.now() + expiryMs : Date.now() + 60 * 60 * 1000;
          localStorage.setItem('access_token', newToken);
          localStorage.setItem('token_expiry', String(expiry));
          set({ token: newToken, tokenExpiry: expiry, isAuthenticated: true });
        } else {
          localStorage.removeItem('access_token');
          localStorage.removeItem('token_expiry');
          set({ token: null, tokenExpiry: null, isAuthenticated: false });
        }
      } else {
        set({ token: newToken, tokenExpiry: null, isAuthenticated: !!newToken });
      }
    },

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
