"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

  const fetchAssignments = async () => {
    const res = await fetch("/api/assignment", {
      headers: { user: String(userId) },
    });
    const data = await res.json();
    if (data.err) return toast.error(data.msg);
    setAssignments(data.assignments);
  };
  useEffect(() => {
    if (!userId) return;
    fetchAssignments();
  }, [userId]);
  return (
    <div className="p-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {assignments.length >= 1 ? (
          assignments.map((assignment) => (
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
          ))
        ) : (
          <div>No Saved Assignment.</div>
        )}
      </div>
    </div>
  );
}
