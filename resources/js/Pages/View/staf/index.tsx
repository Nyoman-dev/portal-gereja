import { Head } from "@inertiajs/react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

type Staf = {
    id: number;
    nama: string;
    jabatan: string;
    alamat: string;
    telepon: string;
    kode_jabatan: string;
};
export default function Staf({ data }: { data: Staf[] }) {
    return (
        <>
            <Navbar />
            <Head title="Staf" />
            <div className="flex flex-col min-h-screen font-[poppins]">
                <div className="container mx-auto px-4 py-8">
                    <div className="relative w-full rounded-xl border border-zinc-300 bg-white">
                        <div className="flex items-center justify-between border-b border-zinc-300 px-5 py-4">
                            <div className="flex items-center gap-x-2.5">
                                <h1 className="text-xl font-semibold">
                                    Staf Gereja Toraja Jemaat Masakke
                                </h1>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm rtl:text-right">
                                <thead className="border-b border-zinc-300 text-zinc-500 text-sm">
                                    <tr>
                                        <th className="px-4 py-3">No</th>
                                        <th className="px-4 py-3">Nama</th>
                                        <th className="px-4 py-3">Jabatan</th>
                                        <th className="px-4 py-3">Alamat</th>
                                        <th className="px-4 py-3">Telepon</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-300">
                                    {data.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className="text-center py-4"
                                            >
                                                Tidak ada data
                                            </td>
                                        </tr>
                                    ) : (
                                        data.map((item, index) => (
                                            <tr
                                                key={item.id}
                                                className="text-sm"
                                            >
                                                <td className="px-4 py-2">
                                                    {index + 1}
                                                </td>
                                                <td className="px-4 py-2">
                                                    {item.nama}
                                                </td>
                                                <td className="px-4 py-2">
                                                    {item.jabatan}
                                                </td>
                                                <td className="px-4 py-2">
                                                    {item.alamat}
                                                </td>
                                                <td className="px-4 py-2">
                                                    {item.telepon}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
