import { Head } from "@inertiajs/react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import {
    Bookmark,
    Instagram,
    MapPinned,
    Send,
    CalendarClock,
} from "lucide-react";
import { Link } from "@inertiajs/react";

type Berita = {
    id: number;
    judul: string;
    deskripsi: string;
    gambar: string;
    tanggal: string;
};

export default function Home({
    news,
    berita,
}: {
    news: Berita;
    berita: Berita[];
}) {
    function truncateChars(text: string, maxChars: number) {
        return text.length > maxChars ? text.slice(0, maxChars) + "..." : text;
    }

    return (
        <>
            <Navbar />
            <Head title="Home" />
            <div className="flex flex-col min-h-screen font-[poppins]">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="md:text-4xl text-3xl font-bold mb-4">
                        Welcome to the Home Page
                    </h1>
                    <p className="md:text-lg text-gray-700">
                        Temukan informasi yang anda butuhkan di sini
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="mt-10 md:mt-20 col-span-2">
                            <h2 className="text-2xl flex gap-2 items-center border-b-2 border-slate-300 pb-5">
                                <Bookmark></Bookmark>Berita Terkini
                            </h2>
                            <div className="mt-10">
                                <img
                                    src={`/storage/${news.gambar}`}
                                    alt={news.judul}
                                    className="rounded w-full md:h-[400px] h-[300px] object-cover"
                                />
                                <div className="mt-5 flex flex-col gap-2">
                                    <p className="font-medium text-lg text-slate-800">
                                        {news.judul}
                                    </p>
                                    <p className="flex gap-1 text-sm text-slate-500">
                                        <CalendarClock className="w-4 h-4" />{" "}
                                        {news.tanggal}
                                    </p>
                                    <p className=" text-slate-500">
                                        {truncateChars(news.deskripsi, 100)}
                                    </p>
                                    <Link
                                        href={`/berita`}
                                        className="bg-[#232323] w-fit py-2 px-5 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300"
                                    >
                                        Baca Selangkapnya
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="mt-10 md:mt-20 p-4">
                            <h2 className="text-xl mb-4 flex gap-2 items-center text-slate-800">
                                <Send></Send>Stay Connected
                            </h2>
                            <p className="text-gray-500 text-sm">
                                Kunjungi halaman berikut untuk informasi
                                selengkapnya
                            </p>
                            <div className="flex gap-1">
                                <a
                                    href="https://www.instagram.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-black text-white w-14 h-14 rounded-lg hover:bg-gray-700 hover:text-gray-200 flex items-center justify-center mt-4 transition-colors duration-300"
                                    aria-label="Instagram"
                                >
                                    <Instagram />
                                </a>
                                <a
                                    href="https://maps.app.goo.gl/UvgS55t6emB8kKtK6"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-black text-white w-14 h-14 rounded-lg hover:bg-gray-700 hover:text-gray-200 flex items-center justify-center mt-4 transition-colors duration-300"
                                    aria-label="Instagram"
                                >
                                    <MapPinned></MapPinned>
                                </a>
                            </div>
                            <h2 className="text-xl mb-4 flex gap-2 items-center text-slate-800 mt-10">
                                Berita Lainnya
                            </h2>
                            <p className="text-gray-500 text-sm border-b-2 border-slate-300 pb-5">
                                Kunjungi halaman berikut untuk informasi
                                selengkapnya
                            </p>
                            <div className="mt-5 flex gap-4 justify-between md:flex-col">
                                {berita.length === 0 ? (
                                    <div className="flex gap-4">
                                        <div className="h-20 w-20 bg-black"></div>
                                        <div>
                                            <p className="text-lg text-slate-700 font-medium">
                                                Judul Berita
                                            </p>
                                            <p className="text-sm text-slate-400">
                                                2 Maret 2023
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    berita.map((item) => (
                                        <Link
                                            href={`/berita`}
                                            key={item.id}
                                            className="flex gap-4"
                                        >
                                            <img
                                                src={`/storage/${item.gambar}`}
                                                alt={item.judul}
                                                className="rounded h-20 w-20 object-cover"
                                            />
                                            <div>
                                                <p className="text-lg text-slate-700 font-medium">
                                                    {item.judul}
                                                </p>
                                                <p className="text-sm text-slate-400">
                                                    {item.tanggal}
                                                </p>
                                            </div>
                                        </Link>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
