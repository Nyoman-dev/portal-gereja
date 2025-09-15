"use client";

import { Head } from "@inertiajs/react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Bookmark, Send, CalendarClock, HeartHandshake } from "lucide-react";
import { Link } from "@inertiajs/react";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

type Berita = {
    id: number;
    judul: string;
    deskripsi: string;
    gambar: string;
    tanggal: string;
};

type Agenda = {
    tanggal: string;
    tempat_ibadah: string;
    waktu_ibadah: string;
    pf: string;
    pi: string;
};

export default function Home({
    news,
    berita,
    agenda,
    image,
    renungan,
}: {
    news: Berita;
    berita: Berita[];
    agenda: Agenda;
    image: Berita[];
    renungan: Berita;
}) {
    function truncateChars(text: string, maxChars: number) {
        return text.length > maxChars ? text.slice(0, maxChars) + "..." : text;
    }

    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    );

    return (
        <>
            <Navbar />
            <Head title="Home" />
            <div className="flex flex-col min-h-screen font-[poppins] bg-[#FFFBF7]">
                <div className="mx-20 px-4 py-8">
                    <h1 className="md:text-4xl text-3xl font-bold mb-4 text-[#FD6B35]">
                        Warta gereja Toraja Jemaat Masakke
                    </h1>
                    <p className="md:text-lg text-[#06141A] font-medium">
                        Temukan informasi yang anda butuhkan di sini
                    </p>
                    <div className="mt-10 mx-auto">
                        <Carousel
                            plugins={[plugin.current]}
                            className="w-[95%] mx-auto"
                            onMouseEnter={plugin.current.stop}
                            onMouseLeave={plugin.current.reset}
                        >
                            <CarouselContent>
                                {image.map((item, index) => (
                                    <CarouselItem key={index}>
                                        <div className="p-1">
                                            <Card>
                                                <CardContent className="p-1 h-[300px]">
                                                    <img
                                                        src={`/storage/${item.gambar}`}
                                                        alt={`Gambar-${index}`}
                                                        className="object-cover w-full h-full rounded-lg"
                                                    />
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="mt-5 md:mt-10 col-span-2">
                            <h2 className="text-2xl flex gap-2 items-center border-b-2 border-[#06141A] pb-5 font-semibold">
                                <Bookmark className="text-[#FD6B35]" />
                                Berita Terkini
                            </h2>
                            <div className="mt-10">
                                <img
                                    src={`/storage/${news.gambar}`}
                                    alt={news.judul}
                                    className="rounded w-full md:h-[400px] h-[300px] object-cover"
                                />
                                <div className="mt-5 flex flex-col gap-2">
                                    <p className="font-medium text-lg text-[#6141A]">
                                        {news.judul}
                                    </p>
                                    <p className="flex gap-1 text-sm text-[#06141A]">
                                        <CalendarClock className="w-4 h-4 text-[#FD6B35]" />{" "}
                                        {news.tanggal}
                                    </p>
                                    <p className=" text-slate-500">
                                        {truncateChars(news.deskripsi, 100)}
                                    </p>
                                    <Link
                                        href={`/berita`}
                                        className="bg-[#FD6B35] w-fit py-2 px-5 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300"
                                    >
                                        Baca Selangkapnya
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="mt-10 md:mt-20 p-4">
                            <h2 className="text-xl mb-4 flex gap-2 items-center text-[#06141A] font-medium">
                                <Send className=" text-[#FD6B35]" />
                                Agenda Kegiatan
                            </h2>
                            <div className="flex gap-1 mt-2">
                                {agenda ? (
                                    <div className="p-2 w-full bg-[#FD6B35] border border-slate-300 text-white px-8 py-3 rounded-lg text-sm">
                                        <h5>{agenda.tanggal}</h5>
                                        <div className="grid grid-cols-[120px_auto] gap-x-2">
                                            <div>Tempat Ibadah</div>
                                            <div>: {agenda.tempat_ibadah}</div>
                                        </div>
                                        <div className="grid grid-cols-[120px_auto] gap-x-2">
                                            <div>Waktu Ibadah</div>
                                            <div>: {agenda.waktu_ibadah}</div>
                                        </div>
                                        <div className="grid grid-cols-[120px_auto] gap-x-2">
                                            <div>PF</div>
                                            <div>: {agenda.pf}</div>
                                        </div>
                                        <div className="grid grid-cols-[120px_auto] gap-x-2">
                                            <div>PI</div>
                                            <div>: {agenda.pi}</div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-4 w-full bg-[#FD6B35] border border-slate-300 text-white px-8 py-3 rounded-lg text-sm text-center">
                                        Belum ada Agenda.
                                    </div>
                                )}
                            </div>
                            <h2 className="text-xl mb-2 mt-4 flex gap-2 items-center text-[#06141A] font-medium">
                                <HeartHandshake className=" text-[#FD6B35]" />
                                Renungan
                            </h2>
                            <div className="flex gap-1 mt-2">
                                {renungan ? (
                                    <div className="p-2 w-full bg-[#FD6B35] px-8 py-3 border border-slate-300 text-white rounded-lg text-sm">
                                        <h5>{renungan.tanggal}</h5>
                                        <div>{renungan.judul}</div>
                                        <div>*{renungan.deskripsi}*</div>
                                    </div>
                                ) : (
                                    <div className="p-4 w-full bg-[#FD6B35] px-8 py-3 border border-slate-300 text-white rounded-lg text-sm text-center">
                                        Belum ada Renungan.
                                    </div>
                                )}
                            </div>
                            <h2 className="text-xl mb-4 flex gap-2 items-center text-[#06141A] font-medium mt-10">
                                Berita Lainnya
                            </h2>
                            <p className="text-[#06141A] text-sm border-b-2 border-[#06141A] pb-5">
                                Kunjungi halaman berikut untuk informasi
                                selengkapnya
                            </p>
                            <div className="mt-5 flex gap-4 justify-between md:flex-col">
                                {berita.length === 0 ? (
                                    <div className="flex gap-4">
                                        Belum ada berita lainnya...
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
                                                <p className="text-lg text-[#06141A] font-medium">
                                                    {item.judul}
                                                </p>
                                                <p className="text-sm text-[#06141A] flex gap-1">
                                                    <CalendarClock className="w-4 h-4 text-[#FD6B35]" />{" "}
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
