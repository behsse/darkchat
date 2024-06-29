"use server"

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export const getPosts = async () => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                user: true
            }
        });
        return posts;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const getAllPosts = async () => {
    const data = await prisma.post.findMany({
        include: {
            user: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });
    return data
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