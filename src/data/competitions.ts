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
    status: "Скоро",
    deadline: "Лето 2026",
    ages: "12-19 лет",
  },
  {
    id: "satellite-launch",
    title: "AEROO Satellite Launch Competition",
    category: "Спутники",
    description: "Проектирование, сборка и запуск мини‑спутников",
    icon: Satellite,
    status: "Регистрация",
    deadline: "1 января 2026",
    ages: "14-19 лет",
  },
  {
    id: "space-settlement",
    title: "AEROO Space Settlement Competition",
    category: "Хакатон",
    description: "Разработка концепций поселений в космосе для долгосрочной жизни",
    icon: Building,
    status: "Скоро",
    deadline: "24 октября 2025",
    ages: "12-19 лет",
  },
  {
    id: "ai-challenge",
    title: "AEROO Space AI Competition",
    category: "AI",
    description: "Разработка автономных алгоритмов для навигации, управления и планирования миссий",
    icon: Brain,
    status: "В разработке",
    deadline: "Весна 2026",
    ages: "16-25 лет",
  },
  {
    id: "drive-competition",
    title: "AEROO Rover Competition",
    category: "Ровер",
    description: "Создание и управление роверами для исследования поверхностей планет",
    icon: Car,
    status: "В разработке",
    deadline: "Лето 2026",
    ages: "14-21 лет",
  },
  {
    id: "drone-competition",
    title: "AEROO Drone Competition",
    category: "Дроны",
    description: "Конструирование и пилотирование дронов для зондирования, картографирования и гонок",
    icon: Plane,
    status: "Скоро",
    deadline: "Октябрь 2025",
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
