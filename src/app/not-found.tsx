import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#07111B] flex items-center justify-center px-6">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#C89B5A]/5 rounded-full blur-[100px]" />
            </div>

            <div className="relative text-center">
                <p className="text-[#C89B5A] text-sm font-medium tracking-widest uppercase mb-4">
                    404 Error
                </p>
                <h1 className="text-6xl font-semibold text-[#F3F4F6] mb-4">
                    Page not found
                </h1>
                <p className="text-[#9CA3AF] mb-8 max-w-sm mx-auto">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link href="/">
                    <Button className="bg-[#C89B5A] hover:bg-[#D8B178] text-[#07111B] font-semibold rounded-xl px-6">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to home
                    </Button>
                </Link>
            </div>
        </div>
    );
}