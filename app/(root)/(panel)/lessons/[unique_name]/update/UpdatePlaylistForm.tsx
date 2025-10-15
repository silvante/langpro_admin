"use client";

import playlistService from "@/app/api/services/playlistsService";
import {
  replacePlaylist,
} from "@/app/store/slices/playlistSlice";
import { Playlist } from "@/app/types/User";
import { useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { GlobalContext } from "../layout";

export default function UpdatePlaylistForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { playlist, setPlaylist } = useContext(GlobalContext);

  // form data
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(playlist.thumbnail);
  const [title, setTitle] = useState(playlist.title);
  const [description, setDescription] = useState(playlist.description);

  // Clean up preview URL on unmount
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setThumbnail(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setThumbnail(file);
      setPreview(URL.createObjectURL(file));
    }
  };

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

    const data: any = {
      title,
      description,
      ...(thumbnail && { thumbnail }),
    };
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    if (thumbnail) {
      formData.append("thumbnail", data.thumbnail);
    }

    try {
      setLoading(true);
      const res: any = await playlistService.update(
        playlist.unique_name,
        formData
      );
      const res_playlist: Playlist = res;
      dispatch(replacePlaylist(res_playlist));
      setPlaylist(res_playlist);
      router.push(`/lessons/${res_playlist.unique_name}`);
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
      <div className="flex flex-col gap-2">
        <label className=" font-medium text-gray-900">Dars nomi*</label>
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
        <label className=" font-medium text-gray-900">Darslar haqida*</label>
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

      {/* Thumbnail Upload */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-gray-300 rounded-xl space-y-2 p-6 flex flex-col items-center justify-center cursor-pointer hover:border-[#26a269] transition"
      >
        <label className=" font-medium text-gray-900">
          Dars sarlavha rasmi*
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="thumbnail"
        />
        <label
          htmlFor="thumbnail"
          className="flex flex-col items-center gap-3 text-center w-full"
        >
          {preview ? (
            <img
              src={preview}
              alt="Thumbnail preview"
              className="w-full aspect-video object-cover rounded-xl"
            />
          ) : (
            <>
              <span className="text-gray-500">
                Drag & Drop yoki{" "}
                <span className="text-blue-500 underline">Browse</span>
              </span>
            </>
          )}
        </label>
        <p className="text-gray-500">Rasm 16:9 formatida bo‘lishi kerak</p>
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
        {loading ? "Tahrirlanmoqda..." : "Playlistni tahrirlash"}
      </button>
    </form>
  );
}
