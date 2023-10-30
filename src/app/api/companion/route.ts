import {NextResponse} from "next/server"
import {currentUser} from "@clerk/nextjs"
import prismadb from "@/lib/prismadb"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const user = await currentUser()
        const {
            name,
            description,
            src,
            instructions,
            seed,
            categoryId
        } = body

        if(!user || !user.id || !user.firstName) {
            return new NextResponse("unauthorized", { status: 401 })
        }

        if(!name || !description || !src || !instructions || !seed || !categoryId) {
            return new NextResponse("missing_fields", { status: 400 })
        }

        //TODO: check subscription

        const companion = await prismadb.companion.create({
            data: {
                categoryId,
                userId: user.id,
                userName: user.firstName,
                name,
                description,
                src,
                instructions,
                seed
            }
        })

        return NextResponse.json(companion)
    } catch (error) {
        console.log(error)
        return new NextResponse("internal_error", { status: 500 })
    }
}