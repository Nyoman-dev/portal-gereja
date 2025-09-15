import {
    LayoutDashboard,
    School,
    Newspaper,
    User,
    BellPlus,
    HeartHandshake,
    NotebookTabs,
} from "lucide-react";

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
            title: "Laporan Keuangan",
            url: "/dashboard/laporan-keuangan",
            icon: NotebookTabs,
        },
        {
            title: "Agenda",
            url: "/dashboard/agenda",
            icon: BellPlus,
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
            title: "Renungan",
            url: "/dashboard/renungan",
            icon: HeartHandshake,
        },
        {
            title: "Staf",
            url: "/dashboard/staf",
            icon: User,
        },
    ] as NavItem[],
};
