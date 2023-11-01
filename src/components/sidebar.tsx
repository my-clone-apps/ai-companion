"use client"

import {cn} from "@/lib/utils"
import {usePathname, useRouter} from "next/navigation"
import {routes} from "@/constants"
import {useProModal} from "@/hooks/use-pro-modal"

interface SidebarProps {
    isPro: boolean
}

export const Sidebar = ({
    isPro
}: SidebarProps) => {
    const pathname = usePathname()
    const router = useRouter()
    const proModal = useProModal()

    const onNavigate = (url: string, routeIsPro: boolean) => {
        if(routeIsPro && !isPro) {
            return proModal.onOpen()
        }

        return router.push(url);
    }

    return (
        <div className="space-y-4 flex flex-col h-full text-primary bg-secondary">
            <div className="p-3 flex flex-1 justify-center">
                <div className="space-y-2">
                    {
                        routes.map((route, index) => (
                            <div
                                key={index}
                                onClick={() => onNavigate(route.href, route.isPro)}
                                className={cn(
                                    "text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
                                    pathname === route.href && "bg-primary/10 text-primary"
                                )}
                            >
                                <div className="flex flex-col gap-y-2 items-center flex-1">
                                    <route.icon className="h-5 w-5" />
                                    {route.label}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}