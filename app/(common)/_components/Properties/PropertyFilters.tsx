// _components/Properties/PropertyFilters.tsx
"use client"

import { useState, useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, SlidersHorizontal, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function PropertyFilters() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition()

    const [city, setCity] = useState(searchParams.get("city") ?? "")
    const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") ?? "")
    const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") ?? "")
    const [status, setStatus] = useState(searchParams.get("status") ?? "")

    const applyFilters = () => {
        const params = new URLSearchParams(searchParams.toString())

        city ? params.set("city", city) : params.delete("city")
        minPrice ? params.set("minPrice", minPrice) : params.delete("minPrice")
        maxPrice ? params.set("maxPrice", maxPrice) : params.delete("maxPrice")
        status ? params.set("status", status) : params.delete("status")

        startTransition(() => {
            router.replace(`/properties?${params.toString()}`)
        })
    }

    const clearFilters = () => {
        setCity("")
        setMinPrice("")
        setMaxPrice("")
        setStatus("")
        startTransition(() => {
            router.replace("/properties")
        })
    }

    return (
        <div className="bg-card border border-border rounded-xl p-4 mb-8 flex flex-col sm:flex-row gap-3 sm:items-end relative">
            {isPending && (
                <div className="absolute inset-0 bg-background/50 rounded-xl flex items-center justify-center z-10">
                    <Loader2 className="animate-spin text-primary" size={20} />
                </div>
            )}

            <div className="flex-1">
                <label className="text-xs text-muted-foreground mb-1 block">City</label>
                <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Dhaka"
                        className="pl-8"
                    />
                </div>
            </div>

            <div className="w-full sm:w-32">
                <label className="text-xs text-muted-foreground mb-1 block">Min Price</label>
                <Input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="4000"
                />
            </div>

            <div className="w-full sm:w-32">
                <label className="text-xs text-muted-foreground mb-1 block">Max Price</label>
                <Input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="30000"
                />
            </div>

            <div className="w-full sm:w-40">
                <label className="text-xs text-muted-foreground mb-1 block">Status</label>
                <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                        <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="AVAILABLE">Available</SelectItem>
                        <SelectItem value="RENTED">Rented</SelectItem>
                        <SelectItem value="PENDING">Pending</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex gap-2">
                <Button onClick={applyFilters} disabled={isPending} className="gap-1.5">
                    <SlidersHorizontal size={14} />
                    Apply
                </Button>
                <Button variant="outline" onClick={clearFilters} disabled={isPending}>
                    Clear
                </Button>
            </div>
        </div>
    )
}