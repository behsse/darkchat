"use server"

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
      
    return NextResponse.json(data);
  } 
  catch (error) {
    console.error("Error fetching posts:", error);
      
    return NextResponse.json({ message: "Failed to fetch posts" }, { status: 500 });
  }
};