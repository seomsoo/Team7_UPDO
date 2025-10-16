const isStorybook = typeof window !== 'undefined' && '__STORYBOOK_PREVIEW__' in window;
const must = (name: string, v?: string) => {
  if (!v) {
    if (isStorybook) return 'https://stub.example.com'; // SB 전용 기본값
    throw new Error(`Missing required env: ${name}`);
  }
  return v;
};
export const ENV = {
  API_BASE_URL: must('NEXT_PUBLIC_API_BASE_URL', process.env.NEXT_PUBLIC_API_BASE_URL),
  TEAM_ID: must('NEXT_PUBLIC_TEAM_ID', process.env.NEXT_PUBLIC_TEAM_ID),
} as const;
