// vite.config.ts
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import path from 'node:path';

export default defineConfig({
  plugins: [
    svgr(), // ⬅️ SVG를 React 컴포넌트로 import 가능하게
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 절대 경로 alias (선택)
    },
  },
});
