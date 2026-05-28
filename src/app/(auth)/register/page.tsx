"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterForm) => {
        try {
            const res = await api.post('/auth/register', {
                name: data.name,
                email: data.email,
                password: data.password,
            });
            setSession(res.data.token, res.data.user);
            toast.success('Account created!');
            router.push('/dashboard');
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Registration failed');
        }
    };
    const router = useRouter();
    const setSession = useAuthStore((s) => s.setSession);

    return (
        <div className="min-h-screen bg-[#07111B] flex items-center justify-center px-6">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C89B5A]/6 rounded-full blur-[100px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative w-full max-w-sm"
            >
                <div className="flex justify-center mb-8">
                    <Link href="/">
                        <img src="/Zenqor.png" alt="ZENQOR" className="h-8 w-auto" />
                    </Link>
                </div>

                <div className="bg-[#111827] border border-[#1f2d3d] rounded-2xl p-8">
                    <div className="mb-8">
                        <h1 className="text-xl font-semibold text-[#F3F4F6] mb-1">
                            Create an account
                        </h1>
                        <p className="text-sm text-[#9CA3AF]">
                            Start your ZENQOR journey today
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div className="space-y-2">
                            <Label className="text-sm text-[#9CA3AF]">Full name</Label>
                            <Input
                                {...register("name")}
                                placeholder="John Doe"
                                className="bg-[#07111B] border-[#1f2d3d] text-[#F3F4F6] placeholder:text-[#6B7280] focus:border-[#C89B5A]/50 h-11 rounded-xl"
                            />
                            {errors.name && (
                                <p className="text-xs text-red-400">{errors.name.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm text-[#9CA3AF]">Email</Label>
                            <Input
                                {...register("email")}
                                type="email"
                                placeholder="you@company.com"
                                className="bg-[#07111B] border-[#1f2d3d] text-[#F3F4F6] placeholder:text-[#6B7280] focus:border-[#C89B5A]/50 h-11 rounded-xl"
                            />
                            {errors.email && (
                                <p className="text-xs text-red-400">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm text-[#9CA3AF]">Password</Label>
                            <div className="relative">
                                <Input
                                    {...register("password")}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="bg-[#07111B] border-[#1f2d3d] text-[#F3F4F6] placeholder:text-[#6B7280] focus:border-[#C89B5A]/50 h-11 rounded-xl pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#9CA3AF] transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-xs text-red-400">{errors.password.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm text-[#9CA3AF]">Confirm password</Label>
                            <Input
                                {...register("confirmPassword")}
                                type="password"
                                placeholder="••••••••"
                                className="bg-[#07111B] border-[#1f2d3d] text-[#F3F4F6] placeholder:text-[#6B7280] focus:border-[#C89B5A]/50 h-11 rounded-xl"
                            />
                            {errors.confirmPassword && (
                                <p className="text-xs text-red-400">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full h-11 bg-[#C89B5A] hover:bg-[#D8B178] text-[#07111B] font-semibold rounded-xl transition-all duration-200 hover:shadow-[0_0_20px_rgba(200,155,90,0.25)]"
                        >
                            {isSubmitting ? (
                                <div className="w-4 h-4 border-2 border-[#07111B]/30 border-t-[#07111B] rounded-full animate-spin" />
                            ) : (
                                <>
                                    Create account <ArrowRight className="ml-2 w-4 h-4" />
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px bg-[#1f2d3d]" />
                        <span className="text-xs text-[#6B7280]">or</span>
                        <div className="flex-1 h-px bg-[#1f2d3d]" />
                    </div>

                    <p className="text-center text-sm text-[#9CA3AF]">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="text-[#C89B5A] hover:text-[#D8B178] transition-colors font-medium"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </motion.div>
        <Toaster />
        </div>
    );
}