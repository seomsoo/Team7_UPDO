import { DayPicker } from 'react-day-picker';
// import 'react-day-picker/style.css';

export interface CalendarProps {
  value?: Date; // 선택된 날짜
  onChange: (date: Date | undefined) => void; // 날짜 변경 핸들러
  footer?: React.ReactNode; // 하단 푸터 컴포넌트
  startMonth?: Date; // 달력이 시작되는 월 (기본값: 2025-01-01)
  disabled?: boolean; // 전체 달력 비활성화 여부
  className?: string; // 추가 CSS 클래스
}

// const main_500 = '[#9553FF]';

// •	root: 달력 전체 컨테이너
// •	day: 개별 날짜 셀
// •	day_button: 날짜 버튼(<button>) 자체 (hover/active 효과 적용 대상)
// •	caption_label: 월/연도 캡션(예: “October 2025”) 텍스트 부분
// •	button_next: 다음 달 이동 버튼
// •	button_previous: 이전 달 이동 버튼
// •	chevron: 화살표 아이콘 자체 (SVG 등)
// •	dropdowns: 월/연도 선택 드롭다운 묶음 전체
// •	dropdown: 개별 드롭다운(월/연도 중 하나)
// •	dropdown_root: 드롭다운 루트(wrapper)
// •	month_caption: 월 제목(캡션 영역 전체)
// •	months: 여러 개의 월을 보여줄 때 월 전체 wrapper
// •	month_grid: 한 달 달력의 날짜 그리드(7열 구조)
// •	nav: 내비게이션 영역(이전/다음 버튼 + 캡션 포함)
// •	weekday: 요일 이름 셀(예: Sun, Mon …)
// •	week_number: 주 번호(옵션 켜면 보임)
// •	today: 오늘 날짜에 적용되는 스타일
// •	selected: 선택된 날짜에 적용되는 스타일
// •	outside: 현재 달이 아닌 날짜(앞/뒤 달에 속하는 날짜)
// •	disabled: 선택 불가한 날짜
// •	hidden: 숨겨진 셀 (달력 그리드 정렬용)
// •	range_start: 범위 선택 모드에서 시작 날짜
// •	range_middle: 범위 선택 중간 날짜들
// •	range_end: 범위 선택 끝 날짜
// •	focusable: 키보드 포커스 가능한 요소 (접근성 관련)

// DOM 구조
{
  /* <div class="rdp-root">
  <div class="rdp-nav">          
    <button class="rdp-button_previous" />
    <button class="rdp-button_next" />
  </div>
  <div class="rdp-month">        
    <div class="rdp-month_caption">
      <span class="rdp-caption_label">October 2025</span>  
    </div>
    <table class="rdp-month_grid">...</table>
  </div>
</div> */
}

export const Calendar = ({
  value,
  onChange,
  footer,
  startMonth = new Date('2025-01-01'),
  disabled = false,
}: CalendarProps) => {
  return (
    <DayPicker
      mode="single" // 단일 날짜 선택 모드
      showOutsideDays
      fixedWeeks
      selected={value} // 선택된 날짜
      onSelect={onChange} // 날짜 선택 핸들러
      disabled={disabled} // 비활성화 여부
      startMonth={startMonth} // 시작 월
      formatters={{
        formatWeekdayName: day => day?.toLocaleDateString('en-US', { weekday: 'short' }),
      }}
      classNames={{
        // 전체 컨테이너 스타일
        root: 'shadow-lg py-6 px-11 rounded-xl bg-white',
        // 네비게이션 컨테이너 (이전/다음 버튼)
        nav: 'flex items-center justify-between mb-2 w-full',
        // 월/년도 캡션 스타일 (상단 중앙)
        month_caption: 'absolute left-1/2 -translate-x-1/2 top-2 text-xl font-bold',
        // 월 그리드 컨테이너
        month_grid: 'flex w-full bg-red-200 flex-col',
        // 요일 헤더 행 (월~일)
        weekdays: 'flex w-full mb-2',
        // 개별 요일 헤더
        weekday: 'flex-1 text-center text-sm font-medium text-gray-700 p-1',
        // 주 행
        week: 'flex w-full h-8',
        // 날짜 셀 컨테이너
        day: 'flex-1 flex justify-center items-center p-1 text-gray-700',
        // 날짜 버튼 (클릭 가능한 날짜)
        day_button:
          'h-9 w-9 p-0 font-normal rounded-md transition-colors hover:bg-[#9553FF] hover:text-white aria-selected:hover:bg-[#9553FF] flex items-center justify-center text-sm',
        // 오늘 날짜 스타일
        today: 'text-[#9553FF] font-semibold',
        // 비활성화된 날짜 스타일
        disabled: 'text-gray-300 opacity-50 cursor-not-allowed',
        // 이전 월 버튼
        button_previous:
          'h-10 w-10 inline-flex items-center justify-center rounded-md hover:bg-orange-100 text-[#9553FF] transition-colors',
        // 다음 월 버튼
        button_next:
          'h-10 w-10 inline-flex items-center justify-center rounded-md hover:bg-orange-100 text-[#9553FF] transition-colors',
        // 화살표 아이콘
        chevron: 'fill-current w-4 h-4',
        // 푸터 컨테이너
        footer: 'pt-1 mt-3',
      }}
      modifiersClassNames={{
        // 선택된 날짜 스타일
        selected: 'bg-[#9553FF] text-white rounded-md',
        // 현재 월이 아닌 날짜 스타일 (회색)
        outside: 'text-[#000000]',
      }}
      footer={footer} // <Button variants={calendar} />
    />
  );
};
