"use client";
import Heading from "@/app/(global_components)/Heading";
import Loader from "@/app/(global_components)/Loader";
import PageMessage from "@/app/(global_components)/PageMessage";
import validationService from "@/app/api/services/verificationService";
import { setLoading, updateStats } from "@/app/store/slices/statsSlice";
import { Stats } from "@/app/types/User";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chart from "./Chart";

export default function Statistics() {
  const [error, setError] = useState<null | string>(null);
  const dispatch = useDispatch();
  const { stats, is_loading } = useSelector((state: any) => state.stats);

  async function getStats() {
    if (stats) {
      return;
    }
    try {
      const res: any = await validationService.getStats();
      const stats: Stats = res;
      dispatch(updateStats(stats));
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Xatolik yuz berdi. Iltimos, qaytadan urinib ko‘ring.");
      }
    } finally {
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    getStats();
  }, []);

  const statistics: Stats = stats;

  return (
    <div className="space-y-5">
      <Heading>Statisticalar</Heading>
      {error && (
        <p className="text-red-600 bg-red-50 rounded-xl px-4 py-2 text-center">
          {error}
        </p>
      )}
      {!is_loading ? (
        <div className="w-full space-y-5">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            <div className="p-5 rounded-xl bg-gradient-to-r from-green-600 to-green-400 text-white">
              <h2 className="text-xl font-semibold">Foydalanuvchilar</h2>
              <p className="font-bold text-2xl">{statistics.total_users} ta</p>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-r from-red-600 to-red-400 text-white">
              <h2 className="text-xl font-semibold">Darslar</h2>
              <p className="font-bold text-2xl">
                {statistics.total_playlists} ta
              </p>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-r from-yellow-600 to-yellow-400 text-white">
              <h2 className="text-xl font-semibold">Seriyalar</h2>
              <p className="font-bold text-2xl">
                {statistics.total_lessons} ta
              </p>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 text-white">
              <h2 className="text-xl font-semibold">Lug'atlar</h2>
              <p className="font-bold text-2xl">
                {statistics.total_vocabulary} ta
              </p>
            </div>
          </div>
          <Heading>Chart</Heading>
          {statistics.data.length > 1 ? (
            <div className="w-full">
              <Chart data={statistics} />
            </div>
          ) : (
            <div className="flex items-center justify-center pb-10">
              <PageMessage
                title="Darslar yoq"
                message="Statistikalar darslarga bog'liq"
              />
            </div>
          )}
        </div>
      ) : (
        <div className="flex py-10 items-center justify-center">
          <Loader />
        </div>
      )}
    </div>
  );
}
