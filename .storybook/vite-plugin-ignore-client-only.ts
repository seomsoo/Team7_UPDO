// .storybook/vite-plugin-ignore-client-only.ts
import type { Plugin } from 'vite';

// ✅ Vite 플러그인: "client-only" 모듈을 가짜 모듈로 치환
export default function ignoreClientOnlyPlugin(): Plugin {
  return {
    name: 'ignore-client-only',
    resolveId(source) {
      if (source === 'client-only') {
        // 가짜 모듈 ID로 치환
        return '\0virtual:client-only';
      }
      return null;
    },
    load(id) {
      if (id === '\0virtual:client-only') {
        // 가짜 모듈 내용 반환
        return 'export default {};';
      }
      return null;
    },
  };
}
