"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { IAssignment } from "@/model/assignment";
import { Eye, PlusCircle, Timer, Users } from "lucide-react";
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
                <CardDescription>{assignment.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Timer className="mr-1 h-4 w-4" />
                      Due {assignment?.dueDate?.toLocaleString()}
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
        <div className="h-[calc(100svh-70px)] w-full dark:bg-transparent bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
          {/* Radial gradient for the container to give a faded look */}
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-transparent bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <p className="flex flex-col text-3xl sm:text-5xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
            {loading ? (
              <span className="loader">
                <span className="loader-text">loading</span>
                <span className="load"></span>
              </span>
            ) : (
              <span>No Saved Assignment</span>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
