"use client";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { faker } from "@faker-js/faker";
import {
  Card,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
  labels,
  datasets: [
    {
      label: "Clicks",
      data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Scans",
      data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

function InfoCard({
  title,
  value,
  timeSpan,
}: {
  title: string;
  value: number;
  timeSpan: string;
}) {
  return (
    <Card className="p-4">
      <CardTitle className="text-lg">{title}</CardTitle>
      <CardDescription className="mt-6 flex items-end justify-between">
        <span className="text-3xl">{value}</span>
        <span>{timeSpan}</span>
      </CardDescription>
    </Card>
  );
}

export default function Page() {
  return (
    <div className="grid">
      <div className="grid grid-cols-3 gap-2">
        <InfoCard title="Clicks" value={220} timeSpan="7 days" />
        <InfoCard title="Scans" value={67} timeSpan="7 days" />
        <InfoCard title="URL's Created" value={11} timeSpan="7 days" />
        <InfoCard title="Clicks" value={220} timeSpan="All time" />
        <InfoCard title="Scans" value={67} timeSpan="All time" />
        <InfoCard title="URL's Created" value={11} timeSpan="All time" />
        <Card className="col-span-2 p-4">
          <Line data={data} options={options} />
        </Card>
        <Card className="p-4">
          <Pie
            data={{
              labels: ["Click", "Scan"],
              datasets: [
                {
                  data: [[1], [2]],
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.5)",
                    "rgba(53, 162, 235, 0.5)",
                  ],
                },
              ],
            }}
          />
        </Card>
      </div>
    </div>
  );
}
