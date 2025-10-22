'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';
import GroupCardList from '@/components/feature/group/GroupCardList';
import Tab from '@/components/ui/Tab';
import Category from '@/components/ui/Category';
import IconText from '@/components/ui/IconText';
import Dropdown from '@/components/ui/Dropdown';
import { Calendar } from '@/components/ui/Calendar';
import { SORT_OPTIONS, TAG_OPTIONS } from '@/constants';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { IconButton } from '@/components/ui/IconButton';
import { buildFilters } from '@/utils/mapping';
export default function GatheringPage() {
  const [isTagOpen, setIsTagOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTag, setSelectedTag] = useState('태그 전체');
  const [selectedFilter, setSelectedFilter] = useState('마감 임박');
  const tagRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  useOutsideClick(tagRef, () => setIsTagOpen(false));
  useOutsideClick(filterRef, () => setIsFilterOpen(false));
  useOutsideClick(calendarRef, () => setIsCalendarOpen(false));

  const [activeMain, setActiveMain] = useState<'성장' | '네트워킹'>('성장');

  const [activeSubId, setActiveSubId] = useState<string | undefined>(undefined);
  const [activeSubType, setActiveSubType] = useState<string | undefined>(undefined);

  const handleTagSelect = (value: string) => {
    const selected = TAG_OPTIONS.find(tag => tag.value === value);
    setSelectedTag(selected?.label ?? '태그 전체');
    setIsTagOpen(false);
  };
  const handleFilterSelect = (value: string) => {
    const selected = SORT_OPTIONS.find(opt => opt.value === value);
    setSelectedFilter(selected?.label ?? value);
    setIsFilterOpen(false);
  };
  const handleDateConfirm = (date?: Date) => {
    setSelectedDate(date);
    setIsCalendarOpen(false);
  };

  const mainTabs = [
    { value: '성장', label: '성장' },
    { value: '네트워킹', label: '네트워킹' },
  ];

  const handleCategoryChange = (id: string, apiType: string) => {
    setActiveSubId(id);
    setActiveSubType(apiType);
  };
  const filters = buildFilters({
    activeMain,
    activeSubType,
    selectedTag,
    selectedDate,
    selectedFilter,
  });
  return (
    <div>
      <header className="flex h-[192px] w-full items-center justify-between rounded-3xl bg-white sm:h-[244px]">
        <div className="ml-5 flex flex-col justify-center text-nowrap sm:ml-24">
          <p className="typo-body-sm sm:typo-subtitle text-[var(--purple-550)]">
            함께 성장 할 사람을 찾고 계신가요?
          </p>
          <p className="card-title sm:h3Semibold">지금 모임에 참여해보세요</p>
        </div>

        <div className="flex h-44 w-36 items-center justify-center sm:mr-16 sm:h-auto sm:w-[275px] md:mr-24 md:w-[316px]">
          <Image
            src="/images/find_banner.png"
            alt="모임 찾기 배너"
            width={310}
            height={70}
            priority
          />
        </div>
      </header>
      <div className="mb-4 sm:mt-8">
        <Tab
          items={mainTabs}
          value={activeMain}
          onChange={value => setActiveMain(value as '성장' | '네트워킹')}
        />
        <div className="mt-4 flex w-full flex-col gap-1.5 sm:mt-8 sm:flex-row sm:items-center">
          {activeMain === '성장' && (
            <Category
              mainCategory="성장"
              activeId={activeSubId}
              activeType={activeSubType}
              onChange={handleCategoryChange}
            />
          )}

          <div className="flex items-center font-medium text-gray-500 sm:ml-auto sm:h-[40px]">
            <div ref={tagRef} className="relative">
              <IconText
                icon="arrow"
                iconPosition="trailing"
                className="cursor-pointer px-2 hover:text-gray-800"
                onClick={() => setIsTagOpen(prev => !prev)}>
                {selectedTag}
              </IconText>

              {isTagOpen && (
                <div className="absolute z-10 mt-2 sm:top-full sm:right-0">
                  <Dropdown
                    items={TAG_OPTIONS}
                    onChange={handleTagSelect}
                    onOpenChange={setIsTagOpen}
                    size="small"
                  />
                </div>
              )}
            </div>
            <div ref={calendarRef} className="relative">
              <IconText
                icon="arrow"
                iconPosition="trailing"
                className="cursor-pointer px-2 hover:text-gray-800"
                onClick={() => setIsCalendarOpen(prev => !prev)}>
                {selectedDate
                  ? selectedDate.toLocaleDateString('ko-KR', {
                      month: '2-digit',
                      day: '2-digit',
                    })
                  : '날짜 전체'}
              </IconText>

              {isCalendarOpen && (
                <div className="absolute z-10 mt-2 sm:top-full sm:right-0">
                  <Calendar
                    value={selectedDate}
                    onCancel={() => setIsCalendarOpen(false)}
                    onConfirm={handleDateConfirm}
                  />
                </div>
              )}
            </div>
            <div ref={filterRef} className="relative">
              <IconText
                icon="filter"
                iconColor="var(--color-gray-800)"
                className="cursor-pointer px-2 hover:text-gray-800"
                onClick={() => setIsFilterOpen(prev => !prev)}>
                {selectedFilter}
              </IconText>

              {isFilterOpen && (
                <div className="absolute top-full right-0 z-10 mt-2">
                  <Dropdown
                    items={SORT_OPTIONS}
                    onChange={handleFilterSelect}
                    onOpenChange={setIsFilterOpen}
                    size="small"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <GroupCardList filters={filters} />
      <IconButton
        label="모임 만들기"
        className="fixed right-8 bottom-16 shadow-lg md:right-24 lg:right-32"
      />
    </div>
  );
}
