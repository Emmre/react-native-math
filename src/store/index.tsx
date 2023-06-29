import { create } from "zustand";

type BearStoreSettings = {
  sound: boolean;
  vibration: boolean;
};

type BearStore = {
  settings: BearStoreSettings;
  setSettings: any;
};

export const useBearStore = create<BearStore>((set) => ({
  settings: {
    sound: true,
    vibration: true,
  },
  setSettings: (settings: any) => set({ settings }),
}));
