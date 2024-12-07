"use client";
import { GridBackground } from "@/components/grid-background";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader } from "@/components/ui/loading";
import { cn } from "@/lib/utils";
import { IAssignment } from "@/model/assignment";
import { Eye, Timer, Users } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AssignmentsPage() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [assignments, setAssignments] = useState<Partial<IAssignment>[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAssignments = async () => {
    const res = await fetch("/api/assignment", {
      headers: { user: String(userId) },
    });
    const data = await res.json();
    if (data.err) return toast.error(data.msg);
    setAssignments(data.assignments);
    setLoading(false);
  };
  useEffect(() => {
    if (!userId) return;
    fetchAssignments();
  }, [userId]);
  return (
    <div className={cn(assignments.length >= 1 ? "p-6" : "p-0")}>
      {assignments.length >= 1 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {assignments.map((assignment) => (
            <Card key={String(assignment._id)}>
              <CardHeader>
                <CardTitle>{assignment.title}</CardTitle>
                <CardDescription>
                  {assignment.description?.substr(
                    0,
                    Math.min(assignment.description.length, 100),
                  ) +
                    `${(assignment.description?.length ?? 0 > 100) ? "..." : ""}`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center space-x-4 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Timer className="mr-1 h-4 w-4" />
                      {`Due: ${
                        assignment?.dueDate
                          ? new Intl.DateTimeFormat("en-US", {
                              month: "short",
                              day: "numeric",
                            }).format(new Date(assignment.dueDate))
                          : "N/A"
                      }`}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Users className="mr-1 h-4 w-4" />
                      {assignment.submissions?.length} summited
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="secondary" className="w-full" asChild>
                      <Link href={`/dashboard/assignments/${assignment._id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <GridBackground>
          {loading ? <Loader /> : <span>No Saved Assignment</span>}
        </GridBackground>
      )}
    </div>
  );
}
