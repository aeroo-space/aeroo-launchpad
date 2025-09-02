import { Satellite, Building, Brain, Car, Plane, Trophy } from "lucide-react";

export type Competition = {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: any;
  status: "Активно" | "Регистрация" | "Скоро" | string;
  deadline: string;
  ages: string;
};

export const competitions: Competition[] = [
  {
    id: "aeroo-fest",
    title: "", // Will be translated
    category: "", // Will be translated
    description: "", // Will be translated
    icon: Trophy,
    status: "", // Will be translated
    deadline: "", // Will be translated
    ages: "", // Will be translated
  },
  {
    id: "satellite-launch",
    title: "", // Will be translated
    category: "", // Will be translated
    description: "", // Will be translated
    icon: Satellite,
    status: "Скоро", // Will be translated
    deadline: "", // Will be translated
    ages: "", // Will be translated
  },
  {
    id: "space-settlement",
    title: "", // Will be translated
    category: "", // Will be translated
    description: "", // Will be translated
    icon: Building,
    status: "", // Will be translated
    deadline: "", // Will be translated
    ages: "", // Will be translated
  },
  {
    id: "ai-challenge",
    title: "", // Will be translated
    category: "", // Will be translated
    description: "", // Will be translated
    icon: Brain,
    status: "", // Will be translated
    deadline: "", // Will be translated
    ages: "", // Will be translated
  },
  {
    id: "drive-competition",
    title: "", // Will be translated
    category: "", // Will be translated
    description: "", // Will be translated
    icon: Car,
    status: "", // Will be translated
    deadline: "", // Will be translated
    ages: "", // Will be translated
  },
  {
    id: "drone-competition",
    title: "", // Will be translated
    category: "", // Will be translated
    description: "", // Will be translated
    icon: Plane,
    status: "", // Will be translated
    deadline: "", // Will be translated
    ages: "", // Will be translated
  },
];

export const getStatusColor = (status: string) => {
  if (status.includes("Active") || status.includes("Активно") || status.includes("Белсенді")) {
    return "bg-green-500";
  }
  if (status.includes("Registration") || status.includes("Регистрация") || status.includes("Тіркеу")) {
    return "bg-blue-500";
  }
  if (status.includes("Soon") || status.includes("Скоро") || status.includes("Жақында")) {
    return "bg-orange-500";
  }
  if (status.includes("Development") || status.includes("разработке") || status.includes("дамытуда")) {
    return "bg-gray-500";
  }
  return "bg-gray-500";
};
