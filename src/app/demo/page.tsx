import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Code2, Play } from "lucide-react";
import Link from "next/link";

export default function DemoPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <nav className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Code2 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">CodeSync</span>
          </Link>
          <Button asChild>
            <Link href="/sign-in">Try it Free</Link>
          </Button>
        </div>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8">
        <div className="max-w-7xl w-full space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Interactive Demo</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the power of real-time code collaboration
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6 space-y-4">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Try the Editor</h2>
                <div className="bg-secondary rounded-lg p-4">
                  <pre className="text-sm">
                    {`function factorial(n) {
  // Type your code here
  // Press Run to test
}`}
                  </pre>
                </div>
                <Button className="w-full">
                  <Play className="h-4 w-4 mr-2" />
                  Run Code
                </Button>
              </div>
            </Card>

            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Real-time Collaboration</h4>
                      <p className="text-sm text-muted-foreground">
                        Watch and assist students as they code in real-time
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Instant Feedback</h4>
                      <p className="text-sm text-muted-foreground">
                        Provide immediate guidance and code reviews
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Built-in Testing</h4>
                      <p className="text-sm text-muted-foreground">
                        Automated test cases to verify student solutions
                      </p>
                    </div>
                  </li>
                </ul>
              </Card>

              <div className="text-center">
                <Button size="lg" asChild>
                  <Link href="/signup">Start Teaching Today</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
