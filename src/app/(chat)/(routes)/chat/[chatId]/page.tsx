import {auth, redirectToSignIn} from "@clerk/nextjs"
import prismadb from "@/lib/prismadb"
import {redirect} from "next/navigation"
import {ChatClient} from "./components/client"

interface ChatDetailPageProps {
    params: {
        chatId: string
    }
}

const ChatDetailPage = async ({
    params
}: ChatDetailPageProps) => {
    const { userId } = auth()

    if(!userId) {
        return redirectToSignIn()
    }

    const companion = await prismadb.companion.findUnique({
        where: {
            id: params.chatId
        },
        include: {
            messages: {
                orderBy: {
                    createdAt: "asc"
                },
                where: {
                    userId
                }
            },
            _count: {
                select: {
                    messages: true
                }
            }
        }
    })

    if(!companion) {
        return redirect("/")
    }

    return (
        <ChatClient companion={companion} />
    )
}

export default ChatDetailPage