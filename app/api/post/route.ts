"use server"

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

type User = {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    admin: boolean;
};

type Post = {
    id: number;
    text: string;
    completed: boolean;
    createdAt: Date;
    userId: string;
    user: User;
};

export const getPosts = async (): Promise<Post[]> => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                user: true
            }
        });
        return posts as Post[];
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const getPostById = async (id: number) => {
    try {
        const getPostById = await prisma.post.findUnique({
            where : {
                id : id
            }
        })
        return getPostById
    } catch (error) {
        console.log(error);
    }finally{
        prisma.$disconnect();
    }
}

export const createPost = async (formData : FormData) => {
    const user = await getCurrentUser()

    try {
        const results = await prisma.post.create ({
            data: {
                text : formData.get("text") as string,
                userId : user?.id as string
            }
        })
        return results
    } catch (error) {
        console.log(error);
    }finally{
        prisma.$disconnect();
    }
}