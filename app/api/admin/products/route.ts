import { NextRequest, NextResponse } from "next/server";
import { productSchema } from "@/lib/validation";

import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const result = productSchema.safeParse(body);

  if (!result.success)
    return NextResponse.json({ message: "Invalide Input" }, { status: 400 });

  const productData = result.data;

  const slug = productData.name.trim().toLowerCase().replace(/\s+/g, "-");

  try {
    const alreadyExist = await prisma.product.findUnique({
      where: { slug },
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
        image: productData.imageUrl,
        stock: productData.inStock ,
        slug
      },
    });

    return NextResponse.json({
      message: "Product created successfuly: ",
      product: newProduct,
    });
  } catch (err) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const AllProducts = await prisma.product.findMany({
      select: {
        name: true,
        slug: true,
        price: true,
        stock: true,
        description: true,
      },
    });

    if (AllProducts.length === 0)
      return NextResponse.json({ message: "Stock is empty" }, { status: 404 });

    return NextResponse.json({ products: AllProducts }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Server error", error: err },
      { status: 500 },
    );
  }
}