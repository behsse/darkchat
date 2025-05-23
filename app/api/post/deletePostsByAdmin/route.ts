import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { NextResponse } from "next/server";

export const DELETE = async (request: Request) => {
  const user = await getCurrentUser();

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id"); // Assurez-vous d'utiliser base 10

    // Vérifiez si l'ID est valide et si l'utilisateur est un administrateur
    if (!id || !user?.id || !user.admin) {
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }

    const data = await prisma.post.delete({
      where: {
        id: id, // Utilisez l'ID directement
      },
    });

    return NextResponse.json({ message: "Post deleted successfully", data });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json({ message: "Failed to delete post" }, { status: 500 });
  }
};
