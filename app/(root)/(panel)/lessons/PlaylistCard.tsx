// PlaylistCard.tsx
import { Playlist } from "@/app/types/User";
import Link from "next/link";
import React from "react";

type Props = {
  playlists: Playlist[];
};

export default function PlaylistCard({ playlists }: Props) {
  return (
    <div className="space-y-4">
      {playlists.map((p) => (
        <div
          key={p.id}
          className="flex flex-col sm:flex-row gap-4 items-start bg-white dark:bg-slate-800 shadow-md rounded-2xl p-4 hover:shadow-lg transition border border-gray-300"
        >
          {/* Thumbnail */}
          <Link
            href={`/lessons/${p.unique_name}`}
            className="h-auto w-full sm:w-auto sm:h-34 aspect-video flex-shrink-0 overflow-hidden rounded-lg bg-gray-100"
          >
            <img
              src={p.thumbnail}
              alt={p.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "/images/placeholder-16x9.png";
              }}
            />
          </Link>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
                  {p.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  @{p.unique_name}
                </p>
              </div>
              <Link
                href={`/lessons/${p.unique_name}`}
                className="px-3 py-1.5 rounded-lg bg-[#26a269] text-white text-sm font-medium hover:bg-[#1f8a57] transition"
              >
                Open
              </Link>
            </div>

            {/* Description */}
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
              {p.description}
            </p>

            {/* Footer */}
            <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
              <span>
                {new Date(p.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>

              <div className="flex gap-2">
                <Link
                  href={`/lessons/${p.unique_name}/update`}
                  className="px-2 py-1 rounded-md border border-gray-200 text-gray-700 text-xs hover:bg-gray-50 transition"
                >
                  Edit
                </Link>
                <Link
                  href={`/lessons/${p.unique_name}/delete`}
                  className="px-2 py-1 rounded-md border border-red-200 text-red-600 text-xs hover:bg-red-50 transition"
                >
                  Delete
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
