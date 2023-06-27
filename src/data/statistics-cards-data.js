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
    color: "orange",
    icon: HeartIcon,
    title: "Current Health",
    value: "73%",
    footer: {
      color: "text-red-500",
      value: "-13%",
      label: "than last week",
    },
  },
  {
    color: "red",
    icon: ExclamationTriangleIcon,
    title: "Recent Alarms",
    value: "3",
    footer: {
      color: "text-red-500",
      value: "+2",
      label: "in the last 24 hours",
    },
  },
  {
    color: "orange",
    icon: ExclamationTriangleIcon,
    title: "Active Alarms",
    value: "32",
    footer: {
      color: "text-red-500",
      value: "5",
      label: "are critical",
    },
  },
  
  
  
];

export default statisticsCardsData;
