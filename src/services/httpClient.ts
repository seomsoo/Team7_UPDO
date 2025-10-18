import { ENV } from '@/constants/env';

// -----------------------------------------------------------------------------
// NOTE: HttpClient Singleton
//       - CSR 환경 전용이지만, SSR 빌드 시에도 안전하게 동작하도록 보호 처리 포함
//       - process.env.NEXT_PUBLIC_API_BASE_URL 우선 사용
//       - Fetch API 기반 (CSR 환경 전용)
//       - 싱글톤 패턴 적용 (getInstance())
//       - /constants/env.ts의 ENV.API_BASE_URL 사용
//       - 모든 서비스(authService, gatheringService 등)의 공통 기반
// -----------------------------------------------------------------------------

export default class HttpClient {
  private static instance: HttpClient;
  private baseUrl: string;

  // constructor는 외부에서 직접 호출 불가 (Singleton)
  protected constructor(baseUrl: string) {
    if (!baseUrl) {
      throw new Error('❌ API_BASE_URL is not configured. Check your .env file.');
    }
    this.baseUrl = baseUrl;
  }

  // ✅ 단일 인스턴스 생성 (CSR 환경 기준)
  public static getInstance(baseUrl?: string) {
    const finalBaseUrl = baseUrl ?? ENV.API_BASE_URL;
    if (!finalBaseUrl) {
      throw new Error(
        '❌ API_BASE_URL is not configured. Please set NEXT_PUBLIC_API_BASE_URL in .env',
      );
    }

    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient(finalBaseUrl);
    }
    return HttpClient.instance;
  }

  protected async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const { body } = options;

    const headers =
      body instanceof FormData
        ? options.headers || {}
        : {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
          };

    const res = await fetch(`${this.baseUrl}/${ENV.TEAM_ID}${path}`, {
      ...options,
      headers,
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      throw { status: res.status, ...errorBody };
    }

    return res.json() as Promise<T>;
  }

  public get<T>(path: string, params?: Record<string, string | number | boolean>): Promise<T> {
    const query = params
      ? `?${new URLSearchParams(Object.entries(params).map(([k, v]) => [k, String(v)])).toString()}`
      : '';
    return this.request<T>(`${path}${query}`, { method: 'GET' });
  }

  public post<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>(path, {
      method: 'POST',
      body: body instanceof FormData ? body : JSON.stringify(body),
    });
  }

  public put<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>(path, {
      method: 'PUT',
      body: body instanceof FormData ? body : JSON.stringify(body),
    });
  }

  public delete<T>(path: string): Promise<T> {
    return this.request<T>(path, { method: 'DELETE' });
  }
}
