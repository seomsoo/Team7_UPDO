import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getJoinedGatherings,
  getParticipants,
  joinGathering,
  leaveGathering,
} from '@/services/gatherings/gatheringService';
import { useAuthStore } from '@/stores/useAuthStore';
import { useUserStore } from '@/stores/useUserStore';
import { IGathering } from '@/types/gatherings';

export function useGatheringQuery(gatheringId?: number) {
  const { isAuthenticated } = useAuthStore();
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const joinedQuery = useQuery({
    queryKey: ['joinedGatherings', user?.id],
    queryFn: () => getJoinedGatherings(),
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  const isJoined = joinedQuery.data?.some(g => g.id === gatheringId) ?? false;

  const participantsQuery = useQuery({
    queryKey: ['gatheringParticipants', gatheringId],
    queryFn: () => getParticipants(gatheringId!),
    enabled: !!gatheringId,
    staleTime: 1000 * 30,
  });

  // 참여자 수
  const participantCount = participantsQuery.data?.length ?? 0;

  // 참여
  const joinMutation = useMutation({
    mutationFn: (id: number) => joinGathering(id),
    onMutate: async id => {
      await queryClient.cancelQueries({ queryKey: ['joinedGatherings', user?.id] });
      const prev = queryClient.getQueryData<IGathering[]>(['joinedGatherings', user?.id]) || [];
      queryClient.setQueryData(['joinedGatherings', user?.id], [...prev, { id }]);
      return { prev };
    },
    onError: (_, __, context) => {
      if (context?.prev) queryClient.setQueryData(['joinedGatherings', user?.id], context.prev);
    },
    onSettled: (_, __, id) => {
      queryClient.invalidateQueries({ queryKey: ['joinedGatherings', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['gatheringParticipants', id] });
    },
  });

  //  참여 취소
  const leaveMutation = useMutation({
    mutationFn: (id: number) => leaveGathering(id),
    onMutate: async id => {
      await queryClient.cancelQueries({ queryKey: ['joinedGatherings', user?.id] });
      const prev = queryClient.getQueryData<IGathering[]>(['joinedGatherings', user?.id]) || [];
      queryClient.setQueryData(
        ['joinedGatherings', user?.id],
        prev.filter(g => g.id !== id),
      );
      return { prev };
    },
    onError: (_, __, context) => {
      if (context?.prev) queryClient.setQueryData(['joinedGatherings', user?.id], context.prev);
    },
    onSettled: (_, __, id) => {
      queryClient.invalidateQueries({ queryKey: ['joinedGatherings', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['gatheringParticipants', id] });
    },
  });

  const handleJoinClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!isAuthenticated) {
      setModalOpen(true);
      return;
    }

    setLoading(true);
    try {
      if (isJoined) {
        await leaveMutation.mutateAsync(gatheringId!);
      } else {
        await joinMutation.mutateAsync(gatheringId!);
      }
    } catch (error) {
      console.error('참여 상태 변경 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    modalOpen,
    setModalOpen,

    joinedQuery,
    participantsQuery,
    participantCount,
    isJoined,

    joinMutation,
    leaveMutation,

    handleJoinClick,
  };
}
