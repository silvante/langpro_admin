import UserProfile from "./UserProfile";

export default function PanelHeader() {
  return (
    <header className="sticky top-0 p-5 bg-white border-gray-500/45 special_shadowing flex justify-between">
      <p>Header</p> <UserProfile />
    </header>
  );
}
