"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "sonner"
import { createProperty } from "../../_actions/createProperty"

const addPropertySchema = z.object({
    categoryId: z.string().min(1, "Please select a category"),
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    address: z.string().min(3, "Address is required"),
    city: z.string().min(2, "City is required"),
    price: z.string().min(1, "Price is required").regex(/^\d+$/, "Price must be a number"),
    bedrooms: z.string().min(1, "Required").regex(/^\d+$/, "Must be a number"),
    bathrooms: z.string().min(1, "Required").regex(/^\d+$/, "Must be a number"),
    status: z.enum(["AVAILABLE", "RENTED", "PENDING"], {
        message: "Please select a status",
    }),
})

type AddPropertyFormValues = z.infer<typeof addPropertySchema>

interface Category {
    id: string
    name: string
}

interface AddPropertyFormProps {
    categories: Category[]
}

export default function AddPropertyForm({ categories }: AddPropertyFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    const form = useForm<AddPropertyFormValues>({
        resolver: zodResolver(addPropertySchema),
        defaultValues: {
            categoryId: "",
            title: "",
            description: "",
            address: "",
            city: "",
            price: "",
            bedrooms: "1",
            bathrooms: "1",
            status: "AVAILABLE",
        },
    })

    const onSubmit = async (data: AddPropertyFormValues) => {
        try {
            setIsSubmitting(true)
            const result = await createProperty({
                ...data,
                bedrooms: Number(data.bedrooms),
                bathrooms: Number(data.bathrooms),
            })

            if (result.success) {
                toast.success("Property created successfully.")
                form.reset()
                router.push("/landlord-dashboard/my-properties")
            } else {
                toast.error(result.message ?? "Failed to create property.")
            }
        } catch (error) {
            console.error("Create property error:", error)
            toast.error("Something went wrong. Try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="w-full max-w-2xl border border-border rounded-2xl p-10 bg-background">
            <Form {...form}>
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-foreground">Add New Property</h1>
                    <p className="text-sm text-balance text-muted-foreground my-2">
                        Enter the property details below to list it
                    </p>
                </div>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full">
                    {/* Title */}
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="e.g. Modern 2 Bedroom Apartment"
                                        className="rounded-xl border-border"
                                        {...field}
                                        disabled={isSubmitting}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Description */}
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Describe the property..."
                                        className="rounded-xl border-border min-h-28"
                                        {...field}
                                        disabled={isSubmitting}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Address + City */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="House 12, Road 5, Dhanmondi"
                                            className="rounded-xl border-border"
                                            {...field}
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Dhaka"
                                            className="rounded-xl border-border"
                                            {...field}
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Category */}
                    <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    disabled={isSubmitting}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full rounded-xl border-border">
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Price */}
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price (per month)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        inputMode="numeric"
                                        placeholder="25000"
                                        className="rounded-xl border-border"
                                        {...field}
                                        disabled={isSubmitting}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Bedrooms + Bathrooms */}
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="bedrooms"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bedrooms</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            min={0}
                                            className="rounded-xl border-border"
                                            {...field}
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="bathrooms"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bathrooms</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            min={0}
                                            className="rounded-xl border-border"
                                            {...field}
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Status */}
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    disabled={isSubmitting}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full rounded-xl border-border">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="AVAILABLE">Available</SelectItem>
                                        <SelectItem value="RENTED">Rented</SelectItem>
                                        <SelectItem value="PENDING">Pending</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit */}
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex justify-center items-center gap-2 mt-6"
                    >
                        {isSubmitting ? (
                            <>
                                <Spinner />
                                Creating...
                            </>
                        ) : (
                            "Add Property"
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    )
}