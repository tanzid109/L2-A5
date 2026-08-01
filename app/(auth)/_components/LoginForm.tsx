"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Eye, EyeOff, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Spinner } from "@/components/ui/spinner"
import { FaApple, FaGoogle } from "react-icons/fa"
import { loginAction } from "../_actions/Login"
import { toast } from "sonner"

// Define validation schema
const signInSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

type SignInFormValues = z.infer<typeof signInSchema>

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<SignInFormValues>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (data: SignInFormValues) => {
        try {
            setIsSubmitting(true)
            console.log("Form data:", data)
            const result = await loginAction(data)
            console.log(result);
        } catch (error) {
            console.error("Sign in error:", error)
        } finally {
            setIsSubmitting(false)
            toast.success("Login Successfull")
        }
    }

    return (
        <div className=" min-h-screen">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex flex-col flex-1 items-center justify-center">
                    <div className="w-full max-w-lg border border-secondary-foreground rounded-2xl p-5">
                        <Form {...form}>
                            {/* Header */}
                            <div className="mb-6">
                                <h1 className="text-2xl font-bold">Welcome Back!</h1>
                                <p className="text-sm my-2">
                                    Sign in to continue your account
                                </p>
                            </div>

                            {/* Form Fields */}
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-5 w-full"
                            >
                                {/* Email Field */}
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="Enter your username or email address"
                                                    className="border rounded-xl"
                                                    {...field}
                                                />
                                            </FormControl>
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
                                                    />
                                                </FormControl>
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword((prev) => !prev)}
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:text-primary text-[#656568] cursor-pointer transition-colors"
                                                    aria-label={showPassword ? "Hide password" : "Show password"}
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
                                    variant="secondary"
                                    disabled={isSubmitting}
                                    className="w-full flex justify-center items-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Spinner />
                                            Signing in...
                                        </>
                                    ) : (
                                        "Sign In"
                                    )}
                                </Button>
                            </form>
                        </Form>

                        {/* Sign Up Section */}
                        <div className="mt-6 space-y-2 text-sm">
                            <p className="flex flex-col justify-center items-center">
                                Don&apos;t have an account?{" "}
                                <Link href="/sign-up" className="text-secondary-foreground hover:underline my-2 text-base font-bold">
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Back to Home */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 mt-6 text-sm hover:underline cursor-pointer"
                    >
                        <Home size={16} />
                        <span>Back to home page</span>
                    </Link>
                </div>
            </div>
        </div >
    )
}