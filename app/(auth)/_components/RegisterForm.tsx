"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Eye, EyeOff, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { registerAction } from "../_actions/Register"
import { toast } from "sonner"

const signUpSchema = z.object({
    name: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    role: z.enum(["TENANT", "LANDLORD"], {
        message: "Please select a role",
    }),
    phone: z.string().min(6, "Phone must be at least 6 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

type SignUpFormValues = z.infer<typeof signUpSchema>

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<SignUpFormValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            role: undefined,
            password: ""
        },
    })

    const onSubmit = async (data: SignUpFormValues) => {
        console.log(data);
        try {
            setIsSubmitting(true)
            const result = await registerAction(data)
            console.log(result);

        } catch (error) {
            console.error("Sign up error:", error)
        } finally {
            setIsSubmitting(false)
            toast.success("Registration Successfull")
        }
    }

    return (
        <div className="flex flex-col gap-4 p-6 md:p-10">
            <div className="flex flex-col flex-1 items-center justify-center">
                <div className="w-full max-w-lg border border-secondary-foreground rounded-2xl p-10">
                    <Form {...form}>
                        {/* Header */}
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold">Create New Account</h1>
                            <p className="text-sm my-2">
                                Enter your details below to create an account
                            </p>
                        </div>
                        {/* Form Fields */}
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-5 w-full"
                        >
                            {/* Username Field */}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Write your username"
                                                className="border rounded-xl"
                                                {...field}
                                                disabled={isSubmitting}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Email Field */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="Enter your email address"
                                                className="border rounded-xl"
                                                {...field}
                                                disabled={isSubmitting}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Phone Field */}
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="tel"
                                                placeholder="Enter your phone number"
                                                className="border rounded-xl"
                                                {...field}
                                                disabled={isSubmitting}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Role Field */}
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>I am a</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            disabled={isSubmitting}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full border rounded-xl">
                                                    <SelectValue placeholder="Select your role" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="TENANT">Tenant</SelectItem>
                                                <SelectItem value="LANDLORD">Landlord</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Password Field */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <div className="relative">
                                            <FormControl>
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Enter your password"
                                                    className="border rounded-xl"
                                                    {...field}
                                                    disabled={isSubmitting}
                                                />
                                            </FormControl>
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword((prev) => !prev)}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:text-primary cursor-pointer transition-colors"
                                                aria-label={showPassword ? "Hide password" : "Show password"}
                                                disabled={isSubmitting}
                                            >
                                                {showPassword ? (
                                                    <EyeOff size={18} />
                                                ) : (
                                                    <Eye size={18} />
                                                )}
                                            </button>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex justify-center items-center gap-2 mt-6"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Spinner />
                                        Registering...
                                    </>
                                ) : (
                                    "Register"
                                )}
                            </Button>
                        </form>
                        {/* Sign In Section */}
                        <div className="mt-6 space-y-3 text-sm text-center">
                            <p>
                                Already have an account?{" "}
                                <Link
                                    href="/sign-in"
                                    className="text-secondary-foreground font-bold hover:underline"
                                >
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </Form>
                </div>

                {/* Back to Home */}
                <Link
                    href="/"
                    className="flex items-center gap-2 mt-6 text-sm hover:underline cursor-pointer "
                >
                    <Home size={16} />
                    <span>Back to home page</span>
                </Link>
            </div>
        </div>
    )
}