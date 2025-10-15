"use client";
import { Pie } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend
);

import Heading from "@/app/(global_components)/Heading";
import { Stats } from "@/app/types/User";

export default function Chart({ data }: { data: Stats }) {
  console.log(data);

  const labels = data.data.map((rbd) => rbd.title);
  const revenues = data.data.map((rbd) => rbd._count.users);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Revenue by type",
        data: revenues,
        backgroundColor: "#26a269",
        fill: true,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const },
    },
  };

  return (
    <div className="p-5 space-y-5 rounded-2xl border border-gray-300 shadow-md border-b-3 border-b-violet-600 flex-1 overflow-scroll md:overflow-hidden">
      <Heading>Pleylistlar</Heading>
      <div className="w-[700px] md:w-full h-[300px]">
        <Bar options={options} data={chartData} className="w-full h-full" />
      </div>
    </div>
  );
}
