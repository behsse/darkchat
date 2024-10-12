import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get('username');
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    if (!username) {
        return NextResponse.json({ error: "Username is missing" }, { status: 400 });
    }

    const userId = session.user.id;

    // Trouver l'utilisateur à suivre
    const userToFollow = await prisma.user.findUnique({
        where: { username },
        select: { id: true },
    });

    if (!userToFollow) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Vérifie si déjà following
    const alreadyFollowing = await prisma.follow.findFirst({
        where: {
            followerId: userId,
            followingId: userToFollow.id,
        },
    });

    // Si déjà following, unfollow (supprime)
    if (alreadyFollowing) {
        await prisma.follow.deleteMany({
            where: {
                followerId: userId,
                followingId: userToFollow.id,
            },
        });
        return NextResponse.json({ success: true, message: "Unfollowed successfully" });
    } else {
        // Sinon, follow (ajoute)
        const follow = await prisma.follow.create({
            data: {
                followerId: userId,
                followingId: userToFollow.id,
            },
        });

        return NextResponse.json(follow);
    }
}
