import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    const { postId, userId } = await req.json();

    try {
        const existingLike = await prisma.like.findFirst({
            where: {
                postId: postId,
                userId: userId,
            },
        });

        if (existingLike) {
            await prisma.like.delete({
                where: {
                    id: existingLike.id,
                },
            });
            return NextResponse.json({ message: 'Post unliked' });
        } else {
            // Sinon, on ajoute un nouveau like
            await prisma.like.create({
                data: {
                    postId: postId,
                    userId: userId,
                },
            });
            return NextResponse.json({ message: 'Post liked' });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }  
}