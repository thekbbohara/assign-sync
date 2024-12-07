"use client";
import { AchievementGrid } from "@/components/achivements/achievement-grid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Users, Clock } from "lucide-react";
import { useSession } from "next-auth/react"; // Import useSession hook
import { useEffect, useState } from "react"; // Import useState and useEffect for handling async data fetching

const DashboardPage = () => {
  const { data: session, status } = useSession(); // Use useSession hook to get session data
  const [totalStudentsCount, setTotalStudentsCount] = useState<number>(0); // State to store total students count

  // Fetch total student count when the session is available
  useEffect(() => {
    const getTotalStudentCount = async () => {
      if (!session?.user?.id) return; // Ensure userId exists
      const userId = session.user.id;

      try {
        const res = await fetch("/api/students?filter=total", {
          headers: {
            userId: userId,
          },
        });
        const { total, err }: { total: number; err: string | null } =
          await res.json();
        if (err) {
          console.error("Error fetching total students:", err);
          setTotalStudentsCount(0);
        } else {
          setTotalStudentsCount(total);
        }
      } catch (error) {
        console.error("Error during fetch:", error);
        setTotalStudentsCount(0);
      }
    };

    if (session?.user?.id) {
      getTotalStudentCount();
    }
  }, [session]); // Run when the session changes

  // Handle the case where session is not loaded yet
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Please log in to view the dashboard.</div>;
  }

  return (
    <div className="p-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Assignments
            </CardTitle>
            <Book className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudentsCount || 0}</div>
            <p className="text-xs text-muted-foreground">+0 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Completion Time
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.5h</div>
            <p className="text-xs text-muted-foreground">
              -15min from last week
            </p>
          </CardContent>
        </Card>
      </div>
      <AchievementGrid className="pt-4" />
    </div>
  );
};

export default DashboardPage;
