import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateClassDialog } from "@/components/classes/create-class-dialog";
import { Button } from "@/components/ui/button";
import { Users, Link as LinkIcon } from "lucide-react";
import Link from "next/link";

const classes = [
  {
    id: 1,
    name: "Web Development 101",
    description: "Introduction to HTML, CSS, and JavaScript",
    students: 25,
    code: "WD101",
  },
  {
    id: 2,
    name: "Advanced React",
    description: "Deep dive into React hooks and patterns",
    students: 15,
    code: "AR202",
  },
];

export default function ClassesPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Classes</h1>
        <CreateClassDialog />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {classes.map((classItem) => (
          <Card key={classItem.id} className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle>{classItem.name}</CardTitle>
              <CardDescription>{classItem.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="mr-1 h-4 w-4" />
                    {classItem.students} Students
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Code: {classItem.code}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button className="w-full" asChild>
                    <Link href={`/dashboard/classes/${classItem.id}`}>
                      View Class
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon">
                    <LinkIcon className="h-4 w-4" />
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
