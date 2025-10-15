import Heading from "@/app/(global_components)/Heading";
import { BookMarked, Contact, LockKeyhole } from "lucide-react";
import Link from "next/link";
import Statistics from "./(components)/Statistics";

export default function Home() {
  return (
    <div className="w-full space-y-5">
      <Heading>Admin panel</Heading>
      <div className="space-y-3">
        <Link
          href={"/lessons"}
          className="p-4 rounded-xl bg-gray-50 border-gray-300 border flex gap-4 hover:border-[#26a269] hover:bg-[#26a269] hover:text-white transition-all"
        >
          <BookMarked /> Darslar & Pleylistlar
        </Link>
        <Link
          href={"/users"}
          className="p-4 rounded-xl bg-gray-50 border-gray-300 border flex gap-4 hover:border-[#26a269] hover:bg-[#26a269] hover:text-white transition-all"
        >
          <Contact /> Foydalanuvchilarni Qidirish
        </Link>
        <Link
          href={"/password"}
          className="p-4 rounded-xl bg-gray-50 border-gray-300 border flex gap-4 hover:border-[#26a269] hover:bg-[#26a269] hover:text-white transition-all"
        >
          <LockKeyhole /> Paro'lni tahrirlash
        </Link>
      </div>
      <Statistics />
    </div>
  );
}
