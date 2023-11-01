"use client"

import {Companion} from "@prisma/client"
import {ChatMessage, ChatMessageProps} from "@/components/chat-message"
import {
    ElementRef,
    useEffect,
    useRef,
    useState
} from "react"

interface ChatMessagesProps {
    messages: ChatMessageProps[]
    isLoading: boolean
    companion: Companion
}

export const ChatMessages = ({
    messages,
    isLoading,
    companion
}: ChatMessagesProps) => {
    const scrollRef = useRef<ElementRef<"div">>(null)
    const [fakeLoading, setFakeLoading] = useState(messages.length === 0)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setFakeLoading(false)
        }, 1000)

        return () => {
            clearTimeout(timeout)
        }
    }, [])

    useEffect(() => {
        scrollRef?.current?.scrollIntoView({
            behavior: "smooth"
        })
    }, [messages.length])

    return (
        <div className="flex-1 overflow-y-auto pr-4">
            <ChatMessage
                isLoading={fakeLoading}
                role="system"
                src={companion.src}
                content={`Hello, I am ${companion.name}, ${companion.description}`}
            />
            {
                messages.map((message, index) => (
                    <ChatMessage
                        key={index}
                        role={message.role}
                        src={companion.src}
                        content={message.content}
                    />
                ))
            }
            {
                isLoading && (
                    <ChatMessage
                        role="system"
                        src={companion.src}
                        isLoading
                    />
                )
            }
            <div ref={scrollRef} />
        </div>
    )
}