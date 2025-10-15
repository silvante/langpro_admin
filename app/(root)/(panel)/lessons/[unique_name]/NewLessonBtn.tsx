import Link from "next/link";
import { useContext } from "react";
import { GlobalContext } from "./layout";
import { BadgePlus } from "lucide-react";

export default function CreateLessonButton() {
  const { playlist } = useContext(GlobalContext);
  return (
    <Link
      href={`/lessons/${playlist.unique_name}/new`}
      className="flex flex-col"
    >
      <div
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-gray-300 text-gray-600 rounded-xl space-y-2 p-6 flex flex-col items-center justify-center cursor-pointer hover:border-[#26a269] transition"
      >
        <BadgePlus size={45} />
        <p>Yangi seriya yaratish</p>
      </div>
    </Link>
  );
}
