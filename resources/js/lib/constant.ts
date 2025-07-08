import { LayoutDashboard, School, Newspaper, User } from "lucide-react";

interface NavItem {
    title: string;
    url: string;
    icon: any;
    items?: { title: string; url: string }[];
}
export const data = {
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Profil",
            url: "/dashboard/profil",
            icon: School,
        },
        {
            title: "Berita",
            url: "/dashboard/berita",
            icon: Newspaper,
        },
        {
            title: "Staf",
            url: "/dashboard/staf",
            icon: User,
        },
    ] as NavItem[],
};
