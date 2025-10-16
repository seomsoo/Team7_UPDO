import { tags, locations, TAG_OPTIONS } from '@/constants/tags';
import { tabs, types, TAB_OPTIONS } from '@/constants/tabs';

export type Tag = (typeof tags)[number];
export type Location = (typeof locations)[number];
export type Tab = (typeof tabs)[number];
export type Type = (typeof types)[number];

// 1. Tag <-> Location
export function TagtoLocation(tag: Tag): Location {
  const tagToLocationMap = Object.fromEntries(
    TAG_OPTIONS.filter(o => o.value !== 'default').map(o => [o.value, o.location]),
  ) as Record<Tag, Location>;

  return tagToLocationMap[tag];
}

export function LocationtoTag(location: Location): Tag {
  const locationToTagMap = Object.fromEntries(
    TAG_OPTIONS.filter(o => o.value !== 'default').map(o => [o.location, o.value]),
  ) as Record<Location, Tag>;

  return locationToTagMap[location];
}

// 2. Tab <-> Type
export function TabtoType(tab: Tab): Type {
  const tabToTypeMap = Object.fromEntries(TAB_OPTIONS.map(o => [o.value, o.type])) as Record<
    Tab,
    Type
  >;

  return tabToTypeMap[tab];
}

export function TypetoTab(type: Type): Tab {
  const typeToTabMap = Object.fromEntries(TAB_OPTIONS.map(o => [o.type, o.value])) as Record<
    Type,
    Tab
  >;

  return typeToTabMap[type];
}

// capacity: 5
// date: "2025-10-16T15:00:00.000Z"
// image: File {name: '제목 없음 2025년 9월 11일 (1).png', lastModified: 1757572515702, lastModifiedDate: Thu Sep 11 2025 15:35:15 GMT+0900 (한국 표준시), webkitRelativePath: '', size: 66313, …}
// location: "을지로3가"
// name: "1234"
// registrationEnd: "2025-10-23T15:00:00.000Z"
// type: "MINDFULNESS"
