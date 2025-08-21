import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronRight, ChevronsUpDown, LogOut, Tent } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, usePage } from "@inertiajs/react";
import { User } from "@/types";
import { data } from "@/lib/constant";
import { useState } from "react";

const SIDEBAR_MENU_COOKIE_NAME = "sidebar:menu:state";
const SIDEBAR_MENU_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export default function TheSidebar({ user }: { user: User }) {
    const pathname = usePage().url;
    const [openMenus, setOpenMenus] = useState<string[]>(() => {
        try {
            const cookieValue = document.cookie
                .split("; ")
                .find((row) => row.startsWith(SIDEBAR_MENU_COOKIE_NAME))
                ?.split("=")[1];
            return cookieValue
                ? JSON.parse(decodeURIComponent(cookieValue))
                : [];
        } catch {
            return [];
        }
    });

    const handleCollapsibleChange = (title: string, isOpen: boolean) => {
        const newOpenMenus = isOpen
            ? [...openMenus, title]
            : openMenus.filter((menu) => menu !== title);

        setOpenMenus(newOpenMenus);

        // Set cookie with the new state
        document.cookie = `${SIDEBAR_MENU_COOKIE_NAME}=${encodeURIComponent(
            JSON.stringify(newOpenMenus)
        )}; path=/; max-age=${SIDEBAR_MENU_COOKIE_MAX_AGE}`;
    };

    return (
        <Sidebar variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <Tent className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        Portal Gereja Toraja
                                    </span>
                                    <span className="truncate text-xs">
                                        Jemaat Masakke
                                    </span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Platform</SidebarGroupLabel>
                    <SidebarMenu>
                        {data.navMain.map((item) => {
                            if (item.items) {
                                const isDefaultOpen =
                                    item.items.find((subItem) =>
                                        pathname.startsWith(subItem.url)
                                    ) !== undefined;

                                return (
                                    <Collapsible
                                        key={item.title}
                                        asChild
                                        open={
                                            openMenus.includes(item.title) ||
                                            isDefaultOpen
                                        }
                                        onOpenChange={(isOpen) =>
                                            handleCollapsibleChange(
                                                item.title,
                                                isOpen
                                            )
                                        }
                                        className="group/collapsible"
                                    >
                                        <SidebarMenuItem>
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton
                                                    tooltip={item.title}
                                                >
                                                    {item.icon && (
                                                        <item.icon
                                                            className={cn({
                                                                "text-sky-600":
                                                                    item.items.find(
                                                                        (
                                                                            subItem
                                                                        ) =>
                                                                            pathname.startsWith(
                                                                                subItem.url
                                                                            )
                                                                    ) !==
                                                                    undefined,
                                                            })}
                                                        />
                                                    )}
                                                    <span>{item.title}</span>
                                                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <SidebarMenuSub>
                                                    {item.items?.map(
                                                        (subItem) => (
                                                            <SidebarMenuSubItem
                                                                key={
                                                                    subItem.title
                                                                }
                                                            >
                                                                <SidebarMenuSubButton
                                                                    asChild
                                                                    isActive={pathname.includes(
                                                                        subItem.url
                                                                    )}
                                                                >
                                                                    <Link
                                                                        href={
                                                                            subItem.url
                                                                        }
                                                                    >
                                                                        <span>
                                                                            {
                                                                                subItem.title
                                                                            }
                                                                        </span>
                                                                    </Link>
                                                                </SidebarMenuSubButton>
                                                            </SidebarMenuSubItem>
                                                        )
                                                    )}
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </SidebarMenuItem>
                                    </Collapsible>
                                );
                            } else {
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={pathname.startsWith(
                                                item.url
                                            )}
                                        >
                                            <Link href={item.url}>
                                                <item.icon
                                                    className={cn({
                                                        "text-sky-600":
                                                            pathname.startsWith(
                                                                item.url
                                                            ),
                                                    })}
                                                />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            }
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <Avatar className="size-8 overflow-hidden rounded-lg">
                                        <AvatarImage src={""} alt={user.name} />
                                        <AvatarFallback className="rounded-lg">
                                            {user.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">
                                            {user.name}
                                        </span>
                                        <span className="truncate text-xs">
                                            {user.email}
                                        </span>
                                    </div>
                                    <ChevronsUpDown className="ml-auto size-4" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                side="bottom"
                                align="end"
                                sideOffset={4}
                            >
                                <DropdownMenuLabel className="p-0 font-normal">
                                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                        <Avatar className="size-8 rounded-lg">
                                            <AvatarImage
                                                src={""}
                                                alt={user.name}
                                                className="rounded-lg"
                                            />
                                            <AvatarFallback className="rounded-lg">
                                                {user.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold">
                                                {user.name}
                                            </span>
                                            <span className="truncate text-xs">
                                                {user.email}
                                            </span>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link
                                        method="post"
                                        href={route("logout")}
                                        as="button"
                                        className="w-full cursor-pointer"
                                    >
                                        <LogOut />
                                        Log out
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
