"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Footer } from "@/components/landing/footer";

export default function HomePage() {
  const router = useRouter();
  const { token, user, initialize } = useAuthStore();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initialize();
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (token) {
      if (user?.role === "ADMIN") {
        router.push("/dashboard");
      } else {
        router.push("/store");
      }
    }
  }, [ready, token, user]);

  if (!ready || token) {
    return (
      <div className="min-h-screen bg-[#07111B] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C89B5A]/20 border-t-[#C89B5A] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="bg-[#07111B] min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </main>
  );
}