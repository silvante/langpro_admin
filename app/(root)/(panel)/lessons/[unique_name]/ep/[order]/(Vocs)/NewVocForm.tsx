"use client";
import { useContext, useState } from "react";
import { LessonContext } from "../layout";
import vocService from "@/app/api/services/vocService";
import { Lesson, Vocs } from "@/app/types/User";

export default function NewVocForm() {
  const { lesson, setLesson } = useContext(LessonContext);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [word, setWord] = useState("");
  const [translation, settranslation] = useState("");

  async function CreateNewVoc(e: any) {
    e.preventDefault();
    try {
      const data = {
        word,
        translation,
      };
      const res: any = await vocService.create(lesson.id, data);
      const voc: Vocs = res;
      setWord("");
      settranslation("");
      setLesson((prev: Lesson) => ({
        ...prev,
        vocabulary: [...prev.vocabulary, voc],
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
  return (
    <form className="space-y-5" onSubmit={CreateNewVoc}>
      {error && (
        <p className="text-red-600 bg-red-50 rounded-xl px-4 py-2 text-center">
          {error}
        </p>
      )}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
        <div className="flex-1 flex flex-col gap-1">
          <label htmlFor="word">So'z</label>
          <input
            type="text"
            name="word"
            id="word"
            className="global_input"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            required
          />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <label htmlFor="translation">Tarjima</label>
          <input
            type="text"
            name="translation"
            id="translation"
            className="global_input"
            value={translation}
            onChange={(e) => settranslation(e.target.value)}
            required
          />
        </div>
      </div>
      <button type="submit" disabled={loading} className="basic_button w-full">
        {!loading ? "So'zni qo'shish" : "Qo'shilmoqda..."}
      </button>
    </form>
  );
}
