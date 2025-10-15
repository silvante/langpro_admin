import Heading from "@/app/(global_components)/Heading";
import Loader from "@/app/(global_components)/Loader";
import playlistService from "@/app/api/services/playlistsService";
import { setLoading, updateplaylists } from "@/app/store/slices/playlistSlice";
import { Courses, Playlist, User } from "@/app/types/User";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlaylistCards from "./playlistCard";
import CourseCard from "./CourseCard";
import PageMessage from "@/app/(global_components)/PageMessage";

export default function AddToCourse({ user }: { user: User }) {
  const [error, setError] = useState<string | null>(null);
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

  if (is_loading) {
    return (
      <div className="py-10 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const PLids = user.courses.map((cs: Courses) => cs.playlist.id);
  function IsIncluded(id: string) {
    if (PLids.includes(id)) {
      return false;
    } else {
      return true;
    }
  }
  const avaible_playlists = playlists.filter((pl: Playlist) =>
    IsIncluded(pl.id)
  );

  return (
    <div>
      {error && (
        <p className="text-red-600 bg-red-50 rounded-xl px-4 py-2 text-center">
          {error}
        </p>
      )}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow p-5 space-y-5">
        <h2 className="text-xl font-semibold text_color">
          Qoshish Mumkun bolgan darslar
        </h2>
        <div className="flex flex-wrap gap-5 w-full">
          {avaible_playlists && avaible_playlists.length > 0 ? (
            <>
              {avaible_playlists.map((pl: Playlist) => {
                return <PlaylistCards user={user} playlist={pl} key={pl.id} />;
              })}
            </>
          ) : (
            <div className="flex items-center justify-center py-10 w-full">
              <PageMessage
                title="Darslar qolmadi"
                message="Sizda qoshish mumkun bolgan darslar yoq"
              />
            </div>
          )}
        </div>
        <h2 className="text-xl font-semibold text_color">Mavjut darslar</h2>
        <div className="flex flex-wrap gap-5 w-full">
          {user.courses && user.courses.length > 0 ? (
            <>
              {user.courses.map((cs: Courses) => {
                return <CourseCard course={cs} key={cs.id + 3298} />;
              })}
            </>
          ) : (
            <div className="flex items-center justify-center py-10 w-full">
              <PageMessage
                title="Foidalanuvchida darslar yo'q"
                message="Hozir qoshishingiz mumkin"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
