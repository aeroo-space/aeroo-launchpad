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
    title: "AEROO Fest",
    category: "Фестиваль",
    description: "Мероприятия, шоу и мастер‑классы для продвижения аэрокосмических технологий",
    icon: Trophy,
    status: "Активно",
    deadline: "15 марта 2024",
    ages: "12-25 лет",
  },
  {
    id: "satellite-launch",
    title: "AEROO Satellite Launch",
    category: "Малый спутник",
    description: "Проектирование, сборка и запуск мини‑спутников",
    icon: Satellite,
    status: "Регистрация",
    deadline: "1 апреля 2024",
    ages: "16-25 лет",
  },
  {
    id: "space-settlement",
    title: "AEROO Space Settlement",
    category: "Проектирование",
    description: "Разработка концепций поселений в космосе для долгосрочной жизни",
    icon: Building,
    status: "Скоро",
    deadline: "10 мая 2024",
    ages: "14-25 лет",
  },
  {
    id: "ai-challenge",
    title: "AEROO Space AI Challenge",
    category: "AI",
    description: "Разработка автономных алгоритмов для навигации, управления и планирования миссий",
    icon: Brain,
    status: "Активно",
    deadline: "25 марта 2024",
    ages: "16-25 лет",
  },
  {
    id: "drive-competition",
    title: "AEROO Drive Competition",
    category: "Ровер",
    description: "Создание и управление роверами для исследования поверхностей планет",
    icon: Car,
    status: "Регистрация",
    deadline: "5 апреля 2024",
    ages: "14-25 лет",
  },
  {
    id: "drone-competition",
    title: "AEROO Drone Competition",
    category: "Дроны",
    description: "Конструирование и пилотирование дронов для зондирования, картографирования и гонок",
    icon: Plane,
    status: "Активно",
    deadline: "20 марта 2024",
    ages: "12-25 лет",
  },
];

export const getStatusColor = (status: string) => {
  switch (status) {
    case "Активно":
      return "bg-green-500";
    case "Регистрация":
      return "bg-blue-500";
    case "Скоро":
      return "bg-orange-500";
    default:
      return "bg-gray-500";
  }
};
