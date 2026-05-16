import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Footer() {
    return (
        <footer className="border-t border-[#1f2d3d] py-12 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2">
                        <img src="/logo.png" alt="ZENQOR" className="h-6 w-auto" />
                    </div>

                    <div className="flex items-center gap-6 text-sm text-[#9CA3AF]">
                        {["Privacy", "Terms", "Docs", "Status"].map((item, i, arr) => (
                            <span key={item} className="flex items-center gap-6">
                                <Link href="#" className="hover:text-[#F3F4F6] transition-colors">
                                    {item}
                                </Link>
                                {i < arr.length - 1 && (
                                    <Separator orientation="vertical" className="h-3 bg-[#1f2d3d]" />
                                )}
                            </span>
                        ))}
                    </div>

                    <p className="text-xs text-[#6B7280]">
                        © 2025 ZENQOR. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}