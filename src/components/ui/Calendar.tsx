import React from 'react';
import { DayPicker, type NavProps } from 'react-day-picker';
import { cva, cx } from 'class-variance-authority';

const calendarVariants = cva('flex items-stretch rounded-xl bg-white', {
  variants: {
    variant: {
      date: 'p-6', // 24px all around
      datetime: 'px-3 py-3', // 12px all around
    },
  },
});

export interface CalendarProps {
  value?: Date; // 선택된 날짜 or 날짜/시간
  onChange: (date: Date | undefined) => void; // value 변경 핸들러
  footer?: React.ReactNode; // 하단 푸터 컴포넌트
  startMonth?: Date; // 달력이 시작되는 월 (기본값: 2025-01-01)
  disabled?: boolean; // 전체 달력 비활성화 여부
  className?: string; // 추가 CSS 클래스
  variant?: 'date' | 'datetime'; // 달력만, 또는 날짜+시간 선택
  timeStep?: number; // 분 단위 스텝 (기본 5)
}

function mergeDateTime(date: Date | undefined, h: number, m: number) {
  if (!date) return undefined;
  const d = new Date(date);
  d.setHours(h);
  d.setMinutes(m);
  d.setSeconds(0);
  d.setMilliseconds(0);
  return d;
}

function CustomNav({ onPreviousClick, onNextClick, previousMonth, nextMonth }: NavProps) {
  return (
    <div className="mb-2 flex w-full items-center justify-between">
      <button
        type="button"
        onClick={onPreviousClick}
        disabled={!previousMonth}
        aria-label="Go to previous month"
        className="inline-flex h-10 w-10 items-center justify-center rounded-md text-purple-500 transition-colors">
        <svg className="h-4 w-4 fill-current" viewBox="0 0 16 16" aria-hidden="true">
          <path
            d="M11 14 5 8l6-6"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
      </button>
      <div className="flex-1 text-center text-xl font-bold text-gray-900">
        {previousMonth &&
          new Date(previousMonth.getFullYear(), previousMonth.getMonth() + 1).toLocaleString(
            'default',
            { month: 'long', year: 'numeric' },
          )}
      </div>
      <button
        type="button"
        onClick={onNextClick}
        disabled={!nextMonth}
        aria-label="Go to next month"
        className="inline-flex h-10 w-10 items-center justify-center rounded-md text-purple-500 transition-colors">
        <svg className="h-4 w-4 fill-current" viewBox="0 0 16 16" aria-hidden="true">
          <path
            d="M5 14l6-6-6-6"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}

export const Calendar = ({
  value,
  onChange,
  footer,
  startMonth = new Date('2025-01-01'),
  disabled = false,
  variant = 'date',
  timeStep = 5,
}: CalendarProps) => {
  const initialH = value ? value.getHours() : 12;
  const initialM = value ? value.getMinutes() - (value.getMinutes() % timeStep) : 0;
  const [hour, setHour] = React.useState<number>(initialH);
  const [minute, setMinute] = React.useState<number>(initialM);
  const isPM = hour >= 12;

  const hours = React.useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => i + 1); // 1..12
  }, []);

  const minutes = React.useMemo(() => {
    const cnt = Math.floor(60 / timeStep);
    return Array.from({ length: cnt }, (_, i) => i * timeStep);
  }, [timeStep]);

  const handleSelect = (d?: Date) => {
    if (!d) return onChange(undefined);
    const H = (hour % 12) + (isPM ? 12 : 0);
    onChange(mergeDateTime(d, H, minute));
  };

  return (
    <div className={calendarVariants({ variant })}>
      <DayPicker
        mode="single"
        showOutsideDays
        selected={value}
        onSelect={handleSelect}
        disabled={disabled}
        startMonth={startMonth}
        formatters={{
          formatWeekdayName: day => day?.toLocaleDateString('en-US', { weekday: 'short' }),
        }}
        components={{ Nav: CustomNav }}
        classNames={{
          root: cx(
            'text-gray-800 flex flex-col box-border w-[320px]',
            variant === 'date' ? 'px-2.5' : 'px-2.5 py-1',
          ),
          nav: 'w-full',
          month_caption: 'hidden',
          caption_label: 'hidden',
          month_grid: 'flex w-full flex-col',
          weekdays: 'flex w-full mb-2',
          weekday: 'flex-1 text-center label p-1',
          week: 'flex w-full h-8',
          day: 'flex-1 flex justify-center items-center',
          day_button:
            'w-full h-full p-0 typo-body-sm rounded-md transition-colors hover:bg-purple-500 hover:text-white aria-selected:hover:bg-purple-500 flex items-center justify-center ',
          today: 'text-purple-500',
          disabled: 'text-gray-300 opacity-50 cursor-not-allowed',
          button_previous:
            'h-10 w-10 inline-flex items-center justify-center rounded-md text-purple-500 transition-colors',
          button_next:
            'h-10 w-10 inline-flex items-center justify-center rounded-md text-purple-500 transition-colors',
          chevron: 'fill-current w-4 h-4',
          footer: 'pt-1 mt-3',
        }}
        modifiersClassNames={{
          selected: 'bg-purple-500 text-white rounded-md',
          outside: 'text-gray-400',
        }}
        footer={footer}
      />

      {variant === 'datetime' && (
        <div className="flex items-start gap-[10px] px-[10px] py-3 text-gray-800">
          {/* divider */}
          <div className="w-px self-stretch bg-gray-200" />

          {/* Hours */}
          <div className="w-16">
            <div className="h-64 overflow-auto pr-1">
              {hours.map(h => (
                <button
                  key={h}
                  type="button"
                  className={
                    'block w-full rounded-md py-2 text-center ' +
                    ((hour % 12 || 12) === h ? 'bg-purple-500 text-white' : 'hover:bg-gray-100')
                  }
                  onClick={() => {
                    const base = isPM ? 12 : 0;
                    setHour(((h % 12) + base) % 24);
                    if (value) onChange(mergeDateTime(value, ((h % 12) + base) % 24, minute));
                  }}>
                  {h.toString().padStart(2, '0')}
                </button>
              ))}
            </div>
          </div>

          {/* Minutes */}
          <div className="w-16">
            <div className="h-64 overflow-auto pr-1">
              {minutes.map(m => (
                <button
                  key={m}
                  type="button"
                  className={
                    'block w-full rounded-md py-2 text-center ' +
                    (minute === m ? 'bg-purple-500 text-white' : 'hover:bg-gray-100')
                  }
                  onClick={() => {
                    setMinute(m);
                    if (value) {
                      const H = (hour % 12) + (isPM ? 12 : 0);
                      onChange(mergeDateTime(value, H, m));
                    }
                  }}>
                  {m.toString().padStart(2, '0')}
                </button>
              ))}
            </div>
          </div>

          {/* AM/PM */}
          <div className="w-16">
            <div className="h-64 overflow-auto pr-1">
              {['AM', 'PM'].map(label => (
                <button
                  key={label}
                  type="button"
                  className={
                    'block w-full rounded-md py-2 text-center ' +
                    ((label === 'PM') === isPM ? 'bg-purple-500 text-white' : 'hover:bg-gray-100')
                  }
                  onClick={() => {
                    const wantPM = label === 'PM';
                    const base = (hour % 12) + (wantPM ? 12 : 0);
                    setHour(base);
                    if (value) onChange(mergeDateTime(value, base, minute));
                  }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
