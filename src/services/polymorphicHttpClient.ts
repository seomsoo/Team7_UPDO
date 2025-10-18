import { ENV } from '@/constants/env';
import HttpClient from './httpClient';
import { useAuthStore } from '@/stores/useAuthStore';

export default class PolymorphicHttpClient extends HttpClient {
  private static pInstance: PolymorphicHttpClient;

  private constructor(baseUrl: string) {
    super(baseUrl);
  }

  public static getInstance(baseUrl?: string) {
    // ✅ CSR 전용 환경에서는 NEXT_PUBLIC_API_BASE_URL만 사용
    if (!PolymorphicHttpClient.pInstance) {
      const finalBaseUrl = baseUrl ?? ENV.API_BASE_URL;
      if (!finalBaseUrl) {
        throw new Error('API_BASE_URL is not configured. Please check your .env file.');
      }
      if (!PolymorphicHttpClient.pInstance) {
        PolymorphicHttpClient.pInstance = new PolymorphicHttpClient(finalBaseUrl);
      }
    }
    return PolymorphicHttpClient.pInstance;
  }

  protected async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    if (typeof window === 'undefined') {
      options.credentials = 'include';
    }

    // ✅ useAuthStore에서 상태를 직접 읽음
    const { token, checkTokenValidity } = useAuthStore.getState();

    // 토큰이 만료되었으면 요청 전에 에러 던짐
    if (token && !checkTokenValidity()) {
      throw { status: 401, code: 'UNAUTHORIZED', message: '인증이 필요합니다.' };
    }

    // ✅ Authorization 헤더 자동 주입
    const headers = new Headers(options.headers ?? {});
    if (token && !headers.has('Authorization')) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return super.request<T>(path, { ...options, headers });
  }
}
