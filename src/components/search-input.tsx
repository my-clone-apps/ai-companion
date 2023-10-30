"use client"

import qs from "query-string"
import {ChangeEventHandler, useEffect, useState} from "react"
import {Search} from "lucide-react"
import {Input} from "@/components/ui/input"
import {useRouter, useSearchParams} from "next/navigation"
import {useDebounce} from "@/hooks/use-debounce"

export const SearchInput = () => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const categoryId = searchParams.get("category")
    const name = searchParams.get("name")

    const [value, setValue] = useState<string>(name || "")
    const debouncedValue = useDebounce(value, 500)

    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(e.target.value.trim())
    }

    useEffect(() => {
        const query = {
            name: debouncedValue,
            categoryId
        }

        const url = qs.stringifyUrl({
            url: window.location.href,
            query
        }, {
            skipEmptyString: true,
            skipNull: true
        })

        router.push(url)
    }, [debouncedValue, router, categoryId])

    return (
        <div className="relative">
            <Search className="absolute w-4 h-4 top-3 left-4 text-muted-foreground" />
            <Input
                onChange={onChange}
                placeholder="Search anything..."
                className="pl-10 bg-primary/10"
                defaultValue={value}
            />
        </div>
    )
}