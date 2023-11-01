"use client"

import {useToast} from "@/components/ui/use-toast"
import {useTheme} from "next-themes"
import {cn} from "@/lib/utils"
import {BotAvatar} from "@/components/bot-avatar"
import {BeatLoader} from "react-spinners"
import {UserAvatar} from "@/components/user-avatar"
import {Button} from "@/components/ui/button"
import {Copy} from "lucide-react"

export interface ChatMessageProps {
    role: "user" | "system"
    content?: string
    isLoading?: boolean
    src?: string
}

export const ChatMessage = ({
    role,
    content,
    isLoading,
    src
}: ChatMessageProps) => {
    const { toast } = useToast()
    const { theme } = useTheme()

    const onCopy = () => {
        if(!content) {
            return;
        }

        navigator.clipboard.writeText(content)
        toast({
            description: "Message copied to clipboard!",
        })
    }

    const CopyButton = () => {
        return (
            <Button
                onClick={onCopy}
                className="opacity-0 group-hover:opacity-100 transition"
                size="icon"
                variant="ghost"
                title="Copy this message"
            >
                <Copy className="w-4 h-4" />
            </Button>
        )
    }

    return (
        <div className={cn(
            "group flex items-start gap-x-3 py-2 w-full",
            role === "user" ? "justify-end" : "justify-start"
        )}>
            {
                role !== "user" && src && (
                    <BotAvatar src={src} />
                )
            }
            {
                role === "user" && !isLoading && (
                    <CopyButton />
                )
            }

            <div className="rounded-md px-4 py-2 max-w-sm text-sm bg-primary/10">
                {
                    isLoading
                        ? <BeatLoader
                            size={5}
                            color={theme === "light" ? "black" : "white"}
                        />
                        : content
                }
            </div>

            {
                role === "user" && (
                    <UserAvatar />
                )
            }
            {
                role !== "user" && !isLoading && (
                    <CopyButton />
                )
            }
        </div>
    )
}