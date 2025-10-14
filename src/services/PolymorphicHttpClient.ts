// src/services/PolymorphicHttpClient.ts

import HttpClient from './HttpClient';

export default class PolymorphicHttpClient extends HttpClient {
  private static pInstance: PolymorphicHttpClient;

  private constructor(baseUrl: string) {
    super(baseUrl);
  }

  public static getInstance(
    baseUrl: string = 'https://fe-adv-project-together-dallaem.vercel.app',
  ) {
    if (!PolymorphicHttpClient.pInstance) {
      PolymorphicHttpClient.pInstance = new PolymorphicHttpClient(baseUrl);
    }
    return PolymorphicHttpClient.pInstance;
  }

  protected async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    if (typeof window === 'undefined') {
      options.credentials = 'include';
    }
    // ✅ localStorage에서 토큰/만료를 읽고 만료 차단
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    const expiryStr = typeof window !== 'undefined' ? localStorage.getItem('token_expiry') : null;
    const expiry = expiryStr ? Number(expiryStr) : null;

    if (token && expiry && Date.now() >= expiry) {
      // 만료: 로컬 정리
      localStorage.removeItem('access_token');
      localStorage.removeItem('token_expiry');
      throw { status: 401, code: 'UNAUTHORIZED', message: '토큰이 만료되었습니다.' };
    }

    // ✅ Authorization 자동 주입
    const headers = {
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    return super.request<T>(path, { ...options, headers });
  }
}
