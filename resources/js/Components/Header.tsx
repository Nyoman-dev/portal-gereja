import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { SidebarTrigger } from "./ui/sidebar";
import { formatBreadcrumbText } from "@/lib/utils";
import { usePage } from "@inertiajs/react";
import { Fragment } from "react/jsx-runtime";
import { Link } from "@inertiajs/react";
import { Separator } from "./ui/separator";

export default function Header() {
    const page = usePage();
    const pathname = page.url.split("?")[0];
    const searchParams = new URLSearchParams(window.location.search);
    const breadcrumbData = pathname.split("/").filter(Boolean);

    const getBreadcrumbLink = (item: string, index: number) => {
        let link = "";
        for (let i = 0; i <= index; i++) {
            link += `/${breadcrumbData[i]}`;
        }

        if (
            link.includes("/das/pembacaan/wilayah") ||
            link.includes("/monitoring/pembacaan")
        ) {
            const periode = searchParams.get("periode");
            const idWilayah = searchParams.get("id_wilayah");

            if (periode && idWilayah) {
                link += `?periode=${periode}&id_wilayah=${idWilayah}`;
            }
        }

        return link;
    };

    return (
        <header className="flex h-16 shrink-0 items-center gap-2">
            <div className="flex items-center gap-2 px-5">
                <SidebarTrigger />
                <Separator orientation="vertical" className="mx-0.5 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        {breadcrumbData.map((item, index) => (
                            <Fragment key={index}>
                                <BreadcrumbItem>
                                    {index === breadcrumbData.length - 1 ? (
                                        <BreadcrumbPage>
                                            {formatBreadcrumbText(item)}
                                        </BreadcrumbPage>
                                    ) : index === 0 ? (
                                        <BreadcrumbLink className="cursor-default pointer-events-none">
                                            {formatBreadcrumbText(item)}
                                        </BreadcrumbLink>
                                    ) : (
                                        <BreadcrumbLink asChild>
                                            <Link
                                                href={getBreadcrumbLink(
                                                    item,
                                                    index
                                                )}
                                            >
                                                {formatBreadcrumbText(item)}
                                            </Link>
                                        </BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                                {index < breadcrumbData.length - 1 && (
                                    <BreadcrumbSeparator className="hidden md:block" />
                                )}
                            </Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    );
}
