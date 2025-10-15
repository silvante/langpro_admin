"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashLoader } from "react-spinners";
import authService from "../api/services/verificationService";
import { updateUser } from "../store/slices/adminSlice";

export default function PanelAuthDirector() {
  const [loading, setloading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    if (!access_token) {
      router.push("/signup");
    } else {
      if (!user.currentUser) {
        async function DispatchUser() {
          try {
            const user_profile = await authService.getProfile();
            dispatch(updateUser(user_profile));
          } catch (error) {
            try {
              const reset_token = localStorage.getItem("reset_token");
              if (!reset_token) {
                return router.push("/signup");
              }
              const access_token: any = await authService.resetToken(
                reset_token
              );
              if (!access_token) {
                return router.push("/signup");
              }
              localStorage.setItem("access_token", access_token);
              const user_profile = await authService.getProfile();
              dispatch(updateUser(user_profile));
            } catch (error) {
              router.push("/signup");
            }
          }
        }
        DispatchUser();
      }
      setloading(false);
    }
  }, []);
  return (
    <>
      {loading && (
        <div className="fixed w-full h-screen top-0 left-0 right-0 bottom-0 bg-white z-50 flex justify-center items-center">
          <HashLoader color="#7c3aed" size={58} />
        </div>
      )}
    </>
  );
}
