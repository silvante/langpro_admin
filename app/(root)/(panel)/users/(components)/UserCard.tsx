import { User } from "@/app/types/User";
import { Eye } from "lucide-react";
import Link from "next/link";

export default function UserCard({ user }: { user: User }) {
  console.log(user);

  return (
    <div className="border border-gray-300 rounded-xl shadow-lg p-6 flex flex-col items-center text-center">
      {/* Profile pic */}
      <img
        src={user.profile_pic}
        alt={`${user.name} ${user.surname}`}
        className="h-24 w-24 rounded-full border-4 border-[#26a269] shadow-md mb-4"
      />

      {/* Name */}
      <h2 className="text-lg font-bold flex items-center gap-2">
        {user.name} {user.surname}
        {user.is_verified && (
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 text-white text-xs">
            ✔
          </span>
        )}
      </h2>

      {/* Info */}
      <div className="mt-2 space-y-1 text-sm text_color">
        <p>📧 {user.email}</p>
        <p>👤 {user.role}</p>
        <p>📅 Qo'shilgan {new Date(user.created_at).toLocaleDateString()}</p>
      </div>

      {/* Google ID */}
      <div className=" w-full pt-5">
        <Link href={`/users/${user.id}`} className="basic_button">
          <Eye /> Batafsil
        </Link>
      </div>
    </div>
  );
}
