import { Head } from "@inertiajs/react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

type Profil = {
    id: number;
    judul: string;
    deskripsi: string;
    gambar: string;
};

export default function Profil({ data }: { data: Profil[] }) {
    return (
        <>
            <Navbar />
            <Head title="Profil" />
            <div className="flex flex-col min-h-screen mx-20 font-[poppins]">
                <div className="container mx-auto px-4 py-8">
                    <h1 className=" font-bold text-3xl py-8">Profil Gereja</h1>
                </div>
                <section className="bg-[#F9F6E8]">
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-0"
                        >
                            <div className="md:w-1/2 text-[#29581F] font-bold">
                                <h2 className="font-anton text-slate-900 text-[32px] sm:text-[36px] md:text-[40px] leading-tight mb-4">
                                    {item.judul}
                                </h2>
                                <p className="text-base text-slate-500 mb-6 max-w-xl">
                                    {item.deskripsi}
                                </p>
                                <p className="text-slate-500 text-base mb-6 max-w-xl">
                                    Secara keseluruhan, pada pertengahan tahun
                                    2022, Gereja Toraja memiliki 1.144 Jemaat
                                    yang tersebar dalam 95 klasis di 17 provinsi
                                    di indonesia, dengan total anggota mencapai
                                    262.171 jiwa.
                                </p>
                                <p className="text-slate-500 text-base max-w-xl">
                                    Sebagai bagian dari Gereja Toraja, Jemaat
                                    Masakke berkomitmen untuk melaksanakan
                                    pelayanan dan kegiatan Rohani sesuai dengan
                                    visi dan misi Gereja Toraja, serta berperan
                                    aktif dalam kehidupan dan bermasyarakat.
                                </p>
                            </div>
                            <div className="md:w-1/2 relative flex justify-center md:justify-end">
                                <img
                                    alt="jami"
                                    className="w-[600px] max-w-full h-auto rounded-[50%_50%_50%_50%/40%_30%_80%_80%]"
                                    height="600"
                                    src={`/storage/${item.gambar}`}
                                    width="600"
                                />
                            </div>
                        </div>
                    ))}
                </section>
            </div>

            <Footer />
        </>
    );
}
