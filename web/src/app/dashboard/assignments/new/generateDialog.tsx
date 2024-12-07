import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Stars, Loader } from "lucide-react"; // Use Loader for spinner
import { useRef, useState } from "react";
import { toast } from "sonner";

export const GeneratePrompt = ({
  fn,
}: {
  fn: (prompt: string) => Promise<boolean>;
}) => {
  const promptRef = useRef<HTMLTextAreaElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleGenerate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const textarea = promptRef.current;

    if (!textarea) {
      toast.error("Something went wrong.");
      return;
    }

    const prompt = textarea.value.trim();
    if (!prompt) {
      toast.error("Prompt cannot be empty.");
      return;
    }

    setIsGenerating(true);
    textarea.readOnly = true; // Disable editing
    e.currentTarget.disabled = true; // Disable button during generation

    try {
      const success = await fn(prompt);
      if (success) {
        toast.success("Assignment generated successfully!");
        setOpen(false); // Close the dialog
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate assignment.");
    } finally {
      setIsGenerating(false);
      textarea.readOnly = false;
      e.currentTarget.disabled = false;
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="flex gap-1">
            <Stars />
            <span>Generate</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Generate Assignment</DialogTitle>
          <div>
            <Textarea
              ref={promptRef}
              rows={6}
              placeholder="Create an intermediate-level JavaScript assignment to teach recursion and dynamic programming by implementing an efficient function for computing the nth Fibonacci number, with a focus on handling large inputs."
            />
          </div>
          <DialogFooter>
            <Button
              className="flex gap-2 items-center"
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <Loader className="animate-spin w-5 h-5" />
              ) : (
                <Stars />
              )}
              <span>{isGenerating ? "Generating..." : "Generate"}</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
