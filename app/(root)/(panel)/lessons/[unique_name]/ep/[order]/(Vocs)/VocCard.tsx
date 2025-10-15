"use client";
import { Lesson, Vocs } from "@/app/types/User";
import { Trash2 } from "lucide-react";
import { useContext, useState } from "react";
import { LessonContext } from "../layout";
import { useRouter } from "next/navigation";
import Loader from "@/app/(global_components)/Loader";
import vocService from "@/app/api/services/vocService";

export default function VocCard({ voc, i }: { voc: Vocs; i: number }) {
  const is_even = i % 2 === 0;

  const { lesson, setLesson } = useContext(LessonContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function DeleteVoc() {
    try {
      setLoading(true);
      const res: any = await vocService.delete(lesson.id, voc.id);
      const resData: { deleted: boolean } = res;
      if (resData.deleted) {
        alert("Lug'atdan so'z muaffaqiyatli olib tashlandi olib tashlandi!");
        setLesson((prev: Lesson) => ({
          ...prev,
          vocabulary: prev.vocabulary.filter((vc) => vc.id !== voc.id),
        }));
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
    <>
      {error && (
        <p className="text-red-600 bg-red-50 rounded-xl px-4 py-2 text-center">
          {error}
        </p>
      )}
      <div
        className={`flex ${
          is_even && "bg-gray-200"
        } items-center justify-between`}
      >
        <p className="p-2">{i}</p>
        <p className="p-2 flex-1 border-r border-r-gray-400 truncate">
          {voc.word}
        </p>
        <p className="p-2 flex-1 truncate">{voc.translation}</p>
        <button
          className="p-2 text-red-500 cursor-pointer"
          disabled={loading}
          onClick={DeleteVoc}
        >
          {loading ? <Loader /> : <Trash2 />}
        </button>
      </div>
    </>
  );
}
