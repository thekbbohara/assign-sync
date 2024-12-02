"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Book, Users, Settings, PlusCircle, Layout, GraduationCap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
  {
    label: "Dashboard",
    icon: Layout,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Classes",
    icon: GraduationCap,
    href: "/dashboard/classes",
    color: "text-emerald-500",
  },
  {
    label: "Assignments",
    icon: Book,
    href: "/dashboard/assignments",
    color: "text-violet-500",
  },
  {
    label: "Students",
    icon: Users,
    href: "/dashboard/students",
    color: "text-pink-500",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
    color: "text-orange-500",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-card">
      <div className="px-3 py-2">
        <Button variant="secondary" className="w-full justify-start" asChild>
          <Link href="/dashboard/assignments/new">
            <PlusCircle className="h-4 w-4 mr-2" />
            New Assignment
          </Link>
        </Button>
      </div>
      <ScrollArea className="flex-1 px-3">
        {routes.map((route) => (
          <Button
            key={route.href}
            variant={pathname === route.href ? "secondary" : "ghost"}
            className={cn("w-full justify-start mb-1", 
              pathname === route.href && "bg-muted"
            )}
            asChild
          >
            <Link href={route.href}>
              <route.icon className={cn("h-4 w-4 mr-2", route.color)} />
              {route.label}
            </Link>
          </Button>
        ))}
      </ScrollArea>
    </div>
  );
}