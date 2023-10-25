import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismaDB";

export async function POST(request) {
  const body = await request.json();

  const { userId, productId, size, color } = body;

  if (!userId || !productId || !size || !color) {
    return new NextResponse("Missing Fields", { status: 400 });
  }

  try {
    // Find the user
    const existingUser = await prisma.user.findUnique({
      where: {
        userId: userId,
      },
    });

    if (existingUser) {
      const isProductInCart = existingUser.cart.some(
        (product) => product.id === productId
      );
      if (isProductInCart) {
        return new NextResponse("Item already in cart ", { status: 409 });
      }
    }

    const Cart = await prisma.user.upsert({
      where: {
        userId: userId,
      },
      create: {
        userId: userId,
        cart: {
          set: {
            id: productId,
            color: color,
            size: size,
          },
        },
      },
      update: {
        cart: {
          push: {
            id: productId,
            color: color,
            size: size,
          },
        },
      },
    });

    return NextResponse.json(Cart);
  } catch (err) {
    return new NextResponse(
      { message: "Internal Server Error", error: err.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  const body = await request.json();
  const { userId, productId } = body;

  if (!userId || !productId) {
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

    // Check if the product is in the cart
    const isProductInCart = existingUser.cart.some(
      (product) => product.id === productId
    );

    if (!isProductInCart) {
      return new NextResponse("Product not in the cart", { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: {
        userId: userId,
      },
      data: {
        cart: {
          set: existingUser.cart.filter((product) => product.id !== productId),
        },
      },
    });

    return NextResponse.json(updatedUser);
  } catch (err) {
    return new NextResponse(
      { message: "Internal Server Error", error: err.message },
      { status: 500 }
    );
  }
}

// Define the PATCH method for updating the quantity of a product in the user's cart
export async function PATCH(request) {
  const body = await request.json();
  const { userId, productId, quantity } = body;

  if (!userId || !productId || quantity === undefined) {
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

    const isProductInCart = existingUser.cart.some(
      (product) => product.id === productId
    );

    if (!isProductInCart) {
      return new NextResponse("Product not in the cart", { status: 400 });
    }

    // Update the user's cart
    const updatedUser = await prisma.user.update({
      where: {
        userId: userId,
      },
      data: {
        cart: existingUser.cart.map((product) => ({
          ...product,
          quantity: product.id === productId ? quantity : product.quantity,
        })),
      },
    });

    return NextResponse.json(updatedUser);
  } catch (err) {
    return new NextResponse(
      { message: "Internal Server Error", error: err.message },
      { status: 500 }
    );
  }
}
