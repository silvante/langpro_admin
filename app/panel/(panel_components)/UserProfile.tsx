"use client";
import { useSelector } from "react-redux";

export default function UserProfile() {
  const user = useSelector((state: any) => state.user);
  console.log(user);

  return (
    <div>
      <p>User profile here</p>
    </div>
  );
}
