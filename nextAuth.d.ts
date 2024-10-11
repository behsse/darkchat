import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      admin: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    username : string;
    admin: boolean;
  }

  interface Profile {
    picture?: string;
  }
}