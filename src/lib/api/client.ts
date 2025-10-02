// src/lib/api/client.ts

const BASE_URL = 'https://fe-adv-project-together-dallaem.vercel.app';

export async function apiClient<T>(path: string, options: RequestInit = {}): Promise<T> {
  const { body } = options;

  // Content-Type 처리: FormData일 경우 자동 설정 제거
  const headers =
    body instanceof FormData
      ? options.headers || {}
      : {
          'Content-Type': 'application/json',
          ...(options.headers || {}),
        };

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw {
      status: res.status,
      ...errorBody,
    };
  }

  return res.json() as Promise<T>;
}
