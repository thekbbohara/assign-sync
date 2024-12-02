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
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { FormEvent, Suspense, useState } from "react";
import { toast } from "sonner";

async function simulateAsyncOperation(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 1000));
}

const JoinClassContent: React.FC<{ onSubmit: (e: FormEvent) => void }> = ({
  onSubmit,
}) => {
  const [code, setCode] = useQueryState("code", { defaultValue: "" });

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Join Class</CardTitle>
        <CardDescription>
          Enter the class code provided by your teacher to join.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium">Class Code</label>
            <Input
              placeholder="Enter class code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Join Class
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

const LoadingSkeleton = () => (
  <main className="min-h-[85vh] flex flex-col">
    <div className="flex-1 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full mt-2" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  </main>
);

export default function JoinClassPage() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const joinClass = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await simulateAsyncOperation();

    const code = new URLSearchParams(window.location.search).get("code");

    if (!code || !userId) {
      toast.error("Something went wrong!");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch(`/api/class/join`, {
        method: "PUT",
        body: JSON.stringify({ code, userId }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (!data.err) {
        toast.success(data.msg);
        router.push(`/dashboard/classes/${data.class_id}`);
      } else {
        toast.error(data.msg || "Something went wrong.");
      }
    } catch {
      toast.error("An error occurred!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <main className="min-h-[85vh] flex flex-col">
        <div className="flex-1 flex items-center justify-center p-4">
          {isSubmitting ? (
            <LoadingSkeleton />
          ) : (
            <JoinClassContent onSubmit={joinClass} />
          )}
        </div>
      </main>
    </Suspense>
  );
}
