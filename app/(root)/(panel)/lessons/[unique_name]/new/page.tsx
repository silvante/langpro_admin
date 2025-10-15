import Heading from "@/app/(global_components)/Heading";
import NewLessonForm from "./NewLessonForm";

export default function NewLesson() {
  return (
    <div className="space-y-5">
      <Heading>Seriya yaratish</Heading>
      <NewLessonForm />
    </div>
  );
}
