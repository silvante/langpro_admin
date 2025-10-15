import { Playlist, Stats } from "@/app/types/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StatsSlice {
  stats: Stats | null;
  is_loading: Boolean;
}

const initialState: StatsSlice = {
  stats: null,
  is_loading: true,
};

const StatsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<Boolean>) => {
      state.is_loading = action.payload;
    },

    updateStats: (state, action: PayloadAction<Stats>) => {
      state.stats = action.payload;
      state.is_loading = false;
    },

    clearStats: (state) => {
      state.stats = null;
    },
  },
});

export const { updateStats, clearStats, setLoading } = StatsSlice.actions;
export default StatsSlice.reducer;
