import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Monitor } from "lucide-react";
import { AgendaCreate } from "./components/agenda-create-dialog";
import { AgendaEdit } from "./components/agenda-edit-dialog";
import { AgendaDelete } from "./components/agenda-delete-dialog";
import { AgendaSendSms } from "./components/agenda-sms-dialog";
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
export default function BeritaIndex({ data }: { data: Agenda[] }) {
    return (
        <AuthenticatedLayout>
            <Head title="Agenda" />
            <div className="relative w-full rounded-xl border border-zinc-300 bg-white">
                <div className="flex items-center justify-between border-b border-zinc-300 px-5 py-4">
                    <div className="flex items-center gap-x-2.5">
                        <Monitor className="size-6 text-zinc-500" />
                        <h1 className="text-xl">Agenda</h1>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <div className="relative">
                            <AgendaCreate />
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm rtl:text-right">
                        <thead className="border-b border-zinc-300 text-zinc-500 text-sm">
                            <tr>
                                <th className="px-4 py-3">No</th>
                                <th className="px-4 py-3">Tanggal</th>
                                <th className="px-4 py-3">Tempat Ibadah</th>
                                <th className="px-4 py-3">Waktu Ibadah</th>
                                <th className="px-4 py-3">Pelayan Firman</th>
                                <th className="px-4 py-3">Pelayan Ibadah</th>
                                <th className="px-4 py-3">Aksi</th>
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
                                    <tr key={item.id} className="text-sm">
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
                                        <td className="px-4 py-2 max-w-lg">
                                            {item.pf}
                                        </td>
                                        <td className="px-4 py-2 max-w-lg">
                                            {item.pi}
                                        </td>
                                        <td className=" flex gap-1 items-center">
                                            <AgendaSendSms data={item} />
                                            <AgendaEdit data={item} />
                                            <AgendaDelete data={item} />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
