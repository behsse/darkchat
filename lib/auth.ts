import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "./prisma";

export const authOptions : AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    callbacks: {
        session: async({session, user}) => {
            if(session.user){
                session.user.id = user.id
                session.user.admin = user.admin
            }
            return session
        }
    }
}