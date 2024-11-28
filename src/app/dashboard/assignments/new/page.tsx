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
import { useEffect, useRef, useState } from "react";
import { IClass } from "@/model/class";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface TestCase {
  id: string;
  code: string;
}

export default function CreateAssignmentPage() {
  const [dueDate, setDueDate] = useState<Date>();
  const [classes, setClasses] = useState([]);
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [selectedClass, setSelectedClass] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const starterCodeRef = useRef<HTMLTextAreaElement>(null);
  const solutionRef = useRef<HTMLTextAreaElement>(null);
  const [testCases, setTestCases] = useState<TestCase[]>([
    { id: "1", code: "" },
  ]);

  const handleAddTestCase = () => {
    setTestCases([...testCases, { id: Date.now().toString(), code: "" }]);
  };

  const handleRemoveTestCase = (id: string) => {
    setTestCases(testCases.filter((testCase) => testCase.id !== id));
  };

  const handleTestCaseChange = (id: string, code: string) => {
    setTestCases(
      testCases.map((testCase) =>
        testCase.id === id ? { ...testCase, code } : testCase,
      ),
    );
  };

  const handlePublish = async () => {
    if (
      !titleRef.current ||
      !descriptionRef.current ||
      !starterCodeRef.current ||
      !solutionRef.current
    )
      return toast.error("Something went wrong. Try again.");

    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const starterCode = starterCodeRef.current.value;
    const solution = solutionRef.current.value;

    if (!title || !description || !dueDate || !selectedClass) {
      toast.error("Please fill out all required fields.");
      return;
    }

    try {
      const res = await fetch("/api/assignment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          user: userId!,
        },
        body: JSON.stringify({
          title,
          description,
          starterCode,
          solution,
          dueDate,
          class: selectedClass,
          testCases: testCases.map((tc) => tc.code),
        }),
      });

      if (res.ok) {
        toast.success("Assignment published successfully!");
      } else {
        const error = await res.json();
        toast.error(`Error: ${error.message}`);
      }
    } catch (err) {
      console.error("Failed to publish assignment:", err);
      toast.error("Failed to publish assignment. Please try again.");
    }
  };

  useEffect(() => {
    const fetchClasses = async () => {
      const res = await fetch("/api/class", { headers: { user: userId! } });
      const data = await res.json();
      setClasses(data);
      console.log(data, selectedClass);
    };
    if (userId) {
      fetchClasses();
    }
  }, [userId]);

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
                <Input ref={titleRef} placeholder="JavaScript Basics" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  ref={descriptionRef}
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
                    {classes.length >= 1 &&
                      classes.map((classItem: IClass) => (
                        <SelectItem
                          key={String(classItem._id)}
                          value={String(classItem._id)}
                          onClick={() => {
                            setSelectedClass(String(classItem._id));
                          }}
                        >
                          {classItem.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Due Date</label>
                <DatePicker date={dueDate} setDate={setDueDate} />
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
            <CardContent className="space-y-4">
              {testCases.map((testCase, index) => (
                <div key={testCase.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">
                      Test Case {index + 1}
                    </label>
                    {testCases.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveTestCase(testCase.id)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                  <Textarea
                    className="font-mono text-sm h-24"
                    value={testCase.code}
                    onChange={(e) =>
                      handleTestCaseChange(testCase.id, e.target.value)
                    }
                    placeholder={`test('factorial of 0 is 1', () => {
  expect(factorial(0)).toBe(1);
});`}
                  />
                </div>
              ))}
              <Button onClick={handleAddTestCase}>Add Test Case</Button>
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
                ref={starterCodeRef}
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
                ref={solutionRef}
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
            <Button onClick={handlePublish}>Publish Assignment</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
