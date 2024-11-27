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
import { Code2 } from "lucide-react";
import Link from "next/link";

export default function JoinClassPage() {
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
                <Input placeholder="Enter class code" />
              </div>
              <Button className="w-full">Join Class</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
