"use client";
import Heading from "@/app/(global_components)/Heading";
import UpdatePlaylistForm from "./UpdatePlaylistForm";

export default function PlaylistUpdatePage() {
  return (
    <div className="space-y-5">
      <Heading>Tahrirlash</Heading>
      <UpdatePlaylistForm />
    </div>
  );
}
