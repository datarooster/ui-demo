import {
  BanknotesIcon,
  UserPlusIcon,
  UserIcon,
  ChartBarIcon,
  PaperAirplaneIcon,
  ExclamationTriangleIcon,
  ViewColumnsIcon,
  ClipboardDocumentCheckIcon,
  HeartIcon
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "green",
    icon: HeartIcon,
    title: "Current Health",
    value: "83%",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "than last week",
    },
  },
  {
    color: "red",
    icon: ExclamationTriangleIcon,
    title: "Active Alarms",
    value: "3",
    footer: {
      color: "text-red-500",
      value: "+33",
      label: "Data loss, Schema drift, Segment is inactive",
    },
  },
  {
    color: "blue",
    icon: PaperAirplaneIcon,
    title: "Total Probes",
    value: "37",
    footer: {
      color: "text-green-500",
      // value: "+55  %",
      label: "Python, Spark, Kafka",
    },
  },
  
  
  
];

export default statisticsCardsData;
