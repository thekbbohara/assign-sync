
import NextAuth, { DefaultSession, Profile } from "next-auth";
import { GithubProfile } from "next-auth/providers/github";

// Augmenting the Session interface
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string;
      email: string | null;
      avatar?: string | null;
      username: string;
    } & DefaultSession["user"];
  }

  // Augmenting the JWT interface
  interface JWT {
    id: string;            // GitHub user ID
    name: string;          // GitHub user name
    email: string | null;  // User's email
    avatar: string | null;  // Avatar URL
    username: string;     // GitHub username (login)
  }

  // Augmenting the Profile interface for GitHub provider
  interface Profile extends GithubProfile {
    id: string;
    login: string;         // GitHub username (login)
    name: string | null;   // GitHub full name
    email: string | null;  // GitHub email
    avatar_url: string;    // URL of the user's GitHub avatar
  }
}
