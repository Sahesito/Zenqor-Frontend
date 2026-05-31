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


const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    });

    const router = useRouter();
    const setSession = useAuthStore((s) => s.setSession);

    const onSubmit = async (data: LoginForm) => {
        try {
            const res = await api.post('/auth/login', data);
            setSession(res.data.token, res.data.user);
            toast.success('Welcome back!');
            if (res.data.user.role === 'ADMIN') {
                router.push('/dashboard');
            } else {
                router.push('/store');
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen bg-[#07111B] flex items-center justify-center px-6">
            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C89B5A]/6 rounded-full blur-[100px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative w-full max-w-sm"
            >
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <Link href="/">
                        <img src="/Zenqor.png" alt="ZENQOR" className="h-8 w-auto" />
                    </Link>
                </div>

                {/* Card */}
                <div className="bg-[#111827] border border-[#1f2d3d] rounded-2xl p-8">
                    <div className="mb-8">
                        <h1 className="text-xl font-semibold text-[#F3F4F6] mb-1">
                            Welcome back
                        </h1>
                        <p className="text-sm text-[#9CA3AF]">
                            Sign in to your ZENQOR account
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Email */}
                        <div className="space-y-2">
                            <Label className="text-sm text-[#9CA3AF]">Email</Label>
                            <Input
                                {...register("email")}
                                type="email"
                                placeholder="you@company.com"
                                className="bg-[#07111B] border-[#1f2d3d] text-[#F3F4F6] placeholder:text-[#6B7280] focus:border-[#C89B5A]/50 focus:ring-[#C89B5A]/20 h-11 rounded-xl"
                            />
                            {errors.email && (
                                <p className="text-xs text-red-400">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label className="text-sm text-[#9CA3AF]">Password</Label>
                                <Link
                                    href="#"
                                    className="text-xs text-[#C89B5A] hover:text-[#D8B178] transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Input
                                    {...register("password")}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="bg-[#07111B] border-[#1f2d3d] text-[#F3F4F6] placeholder:text-[#6B7280] focus:border-[#C89B5A]/50 focus:ring-[#C89B5A]/20 h-11 rounded-xl pr-10"
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

                        {/* Submit */}
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full h-11 bg-[#C89B5A] hover:bg-[#D8B178] text-[#07111B] font-semibold rounded-xl transition-all duration-200 hover:shadow-[0_0_20px_rgba(200,155,90,0.25)]"
                        >
                            {isSubmitting ? (
                                <div className="w-4 h-4 border-2 border-[#07111B]/30 border-t-[#07111B] rounded-full animate-spin" />
                            ) : (
                                <>
                                    Sign in <ArrowRight className="ml-2 w-4 h-4" />
                                </>
                            )}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px bg-[#1f2d3d]" />
                        <span className="text-xs text-[#6B7280]">or</span>
                        <div className="flex-1 h-px bg-[#1f2d3d]" />
                    </div>

                    <p className="text-center text-sm text-[#9CA3AF]">
                        Don't have an account?{" "}
                        <Link
                            href="/register"
                            className="text-[#C89B5A] hover:text-[#D8B178] transition-colors font-medium"
                        >
                            Sign up
                        </Link>
                    </p>
                    <Toaster />
                </div>
            </motion.div>
        </div>
    );
}