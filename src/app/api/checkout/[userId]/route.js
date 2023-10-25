import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismaDB";

export async function POST(request, { params: { userId } }) {
  const body = await request.json();
  const { totalAmount } = body;

  if (!totalAmount || !userId) {
    return new NextResponse("Missing Fields", { status: 400 });
  }

  try {
    // Find the user
    const existingUser = await prisma.user.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!existingUser) {
      return new NextResponse("User not found", { status: 404 });
    }

    const setTotalAmount = await prisma.user.update({
      where: {
        userId: userId,
      },
      data: {
        totalAmount: totalAmount,
      },
    });

    return NextResponse.json(setTotalAmount);
  } catch (err) {
    return new NextResponse(
      { message: "Internal Server Error", error: err.message },
      { status: 500 }
    );
  }
}

export async function GET(request, { params: { userId } }) {
  if (!userId) {
    return new NextResponse("Missing Fields", { status: 400 });
  }

  try {
    const getTotalAmount = await prisma.user.findUnique({
      where: {
        userId: userId,
      },
      select: {
        totalAmount: true,
      },
    });

    if (!getTotalAmount) {
      return new NextResponse("User not found", { status: 404 });
    }

    return NextResponse.json(getTotalAmount);
  } catch (err) {
    return new NextResponse(
      { message: "Internal Server Error", error: err.message },
      { status: 500 }
    );
  }
}
