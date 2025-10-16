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
