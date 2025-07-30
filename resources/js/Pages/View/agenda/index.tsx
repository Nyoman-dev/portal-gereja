import { Head } from "@inertiajs/react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { format } from "date-fns";
import { id } from "date-fns/locale";

type Agenda = {
    id: number;
    tanggal: string;
    tempat_ibadah: string;
    waktu_ibadah: string;
    pf: string;
    pi: string;
};
export default function Agenda({ data }: { data: Agenda[] }) {
    return (
        <>
            <Navbar />
            <Head title="Agenda" />
            <div className="flex flex-col min-h-screen font-[poppins] w-3/4 mx-auto">
                <div className="container mx-auto px-4 py-8">
                    <div className="relative w-full rounded-xl border border-zinc-300 bg-white">
                        <div className="flex items-center justify-between border-b border-zinc-300 px-5 py-4">
                            <div className="flex items-center gap-x-2.5">
                                <h1 className="text-xl font-semibold">
                                    Jadwal Ibadah Gereja Toraja Jemaat Masakke
                                </h1>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm rtl:text-right">
                                <thead className="border-b border-zinc-300 text-zinc-500 text-sm">
                                    <tr>
                                        <th className="px-4 py-3">No</th>
                                        <th className="px-4 py-3">Tanggal</th>
                                        <th className="px-4 py-3">
                                            Tempat Ibadah
                                        </th>
                                        <th className="px-4 py-3">
                                            Waktu Ibadah
                                        </th>
                                        <th className="px-4 py-3">
                                            Pelayan Firman
                                        </th>
                                        <th className="px-4 py-3">
                                            Pelayan Ibadah
                                        </th>
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
                                                    {format(
                                                        new Date(item.tanggal),
                                                        "EEEE, dd MMMM yyyy",
                                                        { locale: id }
                                                    )}
                                                </td>
                                                <td className="px-4 py-2">
                                                    {item.tempat_ibadah}
                                                </td>
                                                <td className="px-4 py-2">
                                                    {item.waktu_ibadah}
                                                </td>
                                                <td className="px-4 py-2">
                                                    {item.pf}
                                                </td>
                                                <td className="px-4 py-2">
                                                    {item.pi}
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
