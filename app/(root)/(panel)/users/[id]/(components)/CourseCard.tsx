"use client";
import Loader from "@/app/(global_components)/Loader";
import playlistService from "@/app/api/services/playlistsService";
import { Courses, User } from "@/app/types/User";
import { Minus } from "lucide-react";
import { useContext, useState } from "react";
import { UserContext } from "../page";

export default function CourseCard({ course }: { course: Courses }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { user, setUser } = useContext(UserContext);

  async function RemoveUserFromCourse() {
    try {
      setLoading(true);
      const res: any = await playlistService.removeUser(
        course.playlist.unique_name,
        user.id
      );
      const response: { deleted: boolean } = res;
      if (response.deleted) {
        setUser((prev: User) => ({
          ...prev,
          courses: prev.courses.filter((c) => c.id !== course.id),
        }));
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        setError(
          error.response.data.message ||
            "An error occurred while validating the password."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex gap-4 p-4 rounded-xl items-center justify-center border border-gray-300 shadow-md">
      <div className="max-w-64 w-full">
        <p className="w-full truncate text-lg text_color font-semibold">
          {course.playlist.title}
        </p>
        <p className="w-full truncate text_color">
          {course.playlist.description}
        </p>
      </div>
      <div>
        <button
          className={`${loading ? "basic_button2" : "basic_button3"}`}
          onClick={RemoveUserFromCourse}
        >
          {loading ? <Loader /> : <Minus />}
        </button>
      </div>
    </div>
  );
}
