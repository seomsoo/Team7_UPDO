'use client';

import React from 'react';
import { cn } from '@/utils/cn';
import { MainCategory, TAB_OPTIONS } from '@/constants/tabs';

export interface CategoryItem {
  id: string;
  label: string;
  apiType: string;
}

export interface CategoryProps {
  mainCategory: MainCategory; // 대분류 (성장 | 네트워킹)
  activeId?: string; // 현재 선택된 중분류 (UI)
  activeType?: string; // 현재 선택된 중분류 (API)
  onChange: (id: string, apiType: string) => void;
  className?: string;
}

export default function Category({
  mainCategory,
  activeId,
  activeType,
  onChange,
  className,
}: CategoryProps) {
  const filteredCategories: CategoryItem[] = React.useMemo(() => {
    return TAB_OPTIONS.filter(opt => opt.title === mainCategory).map(opt => ({
      id: opt.subtitle || opt.value,
      label: opt.subtitle || opt.value,
      apiType: opt.type,
    }));
  }, [mainCategory]);

  if (filteredCategories.length === 0) return null;

  const currentId =
    activeId ||
    filteredCategories.find(c => c.apiType === activeType)?.id ||
    filteredCategories[0].id;

  return (
    <div
      className={cn('flex justify-start gap-[10px]', className)}
      role="tablist"
      aria-label={`${mainCategory} 카테고리`}>
      {filteredCategories.map(category => {
        const isActive = category.id === currentId;
        return (
          <button
            key={category.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(category.id, category.apiType)}
            className={cn(
              'typo-sm flex cursor-pointer items-center justify-center rounded-[16px] px-4 py-2 select-none hover:opacity-90',
              'md:typo-body lg:typo-body text-white transition-all duration-200',
              isActive
                ? 'typo-sm-bold md:typo-body-bold lg:typo-body-bold bg-[var(--color-purple-500)]'
                : 'bg-[var(--color-gray-50)]',
            )}>
            {category.label}
          </button>
        );
      })}
    </div>
  );
}
