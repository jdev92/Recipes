import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type UserStore = {
  username: string;
  setUsername: (name: string) => void;
  clearUsername: () => void;
  favorites: string[];
  addToFavorites: (recipeId: string) => void;
};

export const userStore = create<UserStore>()(
  persist(
    (set) => ({
      username: "",
      setUsername: (name) => {
        set((state) => ({
          ...state,
          username: name,
        }));
      },
      clearUsername: () => {
        set((state) => ({
          ...state,
          username: "",
        }));
      },
      favorites: [],
      addToFavorites: (recipeId) => {
        set((state) => ({
          ...state,
          favorites: [...state.favorites, recipeId],
        }));
      },
    }),
    { name: "user-storage", storage: createJSONStorage(() => AsyncStorage) }
  )
);
