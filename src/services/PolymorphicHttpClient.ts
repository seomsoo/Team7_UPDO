import { ENV } from '@/constants/env';
import HttpClient from './HttpClient';

export default class PolymorphicHttpClient extends HttpClient {
  private static pInstance: PolymorphicHttpClient;

  private constructor(baseUrl: string) {
    super(baseUrl);
  }

  public static getInstance(baseUrl?: string) {
    if (!PolymorphicHttpClient.pInstance) {
      const finalBaseUrl = baseUrl ?? ENV.API_BASE_URL;
      if (!finalBaseUrl) {
        throw new Error('API_BASE_URL is not configured');
      }
      PolymorphicHttpClient.pInstance = new PolymorphicHttpClient(finalBaseUrl);
    }
    return PolymorphicHttpClient.pInstance;
  }

  protected async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    if (typeof window === 'undefined') {
      options.credentials = 'include';
    }
    const res = await fetch(`${this.baseUrl}/${ENV.TEAM_ID}${path}`, options);
    return res.json() as Promise<T>;
  }
}
