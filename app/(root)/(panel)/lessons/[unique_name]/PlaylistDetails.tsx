import { Playlist } from "@/app/types/User";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";

export default function PlaylistDetails({ playlist }: { playlist: Playlist }) {
  return (
    <div className="max-w-full md:max-w-sm w-full rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm hover:shadow-lg transition p-4 space-y-3">
      {/* Thumbnail */}
      <Link
        href={`/lessons/${playlist.unique_name}`}
        className="w-full aspect-video bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden relative flex"
      >
        <img
          src={playlist.thumbnail}
          alt={playlist.title}
          className="w-full h-full object-cover transition-transform duration-300"
        />
      </Link>

      {/* Content */}
      <div className="space-y-2">
        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
          {playlist.title}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {playlist.description}
        </p>
        <span className="block text-xs text-gray-500 dark:text-gray-400">
          {new Date(playlist.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2 flex-wrap">
        <Link
          href={`/lessons/${playlist.unique_name}/update`}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 transition"
        >
          <Edit className="w-4 h-4" /> Tahrirlash
        </Link>

        <Link
          href={`/lessons/${playlist.unique_name}/remove`}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 hover:text-red-700 transition"
        >
          <Trash2 className="w-4 h-4" /> Olib tashlash
        </Link>
      </div>
    </div>
  );
}
