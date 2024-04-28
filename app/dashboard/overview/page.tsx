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
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { OverviewData } from "@/app/api/overview/route";
import { useMemo } from "react";

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
  maintainAspectRatio: false,
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
    <Card className="col-span-6 p-4 sm:col-span-3 md:col-span-2">
      <CardTitle className="text-lg">{title}</CardTitle>
      <CardDescription className="mt-6 flex items-end justify-between">
        <span className="text-3xl">{value}</span>
        <span>{timeSpan}</span>
      </CardDescription>
    </Card>
  );
}

export default function Page() {
  const { data, isLoading } = useQuery<OverviewData>({
    queryFn: async () => {
      const res = await axios.get("/api/overview");
      return res.data;
    },
    queryKey: ["overview"],
  });

  const lineChartData = useMemo(() => {
    if (isLoading || !data) return null;
    return {
      labels: data.months.labels,
      datasets: [
        {
          label: "Clicks",
          data: data.months.clicks,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235",
        },
        {
          label: "Scans",
          data: data.months.scans,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132)",
        },
      ],
    };
  }, [data]);

  return (
    <div className="grid">
      <div className="grid grid-cols-6 gap-2">
        <InfoCard
          title="Clicks"
          value={data?.week.clicks || 0}
          timeSpan="7 days"
        />
        <InfoCard
          title="Scans"
          value={data?.week.scans || 0}
          timeSpan="7 days"
        />
        <InfoCard
          title="URL's Created"
          value={data?.week.urlCreated || 0}
          timeSpan="7 days"
        />
        <InfoCard
          title="Clicks"
          value={data?.total.clicks || 0}
          timeSpan="All time"
        />
        <InfoCard
          title="Scans"
          value={data?.total.scans || 0}
          timeSpan="All time"
        />
        <InfoCard
          title="URL's Created"
          value={data?.total.urlCreated || 0}
          timeSpan="All time"
        />
        <Card className="col-span-6 flex p-1 sm:col-span-4 sm:p-4">
          {lineChartData && (
            <Line
              data={lineChartData}
              options={options}
              className="min-h-[240px]"
            />
          )}
        </Card>
        <Card className="col-span-6 flex p-1 sm:col-span-2 sm:p-4">
          <Pie
            className="mx-auto"
            data={{
              labels: ["Click", "Scan"],
              datasets: [
                {
                  data: [[data?.total.clicks], [data?.total.scans]],
                  backgroundColor: ["rgba(53, 162, 235)", "rgba(255, 99, 132)"],
                },
              ],
            }}
          />
        </Card>
      </div>
    </div>
  );
}
