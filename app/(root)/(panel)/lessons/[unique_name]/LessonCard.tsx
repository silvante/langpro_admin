import { Lesson } from "@/app/types/User";
import { PlayCircle } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";
import { GlobalContext } from "./layout";

export default function LessonCard({ lesson }: { lesson: Lesson }) {
  const { playlist } = useContext(GlobalContext);
  return (
    <Link
      href={`/lessons/${playlist.unique_name}/ep/${lesson.order}`}
      className="bg-white rounded-2xl shadow-md overflow-hidden flex-shrink-0 w-full border-gray-300 border p-3 flex justify-between items-center"
    >
      <div className="flex gap-2 items-center">
        <PlayCircle />{" "}
        <h2 className="text_color font-semibold">{lesson.title}</h2>
      </div>
      <div className="flex gap-2 items-center">
        <h2 className="text_color font-semibold">#{lesson.order}</h2>
      </div>
    </Link>
  );
}
