"use client";

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
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { IClass } from "@/model/class";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/ui/loading";
import { GridBackground } from "@/components/grid-background";

export default function ClassesPage() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [classes, setClasses] = useState<IClass[]>([]);
  const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const getClasses = async () => {
      const res = await fetch("/api/class", {
        headers: {
          user: userId!,
        },
      });
      const data: IClass[] = await res.json();
      setClasses(data);
      setLoading(false);
    };
    if (userId && refresh) {
      getClasses();
      setRefresh(false);
    }
  }, [userId, refresh]);
  return (
    <div className={cn(classes.length >= 1 ? "p-6 space-y-6" : "pt-6")}>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Classes</h1>
        <CreateClassDialog admin={userId} setRefresh={setRefresh} />
      </div>
      {classes.length >= 1 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {classes.map((classItem, id) => (
            <Card
              key={String(classItem?._id) || id}
              className="flex flex-col justify-between"
            >
              <CardHeader>
                <CardTitle>{classItem?.name}</CardTitle>
                <CardDescription>{classItem?.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="mr-1 h-4 w-4" />
                      {classItem?.students?.length} Students
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Code: {classItem?.inviteCode}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button className="w-full" asChild>
                      <Link href={`/dashboard/classes/${classItem._id}`}>
                        View Class
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${process.env.NEXT_PUBLIC_URL}/dashboard/join?code=${classItem?.inviteCode}`,
                        );
                      }}
                    >
                      <LinkIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <GridBackground className="h-[calc(100svh-70px)] pt-1">
          {loading ? <Loader /> : <span>No Class Joined/Created.</span>}
        </GridBackground>
      )}
    </div>
  );
}
