// src/components/common/LoadingSpinner.tsx

import clsx from 'clsx';

/**
 * 로딩 스피너 공용 컴포넌트
 *
 * - Tailwind 기반의 SVG 스피너를 렌더링합니다.
 * - 접근성(A11y)을 위해 `role="status"`와 `sr-only` 텍스트를 포함합니다.
 * - 사이즈/컬러는 사전에 정의된 토큰을 사용해 일관성을 유지합니다.
 */
interface LoadingSpinnerProps {
  /** 스피너 크기 프리셋 */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** 스피너 색상 프리셋 */
  color?: 'purple' | 'gray' | 'white';
}

/**
 * Tailwind 높이/너비 유틸리티 클래스를 통해
 * 스피너의 가로/세로 크기를 정의합니다.
 * - `h-*`, `w-*` 클래스는 SVG 자체의 렌더링 크기를 결정합니다.
 */
const sizeClasses = {
  xs: 'h-4 w-4',
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
} as const;

/**
 * fill/text 조합으로 두 겹의 path에 색을 정의합니다.
 * - 바깥 원(Path#1)은 `currentColor` 를 사용하므로 `text-*` 값이 적용됩니다.
 * - 윗부분 호(Path#2)는 `currentFill` 를 사용하므로 `fill-*` 값이 적용됩니다.
 * - 이 조합 덕분에 서로 다른 두 톤의 컬러로 회전 효과가 더 선명해집니다.
 */
const colorClasses = {
  purple: 'fill-purple-500 text-gray-200',
  gray: 'fill-gray-500 text-gray-200',
  white: 'fill-white text-gray-200',
} as const;

/**
 * LoadingSpinner
 *
 * - `animate-spin` 으로 회전 애니메이션을 부여합니다.
 * - `role="status"` + `sr-only` 로 스크린 리더 사용자가 상태를 인지하도록 합니다.
 * - 감싼 컨테이너는 중앙 정렬을 기본으로 하여 어디서든 쉽게 배치됩니다.
 */
const LoadingSpinner = ({ size = 'md', color = 'purple' }: LoadingSpinnerProps) => {
  return (
    // A11y: 진행 중 상태를 나타내는 영역으로 스크린 리더에게 노출
    <div role="status" className="z-50 flex items-center justify-center">
      {/**
       * SVG
       * - `animate-spin`: Tailwind의 CSS keyframes 로테이션 클래스
       * - `sizeClasses[size]`: 프리셋 기반 크기 제어 (h-*, w-*)
       * - `colorClasses[color]`: 두 톤 컬러 조합 (text-* + fill-*)
       */}
      <svg
        aria-hidden="true" // 시각적 장식 아이콘이므로 직접 읽지 않도록 숨김
        className={clsx('animate-spin', sizeClasses[size], colorClasses[color])}
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        {/**
         * Path #1: 배경 원
         * - `fill="currentColor"`: 상위 요소의 `color`(= text-*)를 사용
         * - 희미한 회색(예: text-gray-200)으로 스피너의 베이스를 만듭니다.
         */}
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        {/**
         * Path #2: 상단 호(arc)
         * - `fill="currentFill"`: 상위 요소의 `fill`(= fill-*)을 사용
         * - 선명한 컬러(예: purple-500)로 베이스와 대비되는 회전 효과를 만듭니다.
         */}
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>

      {/**
       * 스크린 리더 전용 텍스트
       * - 시각적 요소만 있는 경우 보조기기가 현재 상태를 이해할 수 있도록 합니다.
       */}
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
