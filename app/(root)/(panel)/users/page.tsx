import Heading from "@/app/(global_components)/Heading";
import { Undo2 } from "lucide-react";
import Link from "next/link";
import UserSearchEngine from "./(components)/UserSearchEngine";

export default function UsersPage() {
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center w-full">
        <Heading>Foydalanuvchilar</Heading>
        <Link href={"/"} className="basic_button2">
          Orqaga <Undo2 />
        </Link>
      </div>
      <UserSearchEngine />
    </div>
  );
}
