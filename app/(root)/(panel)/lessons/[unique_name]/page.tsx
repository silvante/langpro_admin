"use client";

import Heading from "@/app/(global_components)/Heading";
import LessonsList from "./LessonList";
import CreateLessonButton from "./NewLessonBtn";

export default function PlaylistDetailsPage() {
  return (
    <div className="space-y-5 w-full">
      <Heading>Seriyalar</Heading>
      <CreateLessonButton />
      <LessonsList />
    </div>
  );
}
