"use client";
import { Roboto } from "next/font/google";
import "@/app/globals.css";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import Heading from "@/app/(global_components)/Heading";
import Link from "next/link";
import { Undo2 } from "lucide-react";
import PlaylistDetails from "./PlaylistDetails";
import { useEffect, useState } from "react";
import playlistService from "@/app/api/services/playlistsService";
import { Playlist } from "@/app/types/User";
import PageMessage from "@/app/(global_components)/PageMessage";
import Loader from "@/app/(global_components)/Loader";
import { createContext } from "react";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});

export const GlobalContext = createContext<any>(null);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { unique_name } = useParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  //   main
  const [playlist, setPlaylist] = useState<Playlist | null>(null);

  async function GetPlaylist() {
    if (playlist) {
      return;
    }
    try {
      const res: any = await playlistService.getByUniqueName(
        String(unique_name)
      );
      const ResPlaylist: Playlist = res;
      setPlaylist(ResPlaylist);
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Xatolik yuz berdi. Iltimos, qaytadan urinib ko‘ring.");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    GetPlaylist();
  }, []);

  console.log(playlist);

  return (
    <div className={`${roboto.className} antialiased w-full space-y-5`}>
      <div className="flex justify-between items-center w-full">
        <div className="flex-1 truncate">
          <Heading>Batafsil @{unique_name}</Heading>
        </div>
        <Link href={"/lessons"} className="basic_button2">
          Ortga <Undo2 />
        </Link>
      </div>
      {error && (
        <p className="text-red-600 bg-red-50 rounded-xl px-4 py-2 text-center">
          {error}
        </p>
      )}
      {loading ? (
        <div className="w-full flex justify-center items-center py-20">
          <Loader />
        </div>
      ) : (
        <>
          {playlist ? (
            <main className="main_body flex flex-col md:flex-row gap-5 items-start">
              <PlaylistDetails playlist={playlist} />
              <div className="flex-1 w-full">
                <GlobalContext.Provider value={{ playlist, setPlaylist }}>
                  {children}
                </GlobalContext.Provider>
              </div>
            </main>
          ) : (
            <div className="w-full items-center justify-center py-20">
              <PageMessage
                title="Dars topilmadi"
                message="Keyinroq qayta urunib ko'ring"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
