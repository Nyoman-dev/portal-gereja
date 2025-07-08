import Header from "@/Components/Header";
import TheSidebar from "@/Components/MainSidebar";
import { SidebarInset, SidebarProvider } from "@/Components/ui/sidebar";
import { usePage } from "@inertiajs/react";
import { PropsWithChildren, ReactNode } from "react";
import { Toaster } from "sonner";

export default function Authenticated({
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;

    return (
        <SidebarProvider>
            <TheSidebar user={user} />
            <SidebarInset className="overflow-hidden">
                <Toaster />
                <Header />
                <main className="flex flex-1 flex-col gap-4 p-6 pt-0">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
