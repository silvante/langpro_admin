"use client";

import { CreateLessonData } from "@/app/api/services/utils/lessonsTypes";
import { Lesson, Playlist } from "@/app/types/User";
import { MailWarning, Youtube } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useContext } from "react";
import { GlobalContext } from "../layout";
import lessonService from "@/app/api/services/lessonService";

export default function NewLessonForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { playlist, setPlaylist } = useContext(GlobalContext);
  const playlistTyped: Playlist = playlist;
  const epNumber = playlistTyped.lessons.length + 1;
  const router = useRouter()

  const [youtubeVideo, setYoutubeVideo] = useState("");

  const [video_url, setVideoUrl] = useState<null | string>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function SetYoutube() {
    const ID = youtubeVideo.split("https://youtu.be/")[1];
    const url = "https://www.youtube.com/embed";
    const iFrameURL = `${url}/${ID}`;
    setVideoUrl(iFrameURL);
  }

  const validateForm = () => {
    if (!title || title.length < 10 || title.length > 140) {
      setError("Sarlavha 10 dan 140 ta belgigacha bo‘lishi kerak.");
      return false;
    }
    if (!description || description.length < 50 || description.length > 270) {
      setError("Tavsif 50 dan 270 ta belgigacha bo‘lishi kerak.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    if (!video_url) {
      return setError(
        "Iltimos YouTube video ni ulashish bolimidagi video linkini kiriting"
      );
    }

    const data: CreateLessonData = { title, description, video_url };

    try {
      setLoading(true);
      const res: any = await lessonService.create(playlist.unique_name, data);
      const res_lesson: Lesson = res;

      setPlaylist((prev: Playlist) => ({
        ...prev,
        lessons: [...prev.lessons, res_lesson],
      }));
      router.push(`/lessons/${playlist.unique_name}`);
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Xatolik yuz berdi. Iltimos, qaytadan urinib ko‘ring.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Title */}
      <div className="space-y-3">
        <label
          className=" font-medium text-gray-900 flex items-center gap-2"
          htmlFor="video_url"
        >
          <MailWarning /> Seriya raqami tartibli ekanligiga etibor bering*
        </label>
        <h2 className="text-xl font-semibold">
          Seriya raqami <span className="base_text">#{epNumber}</span>
        </h2>
      </div>
      <label className=" font-medium text-gray-900" htmlFor="video_url">
        YouTube video url*
      </label>
      <div className="flex gap-2 global_input items-center justify-between">
        <Youtube />
        <input
          type="text"
          value={youtubeVideo}
          onChange={(e) => setYoutubeVideo(e.target.value)}
          required
          maxLength={1000}
          id="video_url"
          autoFocus
          className="outline-none flex-1"
          placeholder="Video url"
        />
        <button type="button" className="basic_button" onClick={SetYoutube}>
          Check
        </button>
      </div>
      <p className="text-gray-600">
        YouTube platformasidan video darslikni tanlang va{" "}
        <span className="text-gray-900 font-semibold">"Ulashish"</span>{" "}
        tugmasini bosing va Link ni kochirib olib yuqoridagi maydonga kiriting!
      </p>
      <div className="w-full aspect-video rounded-xl bg-gray-300 flex items-center justify-center overflow-hidden">
        {video_url ? (
          <iframe
            width="560"
            height="315"
            src={video_url}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="w-full h-full"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="flex items-center justify-center flex-col text-center p-20 text-gray-400">
            <Youtube size={80} />
          </div>
        )}
      </div>
      {/* Title */}
      <div className="flex flex-col gap-2">
        <label className=" font-medium text-gray-900">Seriya nomi*</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          maxLength={140}
          minLength={10}
          autoFocus
          className="global_input"
          placeholder="Masalan: Frontend asoslari"
        />
        <p className="text-gray-500">10–140 ta belgi ishlatish mumkin</p>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2">
        <label className=" font-medium text-gray-900">Seriya haqida*</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          minLength={50}
          maxLength={270}
          className="global_input resize-none h-28"
          placeholder="Playlist tavsifi..."
        />
        <p className="text-gray-500">50–270 ta belgi ishlatish mumkin</p>
      </div>

      <label className="font-medium text-gray-900 flex">Saqlang*</label>

      {/* Error */}
      {error && (
        <p className="text-red-600 bg-red-50 rounded-xl px-4 py-2 text-center">
          {error}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="basic_button w-full disabled:opacity-70 disabled:cursor-not-allowed"
        disabled={loading}
      >
        {loading ? "Yaratilmoqda..." : "Seriyani yaratish"}
      </button>
    </form>
  );
}
