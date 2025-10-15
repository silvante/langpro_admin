import Logo from "@/app/(global_components)/Logo";
import LockButton from "./LockBtn";

export default function Header() {
  return (
    <header className="flex items-center justify-center w-full px-5 border-b border-b-gray-300">
      <nav className="py-2 w-full flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Logo />
          <p className="base_bg px-1 rounded text-white">admin</p>
        </div>
        <div>
          <LockButton />
        </div>
      </nav>
    </header>
  );
}
