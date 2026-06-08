import { create } from "zustand";
import { persist } from "zustand/middleware";

type WishlistState = {
  favorites: string[];
  viewed: string[];
  toggle: (slug: string) => void;
  isFavorite: (slug: string) => boolean;
  trackView: (slug: string) => void;
  clear: () => void;
};

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      favorites: [],
      viewed: [],
      toggle: (slug) =>
        set((s) => ({
          favorites: s.favorites.includes(slug)
            ? s.favorites.filter((x) => x !== slug)
            : [slug, ...s.favorites],
        })),
      isFavorite: (slug) => get().favorites.includes(slug),
      trackView: (slug) =>
        set((s) => ({
          viewed: [slug, ...s.viewed.filter((x) => x !== slug)].slice(0, 12),
        })),
      clear: () => set({ favorites: [], viewed: [] }),
    }),
    { name: "scorsatto-wishlist" },
  ),
);
