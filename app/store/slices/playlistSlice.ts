import { Playlist } from "@/app/types/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlaylistSlice {
  playlists: Playlist[] | null;
  is_loading: Boolean;
}

const initialState: PlaylistSlice = {
  playlists: null,
  is_loading: true,
};

const PlaylistSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<Boolean>) => {
      state.is_loading = action.payload;
    },

    updateplaylists: (state, action: PayloadAction<Playlist[]>) => {
      state.playlists = action.payload;
      state.is_loading = false;
    },

    pushPlaylist: (state, action: PayloadAction<Playlist>) => {
      if (state.playlists) {
        state.playlists.push(action.payload);
      } else {
        state.playlists = [action.payload];
      }
      state.is_loading = false;
    },

    replacePlaylist: (state, action: PayloadAction<Playlist>) => {
      if (state.playlists) {
        const index = state.playlists.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1 && index !== undefined) {
          state.playlists[index] = action.payload;
        }
      }
    },

    deletePlaylist: (state, action: PayloadAction<Playlist>) => {
      if (state.playlists) {
        const index = state.playlists.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1 && index !== undefined) {
          state.playlists.splice(index, 1);
        }
      }
    },

    clearplaylists: (state) => {
      state.playlists = null;
    },
  },
});

export const {
  updateplaylists,
  clearplaylists,
  setLoading,
  pushPlaylist,
  replacePlaylist,
  deletePlaylist,
} = PlaylistSlice.actions;
export default PlaylistSlice.reducer;
