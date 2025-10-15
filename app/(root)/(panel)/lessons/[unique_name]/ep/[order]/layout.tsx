"use client";
import { Roboto } from "next/font/google";
import "@/app/globals.css";
import { useContext, useState } from "react";
import { Lesson } from "@/app/types/User";
import { createContext } from "react";
import { GlobalContext } from "../../layout";
import { useParams } from "next/navigation";
import Heading from "@/app/(global_components)/Heading";
import Link from "next/link";
import PageMessage from "@/app/(global_components)/PageMessage";
import { Edit, Trash2 } from "lucide-react";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});

export const LessonContext = createContext<any>(null);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { order } = useParams();
  const { playlist } = useContext(GlobalContext);
  const lessons: Lesson[] = playlist.lessons;

  const [lesson, setLesson] = useState<Lesson | undefined>(
    lessons.find((le) => le.order === Number(order))
  );

  if (!lesson) {
    return (
      <div className="flex items-center justify-center py-10">
        <PageMessage
          title="Seriya topilmadi"
          message="Boshqa seriya bilan urunib ko'ring"
        />
      </div>
    );
  }

  const current_link = `/lessons/${playlist.unique_name}/ep/${lesson?.order}`;

  return (
    <div className={`${roboto.className} antialiased w-full space-y-5`}>
      <div className="w-full flex items-center justify-between">
        <Link href={current_link} className="flex">
          <Heading>Seriya #{order}</Heading>
        </Link>
        <div className="flex items-center gap-3 ">
          <Link href={current_link + "/update"} className="basic_button2">
            <Edit /> Tahrirlash
          </Link>
          <Link href={current_link + "/remove"} className="basic_button2">
            <Trash2 />
          </Link>
        </div>
      </div>
      <div className="w-full">
        <LessonContext.Provider value={{ lesson, setLesson, current_link }}>
          {children}
        </LessonContext.Provider>
      </div>
    </div>
  );
}
