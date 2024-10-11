import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const POST = async (request: Request, { params }: { params: { postId: string } }) => {
  const postId = params.postId;
  const { text, userId } = await request.json();

  if (!text || !userId) {
    return NextResponse.json({ error: "Text or userId is missing" }, { status: 400 });
  }

  try {
    const parentPost = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!parentPost) {
      return NextResponse.json({ error: "Parent post not found" }, { status: 404 });
    }

    const reply = await prisma.post.create({
      data: {
        text,
        userId,
        parentId: postId,
      },
      select: {
        id: true,
        text: true,
        completed: true,
        createdAt: true,
        userId: true,
        parentId: true,
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(reply, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while creating the reply" },
      { status: 500 }
    );
  }
};
