import { Link, usePage } from "@inertiajs/react";
import { Menu, House, FileUser, Newspaper, User, BellPlus } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

export function Navbar() {
    const [show, setShow] = useState(false);
    const menuAktif = show ? "top-[26%]" : "-top-[20%]";
    const handleMenu = () => {
        setShow(!show);
    };

    const { url } = usePage();
    const isActive = (path: string) => url === path;

    const menuRef = useRef<HTMLUListElement | null>(null);
    useEffect(() => {
        function handleClickOutside(event: Event) {
            if (
                show &&
                menuRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                !(
                    event.target instanceof Element &&
                    (event.target.closest('a[href="/"]') ||
                        event.target.closest('a[href="/profil"]') ||
                        event.target.closest('a[href="/berita"]') ||
                        event.target.closest('a[href="/staf"]'))
                )
            ) {
                setShow(false);
            }
        }

        function handleScroll() {
            if (show) {
                setShow(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("scroll", handleScroll);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [show]);

    return (
        <div className="navbar font-[poppins] py-6 bg-[#1a546d] text-white">
            <div className="mx-20 px-4">
                <div className="navbar-box flex items-center justify-between">
                    <div className="logo">
                        <Link
                            href="/"
                            className="text-2xl font-bold text-[#FF6934]"
                        >
                            Gereja
                        </Link>
                    </div>
                    <ul
                        className={`flex lg:gap-10 font-semibold md:static md:flex-row md:shadow-none md:bg-transparent md:w-auto md:h-full md:translate-y-0 md:p-0 md:m-0 md:transition-none gap-8 fixed ${menuAktif} left-0 right-0 -translate-y-1/2 flex-col px-8 py-6 rounded shadow-lg shadow-slate-300 bg-[#232323] transition-all duration-500 items-center text-right`}
                    >
                        <li>
                            <Link
                                href="/"
                                className={`flex gap-2 hover:text-gray-400 ${
                                    isActive("/")
                                        ? "text-[#FF6934] underline underline-offset-4"
                                        : ""
                                }`}
                            >
                                <House className="h-5 w-5" /> Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/agenda"
                                className={`flex gap-2 hover:text-gray-400 ${
                                    isActive("/agenda")
                                        ? "text-[#FF6934] underline underline-offset-4"
                                        : ""
                                }`}
                            >
                                <BellPlus className="h-5 w-5" /> Agenda
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/profil"
                                className={`flex gap-2 hover:text-gray-400 ${
                                    isActive("/profil")
                                        ? "text-[#FF6934] underline underline-offset-4"
                                        : ""
                                }`}
                            >
                                <FileUser className="h-5 w-5" /> Profil
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/berita"
                                className={`flex gap-2 hover:text-gray-400 ${
                                    isActive("/berita")
                                        ? "text-[#FF6934] underline underline-offset-4"
                                        : ""
                                }`}
                            >
                                <Newspaper className="h-5 w-5" /> Berita
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/staf"
                                className={`flex gap-2 hover:text-gray-400 ${
                                    isActive("/staf")
                                        ? "text-[#FF6934] underline underline-offset-4"
                                        : ""
                                }`}
                            >
                                <User className="h-5 w-5" /> Staf
                            </Link>
                        </li>
                    </ul>
                    <div className="login flex gap-5">
                        <Button className="bg-[#FF6934]">
                            <a
                                href="/login"
                                target="_blank"
                                className="hover:text-[#FF6934] hidden md:block"
                            >
                                Login
                            </a>
                        </Button>
                        <Menu
                            className="md:hidden cursor-pointer"
                            onClick={handleMenu}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
