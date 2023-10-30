import {NextResponse} from "next/server"
import {auth, currentUser} from "@clerk/nextjs"
import prismadb from "@/lib/prismadb"

interface Params {
    params: {
        companionId: string
    }
}

export async function PATCH(req: Request, { params }: Params) {
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

        if(
            !params.companionId
            || !name
            || !description
            || !src
            || !instructions
            || !seed
            || !categoryId
        ) {
            return new NextResponse("missing_fields", { status: 400 })
        }

        if(!user || !user.id || !user.firstName) {
            return new NextResponse("unauthorized", { status: 401 })
        }

        //TODO: check subscription

        const companion = await prismadb.companion.update({
            where: {
                id: params.companionId
            },
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

export async function DELETE(req: Request, { params }: Params) {
    try {
        const { userId } = auth()

        if(!params.companionId) {
            return new NextResponse("missing_fields", { status: 400 })
        }

        if(!userId) {
            return new NextResponse("unauthorized", { status: 401 })
        }

        //TODO: check subscription

        const companion = await prismadb.companion.delete({
            where: {
                userId,
                id: params.companionId
            }
        })

        return new NextResponse("success", { status: 200 })
    } catch (error) {
        console.log(error)
        return new NextResponse("internal_error", { status: 500 })
    }
}