import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const PUT = async (request: Request) => {
    const { username, name, bio } = await request.json();

    if (!username) {
        return NextResponse.json({ error: "Username and name and bio are required" }, { status: 400 });
    }

    try {
        const updatedUser = await prisma.user.update({
            where: { username: username },
            data: { 
                name: name,
                bio: bio,
            },
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        return NextResponse.json(
            { error: "An error occurred while updating the name or bio" },
            { status: 500 }
        );
    }
};