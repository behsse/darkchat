import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get('postId');
    const userId = searchParams.get('userId');

    try {
        const likeCount = await prisma.like.count({
        where: {
            postId: postId || undefined,
        },
        });

        const isLikedByUser = await prisma.like.findFirst({
            where: {
                postId: postId || undefined,
                userId: userId || undefined,
            },
        });

        return NextResponse.json({
        likeCount,
        isLikedByUser: !!isLikedByUser,
        });
    } catch (error) {
        console.error("Error fetching like data:", error);
        return NextResponse.json({ error: "Error fetching like data" }, { status: 500 });
    }
}
