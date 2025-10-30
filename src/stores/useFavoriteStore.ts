import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useUserStore } from '@/stores/useUserStore';

interface FavoriteState {
  favorites: Record<string, number[]>;
  toggleFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  getFavorites: () => number[];
}

const getCurrentUserKey = () => {
  const user = useUserStore.getState().user;
  return user?.id?.toString() || 'guest';
};

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: {},

      toggleFavorite: (id: number) => {
        const key = getCurrentUserKey();

        set(state => {
          const currentFavorites = state.favorites[key] || [];
          const updatedFavorites = currentFavorites.includes(id)
            ? currentFavorites.filter(favId => favId !== id)
            : [...currentFavorites, id];

          return {
            favorites: {
              ...state.favorites,
              [key]: updatedFavorites,
            },
          };
        });
      },

      // 찜하기 강제 해제
      removeFavorite: (id: number) => {
        const key = getCurrentUserKey();

        set(state => {
          const currentFavorites = state.favorites[key] || [];

          // 이미 찜한 상태가 아니면 아무것도 안 함
          if (!currentFavorites.includes(id)) {
            return state;
          }

          return {
            favorites: {
              ...state.favorites,
              [key]: currentFavorites.filter(favId => favId !== id),
            },
          };
        });
      },

      isFavorite: (id: number) => {
        const key = getCurrentUserKey();
        const currentFavorites = get().favorites[key] || [];
        return currentFavorites.includes(id);
      },

      getFavorites: () => {
        const key = getCurrentUserKey();
        return get().favorites[key] || [];
      },
    }),
    {
      name: 'favorites',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
