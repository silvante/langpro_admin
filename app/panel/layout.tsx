import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../globals.css";
import Aside from "./(panel_components)/Aside";
import PanelHeader from "./(panel_components)/PanelHeader";
import PanelAuthDirector from "./PanelAuthDirector";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Kickstart JS | Panel",
  description: "build your own project fast with kickstartJS",
  icons: {
    icon: "/icons/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${roboto.className} antialiased flex min-h-screen`}>
      <PanelAuthDirector />
      <Aside />
      <main className="flex-1">
        <PanelHeader />
        <div className="p-5">{children}</div>
      </main>
    </div>
  );
}
