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
import { ObjectId } from "mongoose";
import { GeneratePrompt } from "./generateDialog";

interface TestCase {
  id: string;
  input: string;
  expected: string;
}

export default function CreateAssignmentPage() {
  const [dueDate, setDueDate] = useState<Date>();
  const [classes, setClasses] = useState([]);
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [selectedClass, setSelectedClass] = useState<ObjectId>();
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [requirements, setRequirements] = useState<string[]>([""]);
  const [examples, setExamples] = useState<string[]>([""]);
  const instructionsRef = useRef<HTMLTextAreaElement>(null);
  const [testCases, setTestCases] = useState<TestCase[]>([
    { id: "1", input: "", expected: "" },
  ]);
  const codeTemplateRef = useRef<HTMLTextAreaElement>(null);
  const outputRef = useRef<HTMLTextAreaElement>(null);

  const handleAddRequirement = () => {
    setRequirements([...requirements, ""]);
  };

  const handleRemoveRequirement = (index: number) => {
    const newRequirements = [...requirements];
    newRequirements.splice(index, 1);
    setRequirements(newRequirements);
  };

  const handleRequirementChange = (index: number, value: string) => {
    const newRequirements = [...requirements];
    newRequirements[index] = value;
    setRequirements(newRequirements);
  };

  const handleAddExample = () => {
    setExamples([...examples, ""]);
  };

  const handleRemoveExample = (index: number) => {
    const newExamples = [...examples];
    newExamples.splice(index, 1);
    setExamples(newExamples);
  };

  const handleExampleChange = (index: number, value: string) => {
    const newExamples = [...examples];
    newExamples[index] = value;
    setExamples(newExamples);
  };

  const handleAddTestCase = () => {
    setTestCases([
      ...testCases,
      { id: Date.now().toString(), input: "", expected: "" },
    ]);
  };

  const handleRemoveTestCase = (id: string) => {
    setTestCases(testCases.filter((testCase) => testCase.id !== id));
  };

  const handleTestCaseChange = (
    id: string,
    field: "input" | "expected",
    value: string,
  ) => {
    setTestCases(
      testCases.map((testCase) =>
        testCase.id === id ? { ...testCase, [field]: value } : testCase,
      ),
    );
  };

  const handlePublish = async () => {
    // Check for required references
    if (
      !titleRef.current ||
      !descriptionRef.current ||
      !instructionsRef.current ||
      !codeTemplateRef.current ||
      !outputRef.current
    ) {
      return toast.error("Something went wrong. Try again.");
    }

    // Extract values from refs
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const instructions = instructionsRef.current.value;
    const codeTemplate = codeTemplateRef.current.value;
    const output = outputRef.current.value;
    console.log({
      title,
      description,
      instructions,
      codeTemplate,
      output,
      selectedClass,
    });
    // Check if all required fields are filled
    if (!title || !description || !codeTemplate || !selectedClass) {
      return toast.error("Please fill out all required fields.");
    }

    // Check if the user is authenticated and has a valid user ID
    if (!userId) {
      return toast.error("User not authenticated.");
    }

    // Prepare data for the request
    const payload = {
      title,
      description,
      requirements,
      examples,
      instructions,
      testCases,
      codeTemplate,
      output,
      dueDate,
      class: selectedClass,
      user: userId, // Use userId directly instead of headers
    };

    try {
      // Send POST request to create the assignment
      const res = await fetch("/api/assignment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
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

  // const handleAssignmentGeneration = (prompt) => {
  //   // call the api
  //   // fill the assignment feilds
  // };

  useEffect(() => {
    const fetchClasses = async () => {
      const res = await fetch("/api/class", { headers: { user: userId! } });
      const data = await res.json();
      setClasses(data);
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
        <div>
          <GeneratePrompt />
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
                <Input
                  ref={titleRef}
                  placeholder="JavaScript Basics"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  ref={descriptionRef}
                  placeholder="Write a detailed description of the assignment..."
                  className="h-32"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Class</label>
                <Select
                  required
                  onValueChange={(value) => {
                    setSelectedClass(value as unknown as ObjectId);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.length >= 1 &&
                      classes.map((classItem: IClass) => (
                        <SelectItem
                          key={String(classItem._id)}
                          value={String(classItem._id)}
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
              <CardTitle>Instructions</CardTitle>
              <CardDescription>
                Provide detailed instructions for the assignment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                ref={instructionsRef}
                className="h-48"
                placeholder="Write step-by-step instructions for completing the assignment..."
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
              <CardDescription>
                List the requirements for this assignment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {requirements.map((req, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={req}
                    onChange={(e) =>
                      handleRequirementChange(index, e.target.value)
                    }
                    placeholder={`Requirement ${index + 1}`}
                  />
                  {requirements.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveRequirement(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button onClick={handleAddRequirement}>Add Requirement</Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Examples</CardTitle>
              <CardDescription>
                Provide examples to illustrate the assignment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {examples.map((example, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={example}
                    onChange={(e) => handleExampleChange(index, e.target.value)}
                    placeholder={`Example ${index + 1}`}
                  />
                  {examples.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveExample(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button onClick={handleAddExample}>Add Example</Button>
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
                  <Input
                    placeholder="Input"
                    value={testCase.input}
                    onChange={(e) =>
                      handleTestCaseChange(testCase.id, "input", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Expected Output"
                    value={testCase.expected}
                    onChange={(e) =>
                      handleTestCaseChange(
                        testCase.id,
                        "expected",
                        e.target.value,
                      )
                    }
                  />
                </div>
              ))}
              <Button onClick={handleAddTestCase}>Add Test Case</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Code Template</CardTitle>
              <CardDescription>
                Provide initial code for students
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                ref={codeTemplateRef}
                className="font-mono text-sm h-48"
                placeholder={`function solution(input) {
  // Your code here
}`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Expected Output</CardTitle>
              <CardDescription>
                Describe the expected output format
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                ref={outputRef}
                className="h-24"
                placeholder="Describe the expected output format..."
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
