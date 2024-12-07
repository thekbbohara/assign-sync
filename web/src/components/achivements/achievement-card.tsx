"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface AchievementCardProps {
  name: string;
  description: string;
  progress: number;
  unlocked: boolean;
  icon: LucideIcon;
  color: string;
}

export function AchievementCard({
  name,
  description,
  progress,
  unlocked,
  icon: Icon,
  color,
}: AchievementCardProps) {
  return (
    <Card
      className={cn(
        "transition-all duration-300",
        unlocked ? "bg-card" : "bg-muted/50",
      )}
    >
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "p-2 rounded-xl",
                  unlocked
                    ? `bg-${color}/10 text-${color}`
                    : "bg-muted text-muted-foreground",
                )}
              >
                <Icon className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold">{name}</h4>
                  <Badge
                    variant={unlocked ? "default" : "outline"}
                    className="ml-2"
                  >
                    {unlocked ? "Unlocked" : `${progress}%`}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </div>
          </div>
          {!unlocked && <Progress value={progress} className="h-2" />}
        </div>
      </CardContent>
    </Card>
  );
}
