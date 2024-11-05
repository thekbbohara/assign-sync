import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Code2, GraduationCap } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <nav className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Code2 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Assign-Sync</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8">
        <div className="max-w-7xl w-full space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
              Real-time Code Assignment Platform
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Seamlessly create, assign, and review coding assignments with live collaboration
              between teachers and students.
            </p>
            <div className="flex items-center justify-center gap-4 pt-4">
              <Button size="lg" asChild>
                <Link href="/dashboard/assignments">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/demo">View Demo</Link>
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">For Teachers</h2>
              </div>
              <p className="text-muted-foreground">
                Create and manage coding assignments, monitor student progress in real-time,
                and provide instant feedback during the coding process.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  Real-time student code monitoring
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  Integrated feedback system
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  Assignment templates and versioning
                </li>
              </ul>
            </Card>

            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Code2 className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">For Students</h2>
              </div>
              <p className="text-muted-foreground">
                Work on assignments in a professional development environment with real-time
                teacher support and instant feedback.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  Professional code editor
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  Live collaboration features
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  Instant teacher assistance
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>

      <footer className="border-t bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            © 2024 CodeSync. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
