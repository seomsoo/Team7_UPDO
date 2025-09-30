export default {
  plugins: ['prettier-plugin-tailwindcss'],

  // 개인 선호 옵션들
  printWidth: 100, // 한 줄 최대 길이
  tabWidth: 2, // 들여쓰기 간격
  singleQuote: true, // 작은따옴표
  semi: true, // 세미콜론 항상 사용
  bracketSameLine: true, // JSX 닫는 태그 같은 줄에
  endOfLine: 'lf', // 줄바꿈 방식 (LF)
  trailingComma: 'all', // 마지막 원소 뒤에 콤마
  arrowParens: 'avoid', // 화살표 함수 인자 하나면 괄호 제거
};
