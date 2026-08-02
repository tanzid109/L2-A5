"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog"
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
import { MyProperty } from "@/lib/types"
import { updateProperty } from "../../_actions/createProperty"

const editPropertySchema = z.object({
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

type EditPropertyFormValues = z.infer<typeof editPropertySchema>

interface Category {
    id: string
    name: string
}

interface EditPropertyDialogProps {
    property: MyProperty
    categories: Category[]
}

export function EditPropertyDialog({ property, categories }: EditPropertyDialogProps) {
    const [open, setOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<EditPropertyFormValues>({
        resolver: zodResolver(editPropertySchema),
        defaultValues: {
            categoryId: property.categoryId ?? "",
            title: property.title,
            description: property.description ?? "",
            address: property.address ?? "",
            city: property.city ?? "",
            price: String(property.price),
            bedrooms: String(property.bedrooms),
            bathrooms: String(property.bathrooms),
            status: property.status,
        },
    })

    const onSubmit = async (data: EditPropertyFormValues) => {
        try {
            setIsSubmitting(true)
            const result = await updateProperty(property.id, {
                ...data,
                bedrooms: Number(data.bedrooms),
                bathrooms: Number(data.bathrooms),
            })
            console.log(result);

            if (result.success) {
                toast.success(result.message ?? "Property updated.")
                setOpen(false)
            } else {
                toast.error(result.message ?? "Failed to update property.")
            }
        } catch (error) {
            console.error("Update property error:", error)
            toast.error("Something went wrong. Try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleOpenChange = (next: boolean) => {
        if (next) {
            form.reset({
                categoryId: property.categoryId ?? "",
                title: property.title,
                description: property.description ?? "",
                address: property.address ?? "",
                city: property.city ?? "",
                price: String(property.price),
                bedrooms: String(property.bedrooms),
                bathrooms: String(property.bathrooms),
                status: property.status,
            })
        }
        setOpen(next)
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="w-full gap-1.5 border-border text-foreground hover:bg-accent"
                >
                    <Pencil size={14} />
                    Edit
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Property</DialogTitle>
                    <DialogDescription>
                        Update the details below and save your changes.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
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
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className="rounded-xl border-border min-h-28"
                                            {...field}
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

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

                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
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
                                            className="rounded-xl border-border"
                                            {...field}
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

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

                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
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

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex justify-center items-center gap-2 mt-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <Spinner />
                                    Saving...
                                </>
                            ) : (
                                "Save Changes"
                            )}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}