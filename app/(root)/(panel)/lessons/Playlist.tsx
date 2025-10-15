"use client";
import Loader from "@/app/(global_components)/Loader";
import PageMessage from "@/app/(global_components)/PageMessage";
import playlistService from "@/app/api/services/playlistsService";
import { setLoading, updateplaylists } from "@/app/store/slices/playlistSlice";
import { Playlist } from "@/app/types/User";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlaylistCard from "./PlaylistCard";

export default function Playlists() {
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const { playlists, is_loading } = useSelector(
    (state: any) => state.playlists
  );

  async function GetPlaylists() {
    try {
      if (playlists) {
        return;
      }
      const res: any = await playlistService.getAll();
      const res_playlists: Playlist[] = res;
      dispatch(updateplaylists(res_playlists));
    } catch (error: any) {
      if (error.response && error.response.data) {
        setError(
          error.response.data.message ||
            "An error occurred while validating the password."
        );
      }
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    GetPlaylists();
  }, []);

  console.log(playlists);

  return (
    <div>
      {is_loading ? (
        <div className="w-full py-10 flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div>
          {playlists && playlists.length > 0 ? (
            <div>
              <PlaylistCard
                playlists={playlists}
              />
            </div>
          ) : (
            <div className="py-20">
              <PageMessage
                title="Darslar hozircha yoq"
                message="Hozir dars yaratishni bosing va qoshilgan darslar shu yerda boladi"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
