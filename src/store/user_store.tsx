import { UserAuthResponseInterface } from "../models/user";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserStore {
  user: UserAuthResponseInterface | undefined;
}

interface Action {
  setUser: (user: UserAuthResponseInterface) => void;
  delUser: () => void;
}

export const useUserStore = create<UserStore & Action>()(
  persist(
    (set) => ({
      user: undefined,
      setUser: (user) => {
        set(() => ({ user }));
      },
      delUser: () => {
        set(() => ({ user: undefined }));
      },
    }),
    {
      name: "Todo_user",
      storage: createJSONStorage(() => localStorage),
      version: import.meta.env.VITE_APP_VERSION,
    }
  )
);
