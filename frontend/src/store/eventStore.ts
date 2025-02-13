import { create } from "zustand";
import { fetchEvents } from "../services/events";
import { SportsEvent } from "../utils/types";

interface EventState {
  events: SportsEvent[];
  loading: boolean;
  error: string | null;
  loadEvents: () => Promise<void>;
}

export const useEventStore = create<EventState>((set) => ({
  events: [],
  loading: false,
  error: null,

  /**
   * Fetch Events and Update Store
   */
  loadEvents: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchEvents();
      set({ events: data, loading: false });
    } catch (error: any) {
      set({ error: error, loading: false });
    }
  },
}));