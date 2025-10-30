'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { FilterState, toGetGatheringsParams } from '@/utils/mapping';
import GroupCard from '../group/GroupCard';
import { motion } from 'framer-motion';
import GroupCardSkeleton from '@/components/ui/Skeleton/GroupCardSkeleton';
import { useFavoriteStore } from '@/stores/useFavoriteStore';
import { useUserStore } from '@/stores/useUserStore';
import { getFavoriteList } from '@/services/gatherings/anonGatheringService';
import { IGathering } from '@/types/gatherings';

interface GroupCardListProps {
  filters: FilterState;
}

export default function FavoriteCardList({ filters }: GroupCardListProps) {
  const userId = useUserStore(state => state.user?.id ?? null);
  const favoriteIds = useFavoriteStore(state => state.getFavorites());
  const hasFavorites = favoriteIds.length > 0;

  const queryParams = useMemo(() => {
    if (!hasFavorites) return null;
    const baseParams = toGetGatheringsParams(filters);
    const { limit, ...rest } = baseParams;

    return {
      ...rest,
      id: favoriteIds,
      limit: filters.limit ?? limit ?? favoriteIds.length,
    } as Parameters<typeof getFavoriteList>[0];
  }, [favoriteIds, filters, hasFavorites]);

  const {
    data = [],
    isLoading,
    isError,
    refetch,
  } = useQuery<IGathering[]>({
    queryKey: ['favoriteGatherings', userId, queryParams],
    queryFn: () => getFavoriteList(queryParams!),
    enabled: !!queryParams,
  });

  const filteredGatherings = useMemo(() => {
    if (data.length === 0) return [];

    if (filters.main === '성장' && (!filters.subType || filters.subType === 'DALLAEMFIT')) {
      return data.filter(item => item.type !== 'WORKATION');
    }

    return data;
  }, [data, filters]);

  if (isLoading && data.length === 0)
    return (
      <div className="mx-auto mb-8 flex flex-col items-center gap-6 md:grid md:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <GroupCardSkeleton key={i} />
        ))}
      </div>
    );

  if (isError)
    return (
      <div className="flex h-[300px] flex-col items-center justify-center text-gray-500">
        데이터를 불러오는 중 오류가 발생했습니다.
        <button
          onClick={() => refetch()}
          className="mt-2 rounded-md bg-purple-500 px-4 py-2 text-white hover:bg-purple-600">
          다시 시도
        </button>
      </div>
    );

  return (
    <>
      {filteredGatherings.length === 0 ? (
        <span className="mt-16 flex flex-col items-center text-gray-400">
          <Image
            src="/images/empty.png"
            alt="emptyImage"
            style={{ width: 'auto', height: 'auto' }}
            width={180}
            height={100}
          />
          현재 찜한 모임이 없습니다.
        </span>
      ) : (
        <div className="mx-auto mb-8 flex flex-col gap-6 md:grid md:grid-cols-2">
          {filteredGatherings.map(item => (
            <motion.div
              key={item.id}
              className="h-full w-full"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ type: 'tween', ease: 'easeOut', duration: 0.4 }}>
              <GroupCard data={item} />
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
}
