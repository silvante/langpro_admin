import Logotype from "@/app/(global_components)/Logotype";

export default function Aside() {
  return (
    <aside className="p-5 sticky top-0 left-0 h-screen bg-white border-gray-500/45 special_shadowing z-10 max-w-64 w-full">
      <Logotype link="/panel" />
    </aside>
  );
}
