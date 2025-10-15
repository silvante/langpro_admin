"use client";
import NewVocForm from "./NewVocForm";
import { useContext, useEffect, useState } from "react";
import { LessonContext } from "../layout";
import Loader from "@/app/(global_components)/Loader";
import vocService from "@/app/api/services/vocService";
import { Lesson, Vocs } from "@/app/types/User";
import PageMessage from "@/app/(global_components)/PageMessage";
import VocCard from "./VocCard";

export default function VocManager() {
  const { lesson, setLesson } = useContext(LessonContext);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function GetVocs() {
    try {
      setLoading(true);
      const res: any = await vocService.getAll(lesson.id);
      const vocs: Vocs = res;
      setLesson((prev: Lesson) => ({
        ...prev,
        vocabulary: vocs,
      }));
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

  useEffect(() => {
    GetVocs();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-red-600 bg-red-50 rounded-xl px-4 py-2 text-center">
        {error}
      </p>
    );
  }
  return (
    <>
      <div className="border-y border-gray-300 py-5 space-y-5">
        <p className="text-xl text-gray-800 font-semibold">Lugat</p>
        <NewVocForm />
      </div>
      {lesson.vocabulary && lesson.vocabulary.length > 0 ? (
        <div className="w-full pb-10">
          {lesson.vocabulary.map((vc: Vocs, i: number) => (
            <VocCard voc={vc} i={i + 1} key={vc.id} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center pb-20">
          <PageMessage
            title="Lugatda so'zlar yo'q"
            message="Hoziroq so'z yaratishingiz mumkin"
          />
        </div>
      )}
    </>
  );
}
