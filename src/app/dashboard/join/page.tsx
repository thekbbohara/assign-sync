"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { FormEvent } from "react";
import { toast } from "sonner";

export default function JoinClassPage() {
  const [code, setCode] = useQueryState("code", { defaultValue: "" });
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const router = useRouter();
  const joinClass = async (e: FormEvent) => {
    e.preventDefault();
    if (!code || !userId) return toast.success("Something went wrong!");
    const res = await fetch(`/api/class/join`, {
      method: "PUT",
      body: JSON.stringify({ code, userId }),
    });

    const data = await res.json();
    if (!data.err) {
      router.push(`/dashboard/classes/${data.class._id}`);
    }
  };
  return (
    <main className="min-h-[85vh] flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Join Class</CardTitle>
            <CardDescription>
              Enter the class code provided by your teacher to join.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Class Code</label>
                <Input
                  placeholder="Enter class code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
              <Button className="w-full" onClick={joinClass}>
                Join Class
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
