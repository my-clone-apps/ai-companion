import React from "react"
import type {Metadata} from "next"
import {Inter} from "next/font/google"
import {ClerkProvider} from "@clerk/nextjs"
import {ThemeProvider} from "@/components/theme-provider"

import "./globals.css"
import {cn} from "@/lib/utils"
import {Toaster} from "@/components/ui/toaster"
import {ProModal} from "@/components/pro-modal"

const inter = Inter({subsets: ["latin"]})

export const metadata: Metadata = {
    title: {
        template: "%s - Companion AI",
        default: "Companion AI"
    }
}

const MainLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
                <body
                    className={cn(
                        "bg-secondary",
                        inter.className
                    )}
                >
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <ProModal />
                        {children}
                        <Toaster />
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    )
}

export default MainLayout
