"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IStudent } from "@/model/class";
import { PlusIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const Students = () => {
  const { data: session } = useSession(); // Use useSession hook to get session data
  const [students, setStudents] = useState<Partial<IStudent[]>>([]); // State to store total students count
  const [loading, setLoading] = useState<boolean>(true);

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
      setLoading(false);
    };
    if (session?.user?.id) {
      getStudents();
    }
  }, [session]); // Run when the session changes

  return (
    <>
      {students && students.length >= 1 ? (
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
      ) : (
        <div className="h-[calc(100svh-70px)] w-full dark:bg-transparent bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
          {/* Radial gradient for the container to give a faded look */}
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-transparent bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <p className="flex flex-col text-3xl sm:text-5xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
            {loading ? (
              <>Loading....</>
            ) : (
              <>
                <span>No students.</span>
              </>
            )}
          </p>
        </div>
      )}
    </>
  );
};

export default Students;
