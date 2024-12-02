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
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Bell, Github, Mail, User } from "lucide-react";
import { toast } from "sonner";

export default function ProfilePage() {
  const { data: session } = useSession();

  const handleSaveNotifications = () => {
    toast.success("Notification preferences saved");
  };

  const handleSaveProfile = () => {
    toast.success("Profile updated successfully");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Profile</h2>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={session?.user?.image || ""} />
                <AvatarFallback>
                  <User className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h3 className="font-semibold">{session?.user?.name}</h3>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{session?.user?.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Github className="h-4 w-4" />
                  <span>GitHub Connected</span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="display-name">Display Name</Label>
                <Input
                  id="display-name"
                  defaultValue={session?.user?.name || ""}
                  placeholder="Your display name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  placeholder="Tell us about yourself"
                />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <div className="flex space-x-2">
                  <Badge>Teacher</Badge>
                </div>
              </div>
              <Button onClick={handleSaveProfile}>Save Changes</Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Configure your notification preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="assignment-notifications" className="flex flex-col space-y-1">
                  <span>Assignment Updates</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Receive notifications about assignment submissions and feedback.
                  </span>
                </Label>
                <Switch id="assignment-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="class-notifications" className="flex flex-col space-y-1">
                  <span>Class Announcements</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Get notified about important class announcements.
                  </span>
                </Label>
                <Switch id="class-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
                  <span>Email Notifications</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Receive notifications via email.
                  </span>
                </Label>
                <Switch id="email-notifications" defaultChecked />
              </div>
              <Button onClick={handleSaveNotifications} className="w-full">
                <Bell className="h-4 w-4 mr-2" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Connected Accounts</CardTitle>
              <CardDescription>Manage your connected accounts and services.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Github className="h-5 w-5" />
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">GitHub</p>
                    <p className="text-xs text-muted-foreground">
                      Connected to {session?.user?.email}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Disconnect</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
