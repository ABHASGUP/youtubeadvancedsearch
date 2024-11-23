import { create } from "zustand";

interface SearchState {
  searchQuery: string;
  duration: string;
  sortBy: string;
  uploadDate: string;
  videoQuality: string;
  contentRating: string;
  language: string;
  channelId: string;
  setSearchQuery: (query: string) => void;
  setDuration: (duration: string) => void;
  setSortBy: (sortBy: string) => void;
  setUploadDate: (date: string) => void;
  setVideoQuality: (quality: string) => void;
  setContentRating: (rating: string) => void;
  setLanguage: (lang: string) => void;
  setChannelId: (id: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  searchQuery: "",
  duration: "any",
  sortBy: "relevance",
  uploadDate: "any",
  videoQuality: "any",
  contentRating: "any",
  language: "any",
  channelId: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  setDuration: (duration) => set({ duration }),
  setSortBy: (sortBy) => set({ sortBy }),
  setUploadDate: (uploadDate) => set({ uploadDate }),
  setVideoQuality: (videoQuality) => set({ videoQuality }),
  setContentRating: (contentRating) => set({ contentRating }),
  setLanguage: (language) => set({ language }),
  setChannelId: (channelId) => set({ channelId }),
}));