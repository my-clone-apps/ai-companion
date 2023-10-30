import {Home, Plus, Settings} from "lucide-react";

export const routes = [
    {
        icon: Home,
        href: "/",
        label: "Home",
        isPro: false
    },
    {
        icon: Plus,
        href: "/companion/new",
        label: "Create",
        isPro: true
    },
    {
        icon: Settings,
        href: "/settings",
        label: "Settings",
        isPro: false
    }
]

export const themes = [
    {
        key: "system",
        title: "System"
    },
    {
        key: "light",
        title: "Light"
    },
    {
        key: "dark",
        title: "Dark"
    }
]