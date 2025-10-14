// src/hooks/useDebounce.ts

'use client';

import { useEffect, useRef } from 'react';

/**
 * 입력 또는 이벤트 발생 후 일정 시간 동안 추가 호출이 없을 때만 callback을 실행합니다.
 * (e.g. 입력 유효성 검사, 검색 자동완성, API 호출 최적화 등)
 *
 * @param callback - 지연 실행할 콜백 함수
 * @param delay - 지연 시간(ms)
 * @returns 디바운스된 콜백 함수
 */

// -----------------------------------------------------------------------------
// NOTE: Debounce 훅 (타입 안전 버전)
//       - any/unknown 미사용
//       - T 제네릭으로 콜백의 인자 타입을 자동 추론
// -----------------------------------------------------------------------------

export default function useDebounce<T extends (...args: Parameters<T>) => void>(
  callback: T,
  delay = 1000,
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 컴포넌트 언마운트 시 타이머 해제
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // 디바운스된 함수 반환
  const debouncedFn = (...args: Parameters<T>): void => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  return debouncedFn;
}
