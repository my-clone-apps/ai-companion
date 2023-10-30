import prismadb from "@/lib/prismadb";
import {CompanionForm} from "./components/companion-form";

interface CompanionDetailPageProps {
    params: {
        companionId: string;
    }
}

const CompanionDetailPage = async  ({
    params
}: CompanionDetailPageProps) => {
    // TODO: check subscription

    const companion = await prismadb.companion.findUnique({
        where: {
            id: params.companionId
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