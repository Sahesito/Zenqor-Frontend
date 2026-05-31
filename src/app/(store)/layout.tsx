import { StoreGuard } from "@/components/store-guard";
import { StoreNavbar } from "@/components/store/store-navbar";

export default function StoreLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <StoreGuard>
            <div className="min-h-screen bg-[#07111B]">
                <StoreNavbar />
                {children}
            </div>
        </StoreGuard>
    );
}