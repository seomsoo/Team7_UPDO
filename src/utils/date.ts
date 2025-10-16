import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isToday from 'dayjs/plugin/isToday';
import 'dayjs/locale/ko';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isToday);
dayjs.locale('ko');

export const formatDate = (isoString: string) => {
  return dayjs.utc(isoString).tz('Asia/Seoul').format('M월 D일');
};

export const formatTime = (isoString: string) => {
  return dayjs.utc(isoString).tz('Asia/Seoul').format('HH:mm');
};

export const formatDeadline = (isoString: string) => {
  const date = dayjs.utc(isoString).tz('Asia/Seoul');
  const now = dayjs().tz('Asia/Seoul');

  if (date.isToday()) {
    return `오늘 ${date.format('HH시')} 마감`;
  }

  const diff = date.diff(now, 'day');
  if (date.isBefore(now)) {
    return '마감';
  }
  return `${diff}일 후 마감`;
};
