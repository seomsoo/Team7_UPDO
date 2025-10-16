// Swagger 기반 에러 코드 집합
export type ApiErrorCode =
  | 'VALIDATION_ERROR'
  | 'INVALID_CREDENTIALS'
  | 'USER_NOT_FOUND'
  | 'SERVER_ERROR'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'PAST_GATHERING'
  | 'GATHERING_CANCELED';

// 에러 상세 구조
export interface IApiError {
  code: ApiErrorCode;
  message: string;
  parameter?: string;
  errors?: { parameter: string; message: string }[];
}
