import { tags, locations, TAG_OPTIONS, SORT_OPTIONS } from '@/constants/tags';
import { tabs, types, TAB_OPTIONS } from '@/constants/tabs';
import { formatDateToLocalISO } from './date';

export type FilterState = {
  main: '성장' | '네트워킹';
  subType?: string;
  location?: string;
  date?: string;
  sortBy?: 'dateTime' | 'registrationEnd' | 'participantCount';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
};
export type Tag = (typeof tags)[number];
export type Location = (typeof locations)[number];
export type Tab = (typeof tabs)[number];
export type Type = (typeof types)[number];

// 1. Tag <-> Location
export function TagToLocation(tag: Tag): Location {
  const tagToLocationMap = Object.fromEntries(
    TAG_OPTIONS.filter(o => o.value !== 'default').map(o => [o.value, o.location]),
  ) as Record<Tag, Location>;

  return tagToLocationMap[tag];
}

export function LocationToTag(location: Location): Tag {
  const locationToTagMap = Object.fromEntries(
    TAG_OPTIONS.filter(o => o.value !== 'default').map(o => [o.location, o.value]),
  ) as Record<Location, Tag>;

  return locationToTagMap[location];
}

// 2. Tab <-> Type
export function TabToType(tab: Tab): Type {
  const tabToTypeMap = Object.fromEntries(TAB_OPTIONS.map(o => [o.value, o.type])) as Record<
    Tab,
    Type
  >;

  return tabToTypeMap[tab];
}

export function TypeToTab(type: Type): Tab {
  const typeToTabMap = Object.fromEntries(TAB_OPTIONS.map(o => [o.type, o.value])) as Record<
    Type,
    Tab
  >;

  return typeToTabMap[type];
}

export const tagLabelToLocation = (label: string) =>
  TAG_OPTIONS.find(t => t.label === label)?.location;

// 정렬 라벨 → sortBy, sortOrder
export const sortLabelToParams = (
  label: string,
): { sortBy?: 'dateTime' | 'registrationEnd' | 'participantCount'; sortOrder?: 'asc' | 'desc' } => {
  const found = SORT_OPTIONS.find(o => o.label === label);
  if (!found) return {};
  switch (found.value) {
    case 'participantCount':
      return { sortBy: 'participantCount', sortOrder: 'desc' };
    case 'registrationEnd':
      return { sortBy: 'registrationEnd', sortOrder: 'asc' };
    default:
      return {};
  }
};

export function buildFilters({
  activeMain,
  activeSubType,
  selectedTag,
  selectedDate,
  selectedFilter,
  limit = 10,
}: {
  activeMain: '성장' | '네트워킹';
  activeSubType?: string;
  selectedTag: string;
  selectedDate?: Date;
  selectedFilter: string;
  limit?: number;
}): FilterState {
  const location = selectedTag === '태그 전체' ? undefined : tagLabelToLocation(selectedTag);
  const { sortBy, sortOrder } = sortLabelToParams(selectedFilter);
  let subType: string | undefined = activeSubType;
  if (activeMain === '네트워킹') {
    subType = 'WORKATION';
  }
  return {
    main: activeMain,
    subType,
    location,
    date: selectedDate ? formatDateToLocalISO(selectedDate).slice(0, 10) : undefined,
    sortBy,
    sortOrder,
    limit,
  };
}
export function toGetGatheringsParams(
  filters: FilterState,
): Record<string, string | number | boolean> {
  return Object.fromEntries(
    Object.entries({
      type: filters.subType,
      location: filters.location,
      date: filters.date,
      sortBy: filters.sortBy,
      sortOrder: filters.sortOrder,
      limit: filters.limit,
    }).filter(([, value]) => value !== undefined && value !== null),
  ) as Record<string, string | number | boolean>;
}
