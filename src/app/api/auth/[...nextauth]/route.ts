import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import NextAuth, { JWT } from "next-auth";
import GithubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/sign-in", // Custom sign-in page
  },
  callbacks: {
    // This callback is triggered when the JWT token is created
    async jwt({ token, account, profile }) {
      if (account && profile) {
        // Attach additional GitHub profile data to the token
        try {
          token.accessToken = account.access_token!;
          token.username = profile.login; // GitHub username
          await dbConnect()
          const userExists = await UserModel.exists({ email: profile.email })
          console.log({ userExists })
          if (userExists) return token
          const newUser = new UserModel({
            email: profile.email,
            name: profile.name || profile.login,
            username: profile.login,
            avatar: profile.avatar_url

          })
          await newUser.save()
        } catch (err) {
          console.log(err)
        }
      }
      return token;
    },

    // This callback is triggered whenever a session is created or updated
    async session({ session, token }) {
      // Cast the `token` to the custom `JWT` type
      if (session.user) {
        // Attach the JWT token details to the session
        session.user.id = token.sub!;
        session.user.name = token.name!;
        session.user.email = token.email!;
        session.user.avatar = token.picture!;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
