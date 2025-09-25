// .eslintrc.js
module.exports = {
  root: true,
  extends: [
    "next/core-web-vitals", // Next.js 기본 권장 규칙
    "plugin:@typescript-eslint/recommended", // TS 권장 규칙
    "prettier", // Prettier와 충돌하는 규칙 꺼주기
  ],
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    // Prettier와 일치하지 않으면 경고만 띄움
    "prettier/prettier": "warn",
    // 사용하지 않는 변수 → 경고만
    "@typescript-eslint/no-unused-vars": "warn",
    // JSX에서 빈 태그는 self-closing 권장
    "react/self-closing-comp": "warn",
    // console.log 허용
    "no-console": "off",
    // any 타입 사용 가능
    "@typescript-eslint/no-explicit-any": "off",
    // import 정렬
    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn",
  },
};
