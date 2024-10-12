import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get('username');
    const session = await getServerSession(authOptions);

    if (!session || !username) {
        return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    try {
        const userToCheck = await prisma.user.findUnique({
            where: { username },
            select: { id: true },
        });

        if (!userToCheck) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const follow = await prisma.follow.findMany({
            where: {
                followerId: session.user.id,
                followingId: userToCheck.id,
            },
        });

        return NextResponse.json(follow);
    } catch (error) {
        console.error("Error fetching follow:", error);
        return NextResponse.json({ message: "Failed to fetch follow" }, { status: 500 });
    }
};
