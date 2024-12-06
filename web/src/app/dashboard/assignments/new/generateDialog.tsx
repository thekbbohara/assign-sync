import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Stars } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

export const GeneratePrompt = ({
  fn,
}: {
  fn: (prompt: string) => Promise<boolean>;
}) => {
  const promptRef = useRef<HTMLTextAreaElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <Dialog open={open}>
        <DialogTrigger>
          <Button
            className="flex gap-1"
            onClick={() => {
              console.log("generate assignment");
              setOpen(true);
            }}
          >
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
              className="flex gap-1"
              onClick={async (e) => {
                const textarea = promptRef.current;
                if (!textarea) return toast.error("Something went wrong.");
                const prompt = textarea.value;
                textarea.readOnly = true;
                e.currentTarget.disabled = true;
                const res = await fn(prompt);
                console.log(res);
                if (res) {
                  setOpen(false);
                }
              }}
            >
              <Stars />
              <span>Generate</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
