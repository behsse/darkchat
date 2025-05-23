import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get("postId");

  if (!postId) {
    return NextResponse.json({ error: "PostID is missing" }, { status: 400 });
  }

  try {
    const data = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        id: true,
        text: true,
        completed: true,
        createdAt: true,
        userId: true,
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
        likes: {
          select: {
            id: true,
            userId: true,
          },
        },
        replies: {
          select: {
            id: true,
            text: true,
            completed: true,
            createdAt: true,
            userId: true,
            user: {
              select: {
                id: true,
                name: true,
                username: true,
                image: true,
              },
            },
            likes: {
              select: {
                id: true,
                userId: true,
              },
            },
          },
        },
      },
      
    });

    if (!data) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while fetching the user" },
      { status: 500 }
    );
  }
};
