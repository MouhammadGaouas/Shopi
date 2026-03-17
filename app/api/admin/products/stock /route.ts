import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const products = await prisma.product.findMany({
            select: {
                id: true,
                name: true,
                price: true,
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
            { status: 500 }
        );
    }
}