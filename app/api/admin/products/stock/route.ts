import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest,) {
    const { name, imageUrl, price, description, inStock } = await request.json()


    if (!name || !price || !inStock)
        return NextResponse.json({ message: "invalide input" }, { status: 400 })

    if (price < 0 || isNaN(price))
        return NextResponse.json({ message: "product price can't be less than 0" }, { status: 400 })

    const slug = name.trim().toLowerCase().replace(/\s+/g, "-")

    try {
        const alreadyExist = await prisma.product.findUnique({
            where: { slug }
        })

        if (alreadyExist)
            return NextResponse.json({ message: "product already exists in the stock" }, { status: 409 })


        const newProduct = await prisma.product.create({
            data: {
                name: name,
                slug: slug,
                image: imageUrl,
                price: Number(price),
                stock: Number(inStock),
                description: description
            }
        })

        return NextResponse.json({ message: "Product created successfuly: ", product: newProduct })

    } catch (err) {
        console.error("ERROR: ", err)
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
                description: true 
            }
        })

        if (AllProducts.length === 0)
            return NextResponse.json({ message: "Stock is empty" }, { status: 404 })

        return NextResponse.json({ products: AllProducts }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}