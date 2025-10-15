// src/hooks/useThrottle.ts

'use client';

import { useRef, useCallback } from 'react';

/**
 * 특정 시간 간격(`delay`) 내에 콜백이 여러 번 호출되더라도,
 * 최초 1회만 실행되도록 제한합니다.
 *
 * - 버튼 연타 방지
 * - 스크롤 이벤트 최적화
 * - 무한 스크롤 API 과다 호출 방지 등
 *
 * @param callback - 실행할 콜백 함수
 * @param delay - 호출 간 최소 대기 시간(ms)
 * @returns 제한된 호출용 함수
 */
export default function useThrottle<T extends (...args: unknown[]) => void>(
  callback: T,
  delay = 1000,
): (...args: Parameters<T>) => void {
  const lastCallRef = useRef<number>(0);

  const throttledFn = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastCallRef.current < delay) return;

      lastCallRef.current = now;
      callback(...args);
    },
    [callback, delay],
  );

  return throttledFn;
}
