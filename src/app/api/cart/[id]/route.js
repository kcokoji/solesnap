import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismaDB";

export async function GET(request, { params: { id } }) {
  const userId = id;
  if (!userId) {
    return new NextResponse("Missing User ID", { status: 400 });
  }

  try {
    // Find the user
    const existingUser = await prisma.user.findUnique({
      where: {
        userId: userId,
      },
      select: {
        cart: true,
      },
    });

    if (!existingUser) {
      return new NextResponse("User not found", { status: 404 });
    }

    return NextResponse.json(existingUser);
  } catch (err) {
    return new NextResponse(
      { message: "Internal Server Error", error: err.message },
      { status: 500 }
    );
  }
}
