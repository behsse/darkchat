import prisma from "@/lib/prisma";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get('postId');

    try {
        const replyCount = await prisma.post.count({
            where: {
                parentId: postId,
            },
        });

        if(!replyCount){
            return NextResponse.json({ replyCount: 0 });
        }
        
        return NextResponse.json({
            replyCount,
        });
    } catch (error) {
        console.error("Error fetching like data:", error);
        return NextResponse.json({ error: "Error fetching like data" }, { status: 500 });
    }
}