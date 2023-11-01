"use client"

import {Button} from "@/components/ui/button"
import {Sparkles} from "lucide-react"
import axios from "axios"
import {useState} from "react"
import {useToast} from "@/components/ui/use-toast"

interface SubscriptionButtonProps {
    isPro: boolean
}

export const SubscriptionButton = ({
    isPro
}: SubscriptionButtonProps) => {
    const {toast} = useToast()
    const [loading, setLoading] = useState(false)

    const onClick = async () => {
        try {
            setLoading(true)
            const response = await axios.get("/api/stripe")

            window.location.href = response.data.url
        } catch (error) {
            toast({
                description: "Something went wrong.",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Button
            onClick={onClick}
            disabled={loading}
            size="sm"
            variant={isPro ? "default" : "premium"}
        >
            {
                isPro
                    ? "Manage subscription"
                    : "Upgrade to pro"
            }
            {
                !isPro && <Sparkles className="w-4 h-4 ml-2 fill-white" />
            }
        </Button>
    )
}