"use client";
import Loader from "@/app/(global_components)/Loader";
import validationService from "@/app/api/services/verificationService";
import { clearValidation, validateAdmin } from "@/app/store/slices/adminSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function ValidationForm() {
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  useEffect(() => {
    localStorage.removeItem("access_token");
    dispatch(clearValidation());
  }, []);

  // data
  const [password, setPassword] = useState("");

  async function HandleValidate(e: any) {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      if (password.length < 1) {
        return setError("Iltimos paro'lni kiriting");
      }
      const res: any = await validationService.verify_admin(password);
      const token: string = res.access_token;
      if (!token) {
        return setError("Token is not valid please try again later");
      }
      localStorage.setItem("access_token", token);
      dispatch(validateAdmin(token));
      if (page) {
        router.push(page);
      } else {
        router.push("/");
      }
      setError("");
      setLoading(false);
    } catch (error: any) {
      if (error.response && error.response.data) {
        setError(
          error.response.data.message ||
            "An error occurred while validating the password."
        );
      }
      setLoading(false);
    }
  }
  return (
    <div className="space-y-5 flex flex-col items-center">
      <form className="space-y-2" onSubmit={HandleValidate}>
        <label htmlFor="password">Paro'lni kiriting*</label>
        <div className="flex gap-3">
          <input
            type={show ? "text" : "password"}
            className="basic_field"
            placeholder="Paro'l"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          <button type="submit" className="basic_button">
            Submit
          </button>
        </div>
      </form>
      <button
        className="cursor-pointer base_text"
        onClick={() => setShow(!show)}
      >
        {show ? "Paro'lni yashirish" : "Paro'lni korsatish"}
      </button>
      <div className="w-full">
        {error !== "" && (
          <p className="text-red-600 bg-red-600/10 rounded-xl px-4 py-2 text-center">
            {error}
          </p>
        )}
        {loading && (
          <div className="w-full flex items-center justify-center">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}
