"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(3, "Class name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  subject: z.string().min(2, "Subject must be at least 2 characters"),
  admin: z.string(),
});

export function CreateClassDialog({
  admin,
  setRefresh,
}: {
  admin?: string;
  setRefresh: Dispatch<SetStateAction<boolean>>;
}) {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      subject: "",
      admin: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      name: values.name,
      subject: values.subject,
      description: values.description,
      admin: admin,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    try {
      const res = await fetch("/api/class", requestOptions);
      const data = await res.json();
      if (data.msg) {
        form.reset();
        setOpen(false);
        toast.success(data.msg);
        setRefresh(true);
      }
    } catch (e) {
      console.log("err", e);
      toast.error("Something went wrong.");
    }
    // Here you would typically make an API call to create the class
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          Create Class
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Create New Class</DialogTitle>
          <DialogDescription>
            Create a new class to manage assignments and students.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Web Development 101" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name that will be displayed to students.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="Programming" {...field} />
                  </FormControl>
                  <FormDescription>
                    The main subject or topic of the class.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Introduction to web development fundamentals..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A brief description of what students will learn.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Class</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
