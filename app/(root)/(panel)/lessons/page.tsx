import Heading from "@/app/(global_components)/Heading";
import { Plus } from "lucide-react";
import Link from "next/link";
import Playlists from "./Playlist";

export default function LessonsPage() {
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center w-full">
        <Heading>Darslar</Heading>
        <Link href={"/lessons/new"} className="basic_button">
          Dars yaratish <Plus />
        </Link>
      </div>
      <Playlists />
    </div>
  );
}
