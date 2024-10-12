import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get('postId');

    if (!postId) {
        return NextResponse.json({ replyCount: null });
    }

    try {
        const replyCount = await prisma.post.count({
            where: {
                parentId: postId || undefined,
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
