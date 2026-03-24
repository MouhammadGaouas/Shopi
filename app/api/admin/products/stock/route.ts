import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/session";

export async function GET(request: NextRequest) {
  try {
    await requireRole(request, ["CUSTOMER" , "ADMIN"]);

        const products = await prisma.product.findMany({
            select: {
                id: true,
                name: true,
                price: true,
                image: true,
                stock: true,
                description: true,
            },
            orderBy: {
                id: "desc",
            },
        });

        return NextResponse.json({ success: true, products }, { status: 200 });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 },
        );
    }
}
