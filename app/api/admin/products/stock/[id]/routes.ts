import { NextRequest } from "next/server";

export async function PUT (request: NextRequest) {
    const { id , name, imageUrl, price, description, inStock } = await request.json()

    if (!id) {
        return product
    }
}