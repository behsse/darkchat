import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { NextResponse } from "next/server";

export const POST = async (request : Request) => {
    const user = await getCurrentUser()

    try {
        const formData = await request.formData()
        const text = formData.get("text") as string;

        if (!text || !user?.id) {
            return NextResponse.json({ message: "Invalid data" }, { status: 400 });
        }

        const data = await prisma.post.create({
            data: {
                text: text,
                userId: user.id,
            },
        });
        
        return NextResponse.json(data)
    } catch (error) {
        console.error("Error creating posts:", error);
        return NextResponse.json({ message: "Failed to create posts" }, { status: 500 });
    }
}