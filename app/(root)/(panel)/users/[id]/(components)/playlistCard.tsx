"use client";
import Loader from "@/app/(global_components)/Loader";
import playlistService from "@/app/api/services/playlistsService";
import { Courses, Playlist, User } from "@/app/types/User";
import { Plus } from "lucide-react";
import { useContext, useState } from "react";
import { UserContext } from "../page";

export default function PlaylistCards({
  playlist,
  user,
}: {
  playlist: Playlist;
  user: User;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { setUser } = useContext(UserContext);

  async function addUserToCourse() {
    try {
      setLoading(true);
      const res: any = await playlistService.addNewUser(
        playlist.unique_name,
        user.id
      );
      const course: Courses = res;
      setUser((prev: User) => ({
        ...prev,
        courses: [...prev.courses, course],
      }));
    } catch (error: any) {
      if (error.response && error.response.data) {
        setError(
          error.response.data.message ||
            "An error occurred while validating the password."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex gap-4 p-4 rounded-xl items-center justify-center border border-gray-300 shadow-md">
      <div className="max-w-64 w-full">
        <p className="w-full truncate text-lg text_color font-semibold">
          {playlist.title}
        </p>
        <p className="w-full truncate text_color">{playlist.description}</p>
      </div>
      <div>
        <button
          className={`${loading ? "basic_button2" : "basic_button"}`}
          onClick={addUserToCourse}
        >
          {loading ? <Loader /> : <Plus />}
        </button>
      </div>
    </div>
  );
}
