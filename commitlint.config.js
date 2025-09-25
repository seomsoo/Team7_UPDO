const Configuration = {
  // 기본 규칙 세트(길이, 빈 값 등 공통 규칙 유지)
  extends: ['@commitlint/config-conventional'],

  /**
   * 커스텀 헤더 형식 파서
   * [TYPE] #이슈번호 메시지
   *  - 캡처1: TYPE
   *  - 캡처2: subject(메시지)
   */
  parserPreset: {
    parserOpts: {
      headerPattern: /^\[([A-Z]+)\]\s+#\d+\s+(.+)$/,
      headerCorrespondence: ['type', 'subject'],
    },
  },

  formatter: '@commitlint/format',

  rules: {
    // TYPE은 반드시 아래 enum 중 하나 (대문자)
    'type-enum': [
      2,
      'always',
      [
        'FEAT',
        'FIX',
        'PERF',
        'DEL',
        'DOCS',
        'STYLE',
        'TEST',
        'CHORE',
        'CI',
        'DESIGN',
        'REVERT',
        'RENAME',
        'REFACTOR',
      ],
    ],
    // TYPE은 대문자 강제
    'type-case': [2, 'always', 'upper-case'],

    // subject는 비어 있으면 안 됨
    'subject-empty': [2, 'never'],

    // 우리의 포맷에는 scope/콜론이 없으므로 관련 규칙 무효화
    'type-empty': [2, 'never'],
    'scope-empty': [0],
    'subject-case': [0],
    'header-max-length': [2, 'always', 100],
  },

  ignores: [commit => commit === ''],

  defaultIgnores: true,

  // (선택) 프롬프트 커스터마이즈 예시
  prompt: {
    messages: {},
    questions: {
      type: {
        description: '커밋 타입을 입력하세요 (예: FEAT/FIX/CHORE ...)',
      },
    },
  },
};

export default Configuration;
