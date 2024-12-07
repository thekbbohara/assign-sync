"use client";

import { cn } from "@/lib/utils";
import { AchievementCard } from "./achievement-card";
import {
  Zap,
  Trophy,
  Target,
  Star,
  BookOpen,
  Users,
  Brain,
  Rocket,
} from "lucide-react";

const achievements = [
  {
    name: "Quick Learner",
    description: "Complete 5 assignments ahead of schedule",
    progress: 80,
    unlocked: true,
    icon: Zap,
    color: "yellow",
  },
  {
    name: "Perfect Score",
    description: "Get 100% on any assignment",
    progress: 100,
    unlocked: true,
    icon: Trophy,
    color: "orange",
  },

  {
    name: "Problem Solver",
    description: "Solve 20 complex challenges",
    progress: 75,
    unlocked: false,
    icon: Brain,
    color: "purple",
  },
  {
    name: "Rising Star",
    description: "Maintain a 90% average for a month",
    progress: 95,
    unlocked: false,
    icon: Star,
    color: "yellow",
  },
  {
    name: "Goal Crusher",
    description: "Complete all weekly goals for a month",
    progress: 30,
    unlocked: false,
    icon: Target,
    color: "red",
  },
  {
    name: "Innovation Master",
    description: "Create 3 outstanding projects",
    progress: 66,
    unlocked: false,
    icon: Rocket,
    color: "blue",
  },
];

export function AchievementGrid({ className }: { className?: string }) {
  return (
    <section className={cn("pt-4 ", className)}>
      <div className="text-4xl font-bold py-1">Achievements</div>
      <div
        className={cn(
          "grid gap-4",
          "grid-cols-[repeat(auto-fit,minmax(250px,1fr))]",
        )}
      >
        {achievements.map((achievement) => (
          <AchievementCard key={achievement.name} {...achievement} />
        ))}
      </div>
    </section>
  );
}
