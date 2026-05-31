"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuthStore } from "@/store/auth.store";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Toaster } from "@/components/ui/sonner";
import { Camera, Shield, Bell, Palette, User, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";


const profileSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    company: z.string().optional(),
    role: z.string().optional(),
});

type ProfileForm = z.infer<typeof profileSchema>;

const inputClass =
    "bg-[#07111B] border-[#1f2d3d] text-[#F3F4F6] placeholder:text-[#6B7280] focus:border-[#C89B5A]/50 h-10 rounded-xl";

const tabs = [
    { key: "profile", label: "Profile", icon: User },
    { key: "security", label: "Security", icon: Shield },
    { key: "notifications", label: "Notifications", icon: Bell },
    { key: "appearance", label: "Appearance", icon: Palette },
];

export default function AccountSettingsPage() {
    const { user, setSession, token } = useAuthStore();
    const isAdmin = user?.role === "ADMIN";

    const [activeTab, setActiveTab] = useState("profile");
    const [notifications, setNotifications] = useState({
        email: true,
        sales: true,
        products: false,
        security: true,
    });
    const [passwordData, setPasswordData] = useState({
        current: "",
        newPass: "",
        confirm: "",
    });
    const [passwordLoading, setPasswordLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ProfileForm>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user?.name || "",
            email: user?.email || "",
            company: "",
            role: user?.role || "",
        },
    });

    const onSaveProfile = async (data: ProfileForm) => {
        try {
            const res = await api.patch("/users/profile", {
                name: data.name,
                email: data.email,
                company: data.company,
            });
            if (token) {
                setSession(token, { ...user!, ...res.data });
            }
            toast.success("Profile updated", { description: "Your changes have been saved." });
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to update profile");
        }
    };

    const onSavePassword = async () => {
        if (passwordData.newPass !== passwordData.confirm) {
            toast.error("Passwords don't match");
            return;
        }
        if (passwordData.newPass.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }
        try {
            setPasswordLoading(true);
            await api.patch("/users/password", {
                currentPassword: passwordData.current,
                newPassword: passwordData.newPass,
            });
            toast.success("Password updated successfully");
            setPasswordData({ current: "", newPass: "", confirm: "" });
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to update password");
        } finally {
            setPasswordLoading(false);
        }
    };

    return (
        <>
            <div className="min-h-screen bg-[#07111B]">
                {!isAdmin && (
                    <div className="border-b border-[#1f2d3d] px-6 h-16 flex items-center gap-3">
                        <Link href="/store">
                            <Button variant="ghost" size="icon" className="text-[#9CA3AF] hover:text-[#F3F4F6]">
                                <ArrowLeft className="w-4 h-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-sm font-semibold text-[#F3F4F6]">Settings</h1>
                            <p className="text-xs text-[#9CA3AF]">Manage your account preferences</p>
                        </div>
                    </div>
                )}

                <div className={`flex ${isAdmin ? "h-screen" : "h-[calc(100vh-4rem)]"}`}>
                    <aside className="w-56 border-r border-[#1f2d3d] p-4 shrink-0">
                        <nav className="space-y-1">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-3 h-9 rounded-lg text-sm transition-all duration-200 text-left",
                                        activeTab === tab.key
                                            ? "bg-[#C89B5A]/10 text-[#C89B5A] border border-[#C89B5A]/20"
                                            : "text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#1f2d3d]/50"
                                    )}
                                >
                                    <tab.icon className="w-4 h-4 shrink-0" />
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </aside>

                    <div className="flex-1 overflow-y-auto p-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                transition={{ duration: 0.2 }}
                                className="max-w-2xl"
                            >
                                {activeTab === "profile" && (
                                    <div className="bg-[#111827] border border-[#1f2d3d] rounded-2xl p-6 space-y-6">
                                        <div>
                                            <h3 className="text-sm font-semibold text-[#F3F4F6]">Profile</h3>
                                            <p className="text-xs text-[#9CA3AF] mt-0.5">Update your personal information.</p>
                                        </div>
                                        <div className="h-px bg-[#1f2d3d]" />
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <Avatar className="w-16 h-16">
                                                    <AvatarFallback className="bg-[#C89B5A]/20 text-[#C89B5A] text-xl font-semibold">
                                                        {user?.name?.split(" ").map((n) => n[0]).join("") || "U"}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#C89B5A] rounded-full flex items-center justify-center">
                                                    <Camera className="w-3 h-3 text-[#07111B]" />
                                                </button>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-[#F3F4F6]">{user?.name}</p>
                                                <p className="text-xs text-[#9CA3AF]">
                                                    {isAdmin ? "Administrator" : "Customer"}
                                                </p>
                                            </div>
                                        </div>
                                        <form onSubmit={handleSubmit(onSaveProfile)} className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label className="text-sm text-[#9CA3AF]">Full Name</Label>
                                                    <Input {...register("name")} className={inputClass} />
                                                    {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-sm text-[#9CA3AF]">Email</Label>
                                                    <Input {...register("email")} className={inputClass} />
                                                    {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
                                                </div>
                                            </div>
                                            <div className={`grid gap-4 ${isAdmin ? "grid-cols-2" : "grid-cols-1"}`}>
                                                <div className="space-y-2">
                                                    <Label className="text-sm text-[#9CA3AF]">Company</Label>
                                                    <Input {...register("company")} className={inputClass} />
                                                </div>
                                                {isAdmin && (
                                                    <div className="space-y-2">
                                                        <Label className="text-sm text-[#9CA3AF]">Role</Label>
                                                        <Input
                                                            {...register("role")}
                                                            disabled
                                                            className={`${inputClass} opacity-50 cursor-not-allowed`}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex justify-end pt-2">
                                                <Button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="bg-[#C89B5A] hover:bg-[#D8B178] text-[#07111B] font-semibold rounded-xl px-6"
                                                >
                                                    {isSubmitting ? (
                                                        <div className="w-4 h-4 border-2 border-[#07111B]/30 border-t-[#07111B] rounded-full animate-spin" />
                                                    ) : "Save Changes"}
                                                </Button>
                                            </div>
                                        </form>
                                    </div>
                                )}

                                {activeTab === "security" && (
                                    <div className="bg-[#111827] border border-[#1f2d3d] rounded-2xl p-6 space-y-5">
                                        <div>
                                            <h3 className="text-sm font-semibold text-[#F3F4F6]">Security</h3>
                                            <p className="text-xs text-[#9CA3AF] mt-0.5">Update your password regularly.</p>
                                        </div>
                                        <div className="h-px bg-[#1f2d3d]" />
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label className="text-sm text-[#9CA3AF]">Current Password</Label>
                                                <Input
                                                    type="password"
                                                    placeholder="••••••••"
                                                    value={passwordData.current}
                                                    onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                                                    className={inputClass}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-sm text-[#9CA3AF]">New Password</Label>
                                                <Input
                                                    type="password"
                                                    placeholder="••••••••"
                                                    value={passwordData.newPass}
                                                    onChange={(e) => setPasswordData({ ...passwordData, newPass: e.target.value })}
                                                    className={inputClass}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-sm text-[#9CA3AF]">Confirm New Password</Label>
                                                <Input
                                                    type="password"
                                                    placeholder="••••••••"
                                                    value={passwordData.confirm}
                                                    onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                                                    className={inputClass}
                                                />
                                            </div>
                                            <div className="flex justify-end pt-2">
                                                <Button
                                                    onClick={onSavePassword}
                                                    disabled={passwordLoading}
                                                    className="bg-[#C89B5A] hover:bg-[#D8B178] text-[#07111B] font-semibold rounded-xl px-6"
                                                >
                                                    {passwordLoading ? (
                                                        <div className="w-4 h-4 border-2 border-[#07111B]/30 border-t-[#07111B] rounded-full animate-spin" />
                                                    ) : "Update Password"}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === "notifications" && (
                                    <div className="bg-[#111827] border border-[#1f2d3d] rounded-2xl p-6 space-y-5">
                                        <div>
                                            <h3 className="text-sm font-semibold text-[#F3F4F6]">Notifications</h3>
                                            <p className="text-xs text-[#9CA3AF] mt-0.5">Choose what you want to be notified about.</p>
                                        </div>
                                        <div className="h-px bg-[#1f2d3d]" />
                                        <div className="space-y-4">
                                            {[
                                                { key: "email", label: "Email Notifications", desc: "Receive updates via email" },
                                                { key: "sales", label: "New Sales Alerts", desc: "Get notified on every new order" },
                                                { key: "products", label: "Product Updates", desc: "Low stock and inventory alerts" },
                                                { key: "security", label: "Security Alerts", desc: "Login attempts and security events" },
                                            ].map((item) => (
                                                <div key={item.key} className="flex items-center justify-between py-2">
                                                    <div>
                                                        <p className="text-sm font-medium text-[#F3F4F6]">{item.label}</p>
                                                        <p className="text-xs text-[#9CA3AF] mt-0.5">{item.desc}</p>
                                                    </div>
                                                    <Switch
                                                        checked={notifications[item.key as keyof typeof notifications]}
                                                        onCheckedChange={(checked) => {
                                                            setNotifications((prev) => ({ ...prev, [item.key]: checked }));
                                                            toast.success(`${item.label} ${checked ? "enabled" : "disabled"}`);
                                                        }}
                                                        className="data-[state=checked]:bg-[#C89B5A]"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === "appearance" && (
                                    <div className="bg-[#111827] border border-[#1f2d3d] rounded-2xl p-6 space-y-5">
                                        <div>
                                            <h3 className="text-sm font-semibold text-[#F3F4F6]">Appearance</h3>
                                            <p className="text-xs text-[#9CA3AF] mt-0.5">Customize your ZENQOR experience.</p>
                                        </div>
                                        <div className="h-px bg-[#1f2d3d]" />
                                        <div>
                                            <p className="text-sm text-[#9CA3AF] mb-3">Theme</p>
                                            <div className="grid grid-cols-3 gap-3">
                                                {[
                                                    { label: "Dark", active: true, bg: "#07111B", surface: "#111827" },
                                                    { label: "Darker", active: false, bg: "#020B13", surface: "#0a1628" },
                                                    { label: "Midnight", active: false, bg: "#050505", surface: "#0f0f0f" },
                                                ].map((theme) => (
                                                    <button
                                                        key={theme.label}
                                                        onClick={() => toast.info(`${theme.label} theme coming soon`)}
                                                        className={`relative rounded-xl p-3 border transition-all duration-200 ${theme.active
                                                            ? "border-[#C89B5A]/40 bg-[#C89B5A]/5"
                                                            : "border-[#1f2d3d] hover:border-[#C89B5A]/20"
                                                            }`}
                                                    >
                                                        <div className="w-full h-12 rounded-lg mb-2" style={{ background: theme.bg }}>
                                                            <div className="w-2/3 h-2 rounded mt-2 ml-2" style={{ background: theme.surface }} />
                                                        </div>
                                                        <p className="text-xs text-[#9CA3AF] text-center">{theme.label}</p>
                                                        {theme.active && (
                                                            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#C89B5A]" />
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
            <Toaster
                theme="dark"
                toastOptions={{
                    style: { background: "#111827", border: "1px solid #1f2d3d", color: "#F3F4F6" },
                }}
            />
        </>
    );
}