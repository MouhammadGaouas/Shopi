import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { readonlyType } from "better-auth/react";



export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    try {

        const isDeleted = await prisma.product.delete({
            where: { id }
        })

        if (!isDeleted)
            return NextResponse.json({ message: "Task not deleted" }, { status: 400 })

        return NextResponse.json({ message: "Task  deleted succesfully." }, { status: 201 })

    } catch (err) {
        return NextResponse.json({ message: "internall server error" }, { status: 400 })
    }

}