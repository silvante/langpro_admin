"use client";
import Heading from "@/app/(global_components)/Heading";
import validationService from "@/app/api/services/verificationService";
import { updateplaylists } from "@/app/store/slices/playlistSlice";
import { KeyRound } from "lucide-react";
import { useState } from "react";

export default function UpdatePassword() {
  const [error, setError] = useState<null | string>(null);
  const [success, setSuccess] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  const [old_password, setOldPassword] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [password_conf, setPasswordConf] = useState("");

  async function UpdatePassword(e: any) {
    e.preventDefault();
    try {
      setLoading(true);
      const data = {
        old_password,
        new_password,
        password_conf,
      };
      const res: any = await validationService.updatePassword(data);
      const validRes: { message: string } = res;
      if (validRes.message) {
        setSuccess(validRes.message);
      }
      setOldPassword("");
      setNewPassword("");
      setPasswordConf("");
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Xatolik yuz berdi. Iltimos, qaytadan urinib ko‘ring.");
      }
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-5 bg-white border border-gray-300 shadow-md rounded-2xl space-y-5">
      <Heading>Tahrirlang</Heading>
      {error && (
        <p className="text-red-600 bg-red-50 rounded-xl px-4 py-2 text-center">
          {error}
        </p>
      )}

      {success && (
        <p className="text-white bg-green-400 rounded-xl px-4 py-2 text-center">
          {success}
        </p>
      )}
      <form className="space-y-4" onSubmit={UpdatePassword}>
        <div className="flex flex-col space-y-1">
          <label htmlFor="old_password">Oldingi paro'l</label>
          <input
            type="text"
            name="old_password"
            id="old_password"
            value={old_password}
            onChange={(e) => setOldPassword(e.target.value)}
            className="global_input"
          />
        </div>
        <span className="border-b border-gray-300 w-full flex"></span>
        <p className="flex items-center gap-2 text_color">
          <KeyRound /> Yangi paro'lni yodda tuting, yoki yozib oling, paro'lni
          esdan chiqarish panel boshqaruvini yoqotishga o'lib keladi!
        </p>
        <div className="flex flex-col space-y-1">
          <label htmlFor="new_password">Yangi paro'l</label>
          <input
            type="password"
            name="new_password"
            id="new_password"
            value={new_password}
            onChange={(e) => setNewPassword(e.target.value)}
            className="global_input"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="password_conf">Yangi paro'lni takrorlang</label>
          <input
            type="password"
            name="password_conf"
            id="password_conf"
            value={password_conf}
            onChange={(e) => setPasswordConf(e.target.value)}
            className="global_input"
          />
        </div>
        <div>
          <button
            type="submit"
            className={loading ? "basic_button2" : "basic_button"}
            disabled={loading}
          >
            {loading ? "Tahrirlanmoqda..." : "Tahrirlash"}
          </button>
        </div>
      </form>
    </div>
  );
}
