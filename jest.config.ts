import nextJest from 'next/jest';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',

  // ✅ 1️⃣ 절대경로(@/...) 매핑 추가
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // '@/components/...' → 'src/components/...'

    // ✅ 2️⃣ CSS, 이미지 등 비JS 파일 mock 처리
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
    '\\.(svg|png|jpg|jpeg|gif)$': '<rootDir>/__mocks__/fileMock.ts',
  },

  // ✅ 3️⃣ 테스트 실행 전 환경 설정 파일 (예: jest-dom 확장)
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // ✅ 4️⃣ transform 옵션 (ts-jest 대신 next/jest가 내부적으로 Babel 사용)
  transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],

  // ✅ 5️⃣ 테스트 경로 (기본값으로도 충분하지만 명시해두면 명확)
  testMatch: [
    '<rootDir>/src/__tests__/**/*.test.(ts|tsx)',
    '<rootDir>/src/**/__tests__/**/*.(ts|tsx)',
  ],
};
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
