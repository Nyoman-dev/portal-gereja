import { Head, Link } from "@inertiajs/react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Bookmark, CalendarClock } from "lucide-react";

type Berita = {
    id: number;
    judul: string;
    deskripsi: string;
    gambar: string;
    tanggal: string;
};

export default function Berita({
    news,
    data,
}: {
    news: Berita;
    data: Berita[];
}) {
    function truncateChars(text: string, maxChars: number) {
        return text.length > maxChars ? text.slice(0, maxChars) + "..." : text;
    }
    return (
        <>
            <Navbar />
            <Head title="Berita" />
            <div className="flex flex-col min-h-screen font-[poppins]">
                <div className="container mx-auto px-4 py-8">
                    <div className="mt-10">
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
                                    {news.deskripsi}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 grid grid-cols-3 gap-4">
                        {data.length === 0 ? (
                            <div className="flex flex-col gap-2">
                                <div className="w-full bg-black h-[250px]"></div>
                                <div className="mt-5 flex flex-col gap-2">
                                    <p className="font-medium text-lg text-slate-800">
                                        Judul
                                    </p>
                                    <p className="flex gap-1 text-sm text-slate-500">
                                        <CalendarClock className="w-4 h-4" />{" "}
                                        01-01-2023
                                    </p>
                                    <p className=" text-slate-500">
                                        Deskripsi Singkat
                                    </p>
                                </div>
                            </div>
                        ) : (
                            data.map((item) => (
                                <Link
                                    key={item.id}
                                    href={`/detail/?id=${item.id}`}
                                    className="flex flex-col gap-2 hover:opacity-80"
                                >
                                    <img
                                        src={`/storage/${item.gambar}`}
                                        alt={item.judul}
                                        className="rounded w-full    h-[250px] object-cover"
                                    />
                                    <div className="mt-5 flex flex-col gap-2">
                                        <p className="font-medium text-lg text-slate-800">
                                            {item.judul}
                                        </p>
                                        <p className="flex gap-1 text-sm text-slate-500">
                                            <CalendarClock className="w-4 h-4" />{" "}
                                            {item.tanggal}
                                        </p>
                                        <p className=" text-slate-500">
                                            {truncateChars(news.deskripsi, 100)}
                                        </p>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
