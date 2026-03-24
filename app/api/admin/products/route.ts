import { NextRequest, NextResponse } from "next/server";
import { productSchema } from "@/lib/validation";

import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  
  const body = await request.json();

  const result = productSchema.safeParse(body);

  if (!result.success)
    return NextResponse.json({ message: "Invalid Input", errors: result.error.flatten().fieldErrors }, { status: 400 });

  const productData = result.data;

  const slug = productData.name.trim().toLowerCase().replace(/\s+/g, "-");

  try {
    const alreadyExist = await prisma.product.findUnique({
      where: {slug }
    });

    if (alreadyExist)
      return NextResponse.json(
        { message: "product already exists in the stock" },
        { status: 409 },
      );

    const newProduct = await prisma.product.create({
      data: {
        name: productData.name ,
        description: productData.description ,
        price: productData.price ,
        image: productData.image,
        stock: productData.stock ,
        slug
      },
    });

    return NextResponse.json({
      message: "Product created successfuly: ",
      product: newProduct,
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ message: err.message || "Server error" }, { status: 500 });
  }
}

