import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismaDB";

export async function POST(request) {
  try {
    const body = await request.json();
    const { userId } = body;

    // Check if userId is provided
    if (!userId) {
      return new NextResponse("Missing Fields", { status: 400 });
    }

    // Use prisma.upsert to create or update the user
    const user = await prisma.user.upsert({
      where: { userId: userId },
      create: {
        userId: userId,
      },
      update: {},
    });

    return NextResponse.json(user);
  } catch (err) {
    // Log the error for debugging purposes
    console.error("Error creating/updating user:", err);

    // Return an error response with status 500
    return new NextResponse(
      { message: "Error creating/updating user", error: err },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  const body = await request.json();
  const { userId } = body;

  if (!userId) {
    return new NextResponse("Missing Fields", { status: 400 });
  }

  try {
    // Delete the user if they exist
    const deleteUser = await prisma.user.deleteMany({
      where: {
        userId: userId,
      },
    });
    return NextResponse.json(deleteUser);
  } catch (err) {
    return NextResponse.json(
      { message: "Error deleting user account", err },
      { status: 500 }
    );
  }
}
