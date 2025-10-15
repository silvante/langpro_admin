"use client";
import Heading from "@/app/(global_components)/Heading";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../layout";
import playlistService from "@/app/api/services/playlistsService";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { deletePlaylist } from "@/app/store/slices/playlistSlice";

export default function PlaylistRemovePage() {
  const [uniqueName, setUniqueName] = useState("");
  const [doesMatch, setDoesMatch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const { playlist } = useContext(GlobalContext);

  useEffect(() => {
    if (uniqueName === playlist.unique_name) {
      setDoesMatch(true);
    } else {
      setDoesMatch(false);
    }
  }, [uniqueName]);

  async function DeletePlaylist(e: any) {
    e.preventDefault();
    try {
      setLoading(true);
      const res: any = await playlistService.delete(playlist.unique_name);
      const resData: { deleted: boolean } = res;
      if (resData.deleted) {
        alert("Darslar toplami olib tashlandi!");
        dispatch(deletePlaylist(playlist));
        router.push("/lessons");
      }
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Xatolik yuz berdi. Iltimos, qaytadan urinib ko‘ring.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-5">
      <Heading>Olib tashlash</Heading>
      <form className="space-y-4" onSubmit={DeletePlaylist}>
        <p className="text_color">
          Ushbu darslar toplamini ochirib yuborish uchun siz uni takrorlanmas
          nomini pastdagi matn maydoniga kirgizishingiz kerak boladi.{" "}
          <span className="text-gray-950 font-semibold">
            "{playlist.title}"
          </span>
          ning takrorlanmas nomi{" "}
          <span className="text-gray-950 font-semibold">
            "{playlist.unique_name}"
          </span>
        </p>
        <div className="flex flex-col gap-2 justify-center">
          <label htmlFor="unique_name" className="font-medium text-gray-900">
            Takrorlanmas nomi*
          </label>
          <input
            type="text"
            name="unique_name"
            value={uniqueName}
            onChange={(e) => setUniqueName(e.target.value)}
            id="unique_name"
            className="global_input"
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-600 bg-red-50 rounded-xl px-4 py-2 text-center">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-2 justify-center items-start">
          <label htmlFor="unique_name" className="font-medium text-gray-900">
            tasdiqlang*
          </label>
          <button
            type="submit"
            className={`basic_button ${doesMatch ? "" : "opacity-50"}`}
            disabled={!doesMatch}
          >
            {loading ? "O'chirilmoqda..." : "O'chirish"}
          </button>
        </div>
      </form>
    </div>
  );
}
