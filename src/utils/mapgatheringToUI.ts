import { IGathering } from '@/types/gatherings';
import { formatDate, formatTime, formatDeadline } from '@/utils/date';

export const mapGatheringToUI = (data: IGathering, userId: number | null) => {
  // 실제 API 응답 type을 기반으로 UI topic 색상 변환
  const typeToTopic: Record<string, 'growth' | 'learn' | 'challenge' | 'connect'> = {
    WORKATION: 'growth',
    MINDFULNESS: 'learn',
    DALLAEMFIT: 'challenge',
    NETWORKING: 'connect',
  };

  const topic = typeToTopic[data.type] ?? 'growth';

  return {
    id: data.id,
    name: data.name,
    topic,
    dateText: formatDate(data.dateTime),
    timeText: formatTime(data.dateTime),
    deadlineText: formatDeadline(data.dateTime),
    isHost: userId ? data.createdBy === userId : false,
    participantCount: data.participantCount,
    capacity: data.capacity,
    minParticipants: 5,
    participants: [],
    image: data.image || '/images/find_banner.png',
  };
};
