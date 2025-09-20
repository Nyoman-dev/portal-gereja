import { Link } from "@inertiajs/react";
import { House, FileUser, Newspaper, User, Tent } from "lucide-react";

export function Footer() {
    return (
        <div className="footer mt-20 font-[poppins] py-20 bg-[#1a546d] text-white">
            <div className="container mx-auto px-4">
                <div className="footer-box flex justify-around">
                    <div className="logo w-1/2">
                        <Link
                            href="/"
                            className="text-3xl font-bold flex gap-2 items-center"
                        >
                            <Tent className="w-8 h-8 text-[#FD6B35]"></Tent>{" "}
                            Gereja Toraja Jemaat Masakke
                        </Link>
                        <p className="mt-10">
                            Gereja Toraja Jemaat Masakke adalah salah satu
                            jemaat yang berada di bawah naungan Gereja Toraja,
                            sebuah denominasi Kristen Protestan yang berpusat di
                            Tana Toraja, Sulawesi selatan.
                        </p>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2349.5983156973007!2d120.2147749913956!3d-2.860830091071926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d916306f1f178c9%3A0x6ea4606fdb25f469!2sGereja%20Toraja%20Jemaat%20Masakke!5e1!3m2!1sid!2sid!4v1758116178709!5m2!1sid!2sid"
                            width="400"
                            height="300"
                            style={{ border: "0" }}
                            loading="lazy"
                        ></iframe>
                    </div>
                    <ul className={`flex flex-col gap-4`}>
                        <h2 className="text-2xl font-bold">Navigation</h2>
                        <li>
                            <Link
                                href="/home"
                                className="hover:text-gray-400 flex gap-2"
                            >
                                <House></House>Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/profil"
                                className="hover:text-gray-400  flex gap-2"
                            >
                                <FileUser></FileUser>Profil
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/berita"
                                className="hover:text-gray-400  flex gap-2"
                            >
                                <Newspaper></Newspaper>Berita
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/staf"
                                className="hover:text-gray-400  flex gap-2"
                            >
                                <User></User>Staf
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="border-t border-gray-600 mt-10">
                    <p className="text-center mt-10">
                        &copy; 2025 Gereja Toraja Jemaat Masakke
                    </p>
                </div>
            </div>
        </div>
    );
}
