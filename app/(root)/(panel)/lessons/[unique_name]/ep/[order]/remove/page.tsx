"use client";
import Heading from "@/app/(global_components)/Heading";
import { useContext, useState } from "react";
import { LessonContext } from "../layout";
import Link from "next/link";
import lessonService from "@/app/api/services/lessonService";
import { GlobalContext } from "../../../layout";
import { Playlist } from "@/app/types/User";
import { useRouter } from "next/navigation";

export default function DeleteLessonPage() {
  const { lesson, current_link } = useContext(LessonContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const { playlist, setPlaylist } = useContext(GlobalContext);

  async function DeleteLesson() {
    try {
      setLoading(true);
      const res: any = await lessonService.delete(
        playlist.unique_name,
        lesson.id
      );
      const resData: { deleted: boolean } = res;
      if (resData.deleted) {
        alert("Seriya muaffaqiyatli olib tashlandi!");
        setPlaylist((prev: Playlist) => ({
          ...prev,
          lessons: prev.lessons.filter((ls) => ls.id !== lesson.id),
        }));
        router.push(`/lessons/${playlist.unique_name}`);
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
      <Heading>Ishonchingiz komilmi?</Heading>
      <p className="text_color">
        Ushbu seriyani o'chirish darslar tartibini{" "}
        <span className="text-gray-900 font-semibold">buzulishiga</span> va
        boshqa darslarni oz joyidan siljishiga olib kelishi mumkin, agar
        inshonchingiz komil bolmasa darslarni shunchaki tahrirlash mumkin.
      </p>
      {/* Error */}
      {error && (
        <p className="text-red-600 bg-red-50 rounded-xl px-4 py-2 text-center">
          {error}
        </p>
      )}
      <div className="flex items-center gap-3">
        <Link href={current_link} className="basic_button2">
          Bekor qilish
        </Link>
        <button onClick={DeleteLesson} className="basic_button">
          {loading ? "O'chirilmoqda..." : "O'chirish"}
        </button>
      </div>
    </div>
  );
}
