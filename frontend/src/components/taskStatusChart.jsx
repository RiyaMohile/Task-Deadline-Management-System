import { Pie } from "react-chartjs-2";
import {Chart as ChartJS,ArcElement,Tooltip,Legend,} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function TaskStatusChart({ tasks = [] }) {
  const data = {
    labels: ["Pending", "In Progress", "Completed"],
    datasets: [
      {
        data: [
          tasks.filter(t => t.status === "Pending").length,
          tasks.filter(t => t.status === "In Progress").length,
          tasks.filter(t => t.status === "Completed").length,
        ],
        backgroundColor: ["#facc15", "#a855f7", "#22c55e"],
      },
    ],
  };

  return (
    <div className="h-56">
        <Pie data={data} options={{ maintainAspectRatio: false }}/>
    </div>

  );
}
