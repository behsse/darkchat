import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get('postId');

    if (!postId) {
        return NextResponse.json({ replyCount: 0 });
    }

    try {
        const replyCount = await prisma.post.count({
            where: {
                parentId: postId,
            },
        });

        return NextResponse.json({
            replyCount,
        });
    } catch (error) {
        console.error("Error fetching replies count:", error);
        return NextResponse.json({ error: "Error fetching replies count" }, { status: 500 });
    }
}
