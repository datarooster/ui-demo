import { chartsConfig } from "@/configs";

const websiteViewsChart = {
  type: "bar",
  height: 220,
  series: [
    {
      name: "Health",
      data: [50, 20, 10, 22, 50, 78, 83],
    },
  ],
  options: {
    ...chartsConfig,
    colors: "#fff",
    plotOptions: {
      bar: {
        columnWidth: "16%",
        borderRadius: 5,
      },
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ["M", "T", "W", "T", "F", "S", "S"],
    },
  },
};

const dailySalesChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Alerts",
      data: [0, 3, 1, 1, 1, 5, 3],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#fff"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ["M", "T", "W", "T", "F", "S", "S"],
    },
  },
};

const completedTasksChart = {
  type: "donut",
  height: 220,
  series: [1001, 5398, 3375, 1896],
  options: {
    labels: ['Spark', 'Python', 'Kafka', 'Flink'],
    plotOptions: {
      pie: {
        expandOnClick: false
      }
    }
  },
};

export const statisticsChartsData = [
  {
    color: "green",
    title: "Health over time",
    description: "What is the status of your probes",
    footer: "over the last 24 hours",
    chart: websiteViewsChart,
  },
  {
    color: "red",
    title: "Alerts over time",
    description: "How many alerts were triggered",
    footer: "updated 4 min ago",
    chart: dailySalesChart,
  },
  {
    color: "white",
    title: "Probes measured",
    description: "How many probes were measured for what sources",
    footer: "just updated",
    chart: completedTasksChart,
  },
];

export default statisticsChartsData;
