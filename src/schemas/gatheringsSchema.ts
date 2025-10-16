import { z } from 'zod';

// 모임 생성 폼 유효성 검사
export const CreateGatheringFormSchema = z
  .object({
    // 1. 모임 이름
    name: z.string().min(1, { message: '모임 이름을 입력해주세요.' }),

    // 2. 모임 태그 (배움/도전/성장/연결)
    location: z.enum(['배움', '도전', '성장', '연결'], {
      message: '모임 태그를 선택해주세요.',
    }),

    // 3. 모임 이미지
    image: z
      .instanceof(File)
      .refine(file => file.size > 0, {
        message: '모임 이미지를 선택해주세요.',
      })
      .optional(),

    // 4. 모임 서비스 종류 (스킬업/챌린지/네트워킹)
    type: z.enum(['스킬업', '챌린지', '네트워킹'], {
      message: '모임 서비스를 선택해주세요.',
    }),

    // 5. 모집 날짜
    dateTime: z.string().min(1, { message: '모집 날짜를 선택해주세요.' }),

    // 6. 마감 날짜
    registrationEnd: z.string().min(1, { message: '마감 날짜를 선택해주세요.' }),

    // 7. 모집 정원 (5~20명)
    capacity: z
      .number({ message: '모임 정원을 입력해주세요.' })
      .int('정수만 입력 가능합니다.')
      .min(5, { message: '모임 정원은 최소 5명 이상이어야 합니다.' })
      .max(20, { message: '모임 정원은 최대 20명 이하이어야 합니다.' }),
  })
  .refine(
    data => {
      if (!data.dateTime || !data.registrationEnd) return true;
      return new Date(data.registrationEnd) < new Date(data.dateTime);
    },
    {
      message: '마감 날짜는 모집 날짜보다 이전이어야 합니다.',
      path: ['registrationEnd'],
    },
  );

export type CreateGatheringFormType = z.infer<typeof CreateGatheringFormSchema>;
