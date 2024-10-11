"use server"

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { NextResponse } from "next/server";

export const DELETE = async (request : Request) => {
    const user = await getCurrentUser()

    try {
        const url = new URL(request.url);
        const id = parseInt(url.searchParams.get("id") as string);

        if (!id || !user?.id || !user.admin) {
            return NextResponse.json({ message: "Invalid data" }, { status: 400 });
        }

        const data = await prisma.post.delete({
            where: {
                id: id.toString(),
            },
        });
        
        return NextResponse.json({ message: "Post deleted successfully", data });
    } catch (error) {
        console.error("Error deleting post:", error);
        return NextResponse.json({ message: "Failed to delete post" }, { status: 500 });
    }
}