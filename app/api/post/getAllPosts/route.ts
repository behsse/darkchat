import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const data = await prisma.post.findMany({
      where: {
        parentId: null,
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const response = NextResponse.json(data);
    response.headers.set("Cache-Control", "no-store, max-age=0");       
    response.headers.set("Pragma", "no-store");       
    response.headers.set("Expires", "0");       
    return response;
  } 
  catch (error) {
    console.error("Error fetching posts:", error);
      
    return NextResponse.json({ message: "Failed to fetch posts" }, { status: 500 });
  }
};