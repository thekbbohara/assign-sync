import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, Timer, Users } from "lucide-react";
import Link from "next/link";

const assignments = [
  {
    id: 1,
    title: "JavaScript Basics",
    description: "Introduction to variables, functions, and control flow",
    dueDate: "2024-02-01",
    studentsSubmitted: 15,
    totalStudents: 25,
  },
  {
    id: 2,
    title: "React Components",
    description: "Building reusable React components and managing state",
    dueDate: "2024-02-05",
    studentsSubmitted: 8,
    totalStudents: 25,
  },
];

export default function AssignmentsPage() {
  return (
    <div className="p-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {assignments.map((assignment) => (
          <Card key={assignment.id}>
            <CardHeader>
              <CardTitle>{assignment.title}</CardTitle>
              <CardDescription>{assignment.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Timer className="mr-1 h-4 w-4" />
                    Due {assignment.dueDate}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Users className="mr-1 h-4 w-4" />
                    {assignment.studentsSubmitted}/{assignment.totalStudents}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="secondary" className="w-full" asChild>
                    <Link href={`/dashboard/assignments/${assignment.id}`}>
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
    </div>
  );
}