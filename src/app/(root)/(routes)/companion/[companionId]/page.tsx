import prismadb from "@/lib/prismadb"
import {CompanionForm} from "./components/companion-form"
import {auth, redirectToSignIn} from "@clerk/nextjs"

interface CompanionDetailPageProps {
    params: {
        companionId: string;
    }
}

const CompanionDetailPage = async  ({
    params
}: CompanionDetailPageProps) => {
    const { userId } = auth()
    // TODO: check subscription

    if(!userId) {
        return redirectToSignIn()
    }

    const companion = await prismadb.companion.findUnique({
        where: {
            id: params.companionId,
            userId
        }
    })

    const categories = await prismadb.category.findMany()

    return (
        <div>
            <CompanionForm
                initialData={companion}
                categories={categories}
            />
        </div>
    )
}

export default CompanionDetailPage