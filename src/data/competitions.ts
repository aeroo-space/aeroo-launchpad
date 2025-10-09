import { Satellite, Building, Brain, Car, Plane, Trophy, CircleDot, FlaskConical } from "lucide-react";

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
    id: "space-settlement",
    title: "competitions.spaceSettlement.title",
    category: "competitions.spaceSettlement.category",
    description: "competitions.spaceSettlement.description",
    icon: Building,
    status: "competitions.spaceSettlement.status", 
    deadline: "competitions.spaceSettlement.deadline",
    ages: "competitions.spaceSettlement.ages",
  },
  {
    id: "exploring-world-of-science",
    title: "competitions.exploringWorldOfScience.title",
    category: "competitions.exploringWorldOfScience.category",
    description: "competitions.exploringWorldOfScience.description",
    icon: FlaskConical,
    status: "Регистрация",
    deadline: "competitions.exploringWorldOfScience.deadline",
    ages: "competitions.exploringWorldOfScience.ages",
  },
  {
    id: "satellite-launch",
    title: "competitions.satelliteLaunch.title",
    category: "competitions.satelliteLaunch.category",
    description: "competitions.satelliteLaunch.description", 
    icon: Satellite,
    status: "Регистрация",
    deadline: "competitions.satelliteLaunch.deadline",
    ages: "competitions.satelliteLaunch.ages",
  },
  {
    id: "ai-challenge",
    title: "competitions.aiChallenge.title",
    category: "competitions.aiChallenge.category",
    description: "competitions.aiChallenge.description",
    icon: Brain,
    status: "Регистрация",
    deadline: "competitions.aiChallenge.deadline", 
    ages: "competitions.aiChallenge.ages",
  },
  {
    id: "drone-competition",
    title: "competitions.droneCompetition.title", 
    category: "competitions.droneCompetition.category",
    description: "competitions.droneCompetition.description",
    icon: CircleDot,
    status: "competitions.droneCompetition.status",
    deadline: "competitions.droneCompetition.deadline",
    ages: "competitions.droneCompetition.ages",
  },
  {
    id: "aeroo-fest",
    title: "competitions.aerooFest.title",
    category: "competitions.aerooFest.category", 
    description: "competitions.aerooFest.description",
    icon: Trophy,
    status: "competitions.aerooFest.status",
    deadline: "competitions.aerooFest.deadline",
    ages: "competitions.aerooFest.ages",
  },
  {
    id: "drive-competition", 
    title: "competitions.driveCompetition.title",
    category: "competitions.driveCompetition.category",
    description: "competitions.driveCompetition.description",
    icon: Car,
    status: "competitions.driveCompetition.status",
    deadline: "competitions.driveCompetition.deadline",
    ages: "competitions.driveCompetition.ages",
  },
];

export const getStatusColor = (status: string) => {
  if (status.includes("Active") || status.includes("Активно") || status.includes("Белсенді")) {
    return "bg-green-500";
  }
  if (status.includes("Registration") || status.includes("Регистрация") || status.includes("Тіркел")) {
    return "bg-blue-500";
  }
  if (status.includes("Soon") || status.includes("Скоро") || status.includes("Жақында") || status.includes("Coming Soon")) {
    return "bg-orange-500";
  }
  if (status.includes("Development") || status.includes("разработке") || status.includes("Әзірлен") || status.includes("In Development")) {
    return "bg-gray-500";
  }
  return "bg-gray-500";
};
