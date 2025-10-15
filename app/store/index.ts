import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./slices/adminSlice";
import PlaylistSlice from "./slices/playlistSlice";
import StatsSlice from "./slices/statsSlice";

const store = configureStore({
  reducer: {
    admin: adminSlice,
    playlists: PlaylistSlice,
    stats: StatsSlice,
  },
});

export default store;
