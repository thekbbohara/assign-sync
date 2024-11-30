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
import { useEffect, useState } from "react";
import { IClass } from "@/model/class";
import { useParams } from "next/navigation";
import { IAssignment } from "@/model/assignment";
import Link from "next/link";
export default function ClassDetailPage() {
  const [copied, setCopied] = useState(false);
  const [classDetail, setClassDetail] = useState<Partial<IClass>>({});
  const [assignments, setAssignments] = useState<Partial<IAssignment>[]>([]);
  console.log({ assignments });
  const params = useParams();
  const classId: string = String(params.id);
  const copyInviteCode = () => {
    if (!classDetail.inviteCode) return;
    navigator.clipboard.writeText(classDetail.inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const fetchClassDetail = async (classId: string) => {
    if (!classId) return;
    const res = await fetch(`/api/class/${classId}`);
    const data = await res.json();
    setClassDetail(data);
    return data;
  };
  const fetchAssigments = async (classId: string) => {
    if (!classId) return;
    const res = await fetch(`/api/assignment/${classId}`);
    const data = await res.json();
    setAssignments(data);
    return data;
  };
  useEffect(() => {
    fetchClassDetail(classId);
    fetchAssigments(classId);
  }, []);
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{classDetail.name}</h1>
          <p className="text-muted-foreground">{classDetail?.description}</p>
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
                  Share this code with your students or invite them directly via
                  email.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Class Code</label>
                  <div className="flex space-x-2">
                    <Input value={classDetail?.inviteCode} readOnly />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={copyInviteCode}
                    >
                      {copied ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Email Invitation
                  </label>
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
                {classDetail.students &&
                  classDetail.students.length >= 1 &&
                  classDetail.students.map((student) => (
                    <TableRow key={String(student?._id)}>
                      <TableCell>{student?.name}</TableCell>
                      <TableCell>{student?.email}</TableCell>
                      <TableCell>
                        {student?.joinedAt?.toString() || "today"}
                      </TableCell>
                      <TableCell>
                        {student?.completedAssignments}/
                        {student?.totalAssignments} completed
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
        <TabsContent value="assignments">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {assignments &&
              assignments.length >= 1 &&
              assignments.map((assignment) => (
                <Card key={String(assignment._id)}>
                  <CardHeader>
                    <CardTitle>{assignment.title}</CardTitle>
                    <CardDescription>
                      Due: {assignment?.dueDate?.toString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">
                        {`${assignment?.submissions?.length || 0}/${assignments.length} submitted`}
                      </div>
                      <Button>
                        <Link href={`/dashboard/assignments/${assignment._id}`}>
                          View Details
                        </Link>
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
