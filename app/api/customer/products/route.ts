import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireRole } from "@/lib/session";

export async function GET(request: NextRequest) {
  try {
    const session = await requireRole(request, ["CUSTOMER", "ADMIN"]);

    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        image: true,
        stock: true,
      },
    });

    return NextResponse.json({ products: products }, { status: 200 });
    
  } catch (error) {

    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
    
  }
}
