import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { Head, Link } from "@inertiajs/react";
import { Bookmark, CalendarClock, MoveLeft } from "lucide-react";

type Berita = {
    id: number;
    judul: string;
    deskripsi: string;
    gambar: string;
    tanggal: string;
};

export default function detail({ data }: { data: Berita }) {
    return (
        <>
            <Navbar />
            <Head title="Detail Berita" />
            <div className="flex flex-col min-h-screen font-[poppins]">
                <div className="container mx-auto px-4 py-8">
                    <div className="mt-10">
                        <Link
                            href="/berita"
                            className="bg-black py-2 px-5 rounded-lg text-white"
                        >
                            Kembali
                        </Link>
                        <h2 className="mt-5 text-2xl flex gap-2 items-center border-b-2 border-slate-300 pb-5">
                            <Bookmark></Bookmark>
                            {data.judul}
                        </h2>
                        <div className="mt-10">
                            <img
                                src={`/storage/${data.gambar}`}
                                alt={data.judul}
                                className="rounded w-full md:h-[400px] h-[300px] object-cover"
                            />
                            <div className="mt-5 flex flex-col gap-2">
                                <p className="flex gap-1 text-sm text-slate-500">
                                    <CalendarClock className="w-4 h-4" />{" "}
                                    {data.tanggal}
                                </p>
                                <p className=" text-slate-500">
                                    {data.deskripsi}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
