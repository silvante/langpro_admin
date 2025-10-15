import Heading from "@/app/(global_components)/Heading";
import NewPlaylistForm from "./NewPlaylistForm";
import Link from "next/link";
import { Undo2 } from "lucide-react";

export default function CreateLessonPage() {
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center w-full">
        <Heading>Dars yaratish</Heading>
        <Link href={"/lessons"} className="basic_button2">
          Ortga <Undo2 />
        </Link>
      </div>
      <NewPlaylistForm />
    </div>
  );
}
