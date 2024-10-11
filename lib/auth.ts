import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "./prisma";
import generateUniqueUsername from "./generateUniqueUsername";

export const authOptions : NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {

            if (!profile || !profile.email) {
                return false;
            }

            const existingUser = await prisma.user.findUnique({
                where: { 
                    email: profile.email 
                }
            });

            if (!existingUser) {
                const uniqueUsername = await generateUniqueUsername(profile.name || "");
                const newUser = await prisma.user.create({
                    data: {
                        name: profile.name,
                        username: uniqueUsername, 
                        email: profile.email,
                        image: profile.picture || profile.image,
                        admin: false
                    }
                });
                if(account){
                    await prisma.account.create({
                        data: {
                            userId: newUser.id,
                            provider: account.provider,
                            providerAccountId: account.providerAccountId,
                            type: account.type,
                            // Ajoutez d'autres champs si nécessaire
                        }
                    });
                }
            }
            return true;
        },
        session: async({session, user}) => {
            if(session.user){
                session.user.id = user.id
                session.user.admin = user.admin
                session.user.username = user.username
            }
            return session
        }
    }
}
