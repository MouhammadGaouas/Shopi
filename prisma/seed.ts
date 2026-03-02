import prisma from "@/lib/prisma";
import { auth } from '../lib/auth'

async function createProduct() {
    await auth.api.signUpEmail({
        body: {
            email: "mouhammad@gmail.com",
            password: "12345",
            name: "Mouhammad"
        }
    })
}