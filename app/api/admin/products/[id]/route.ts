import { NextRequest, NextResponse } from "next/server";
import { productSchema } from "@/lib/validation";
import prisma from "@/lib/prisma";



export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    try {

        const isDeleted = await prisma.product.delete({
            where: { id }
        })

        return NextResponse.json({ message: "Task  deleted succesfully." }, { status: 200 })

    } catch (err: any) {
        if (err.code === "P2025") {
            return NextResponse.json(
                { message: "Product not found." },
                { status: 404 }
            );
        }
        return NextResponse.json({ message: "internall server error" }, { status: 500 })
    }

}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const body = await request.json();

    const result = productSchema.safeParse(body);

    if (!result.success) {
        return NextResponse.json(
            {
                message: "Invalid data",
                details: result.error.flatten(),
            },
            { status: 400 }
        );
    }

    try {
        const updatedProduct = await prisma.product.update({
            where: { id },
            data: result.data,
        });

        return NextResponse.json(
            {
                message: "Product updated successfully",
                product: updatedProduct,
            },
            { status: 200 }
        );
    } catch (error: any) {
        if (error.code === "P2025") {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Something went wrong", error: error.message },
            { status: 500 }
        );
    }
}