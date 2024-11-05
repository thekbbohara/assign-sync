"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { UserPlus, Mail, Copy, Check } from "lucide-react";
import { useState } from "react";

const students = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    joinedAt: "2024-01-15",
    completedAssignments: 8,
    totalAssignments: 10,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    joinedAt: "2024-01-16",
    completedAssignments: 7,
    totalAssignments: 10,
  },
];

const assignments = [
  {
    id: 1,
    title: "JavaScript Basics",
    dueDate: "2024-02-01",
    submissions: 15,
    totalStudents: 25,
  },
  {
    id: 2,
    title: "React Components",
    dueDate: "2024-02-05",
    submissions: 8,
    totalStudents: 25,
  },
];

export default function ClassDetailPage() {
  const [copied, setCopied] = useState(false);
  const inviteCode = "WD101";

  const copyInviteCode = () => {
    navigator.clipboard.writeText(inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Web Development 101</h1>
          <p className="text-muted-foreground">Introduction to web development</p>
        </div>
        <div className="flex space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Invite Students
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite Students</DialogTitle>
                <DialogDescription>
                  Share this code with your students or invite them directly via email.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Class Code</label>
                  <div className="flex space-x-2">
                    <Input value={inviteCode} readOnly />
                    <Button variant="outline" size="icon" onClick={copyInviteCode}>
                      {copied ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Invitation</label>
                  <div className="flex space-x-2">
                    <Input type="email" placeholder="student@example.com" />
                    <Button>
                      <Mail className="h-4 w-4 mr-2" />
                      Send
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="students">
        <TabsList>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
        </TabsList>
        <TabsContent value="students">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Progress</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.joinedAt}</TableCell>
                    <TableCell>
                      {student.completedAssignments}/{student.totalAssignments} completed
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
        <TabsContent value="assignments">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {assignments.map((assignment) => (
              <Card key={assignment.id}>
                <CardHeader>
                  <CardTitle>{assignment.title}</CardTitle>
                  <CardDescription>Due: {assignment.dueDate}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      {assignment.submissions}/{assignment.totalStudents} submitted
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}