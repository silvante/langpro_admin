"use client";
import { clearValidation } from "@/app/store/slices/adminSlice";
import { LockKeyholeIcon } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

export default function LockButton() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  function Lock() {
    dispatch(clearValidation());
    localStorage.removeItem("access_token");
    if (pathname === "/") {
      router.push(`/validation/`);
    } else {
      router.push(`/validation/?page=${pathname}`);
    }
  }

  return (
    <button
      onClick={Lock}
      className="text-gray-600 flex gap-2 items-center rounded-full border border-gray-300 py-2 px-4 hover:bg-[#26a269] hover:text-white hover:border-[#26a269] transition-all cursor-pointer"
    >
      <LockKeyholeIcon /> <p className="hidden sm:block">Qulflash</p>
    </button>
  );
}
