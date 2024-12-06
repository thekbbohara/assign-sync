"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IStudent } from "@/model/class";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const Students = () => {
  const { data: session } = useSession(); // Use useSession hook to get session data
  const [students, setStudents] = useState<Partial<IStudent[]>>([]); // State to store total students count

  // Fetch total student count when the session is available
  useEffect(() => {
    const getStudents = async () => {
      if (!session?.user?.id) return; // Ensure userId exists
      const userId = session.user.id;

      try {
        const res = await fetch("/api/students", {
          headers: {
            userId: userId,
          },
        });
        const { data, err }: { data: IStudent[]; err: string | null } =
          await res.json();
        if (err) {
          console.error("Error fetching total students:", err);
        } else {
          setStudents(data);
          console.log(data);
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };

    if (session?.user?.id) {
      getStudents();
    }
  }, [session]); // Run when the session changes

  return (
    <>
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
          {students &&
            students.length >= 1 &&
            students.map((student) => (
              <TableRow key={String(student?._id)}>
                <TableCell>{student?.name}</TableCell>
                <TableCell>{student?.email}</TableCell>
                <TableCell>
                  {student?.joinedAt
                    ? new Date(student.joinedAt).toLocaleDateString("en-CA")
                    : "today"}
                </TableCell>
                <TableCell>
                  {student?.completedAssignments ?? "0"}/
                  {student?.totalAssignments ?? ""} completed
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Students;
