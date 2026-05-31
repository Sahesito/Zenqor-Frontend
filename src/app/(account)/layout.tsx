
import { AccountGuard } from "@/components/account-guard";

export default function AccountLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AccountGuard>
            {children}
        </AccountGuard>
    );
}