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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { useState } from "react";

export default function CreateAssignmentPage() {
  const [dueDate, setDueDate] = useState<Date>();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Create Assignment</h1>
          <p className="text-muted-foreground">
            Create a new coding assignment for your class
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Assignment Details</CardTitle>
              <CardDescription>
                Basic information about the assignment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input placeholder="JavaScript Basics" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Write a detailed description of the assignment..."
                  className="h-32"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Class</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web-dev">Web Development 101</SelectItem>
                    <SelectItem value="react">Advanced React</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Due Date</label>
                <DatePicker
                  date={dueDate}
                  setDate={setDueDate}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Test Cases</CardTitle>
              <CardDescription>
                Define test cases to verify student solutions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                className="font-mono text-sm h-48"
                placeholder={`test('factorial of 0 is 1', () => {
  expect(factorial(0)).toBe(1);
});`}
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Starter Code</CardTitle>
              <CardDescription>
                Provide initial code for students
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                className="font-mono text-sm h-48"
                placeholder={`function factorial(n) {
  // Your code here
}`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Solution</CardTitle>
              <CardDescription>
                Reference solution (only visible to you)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                className="font-mono text-sm h-48"
                placeholder={`function factorial(n) {
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}`}
              />
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-2">
            <Button variant="outline">Save as Draft</Button>
            <Button>Publish Assignment</Button>
          </div>
        </div>
      </div>
    </div>
  );
}