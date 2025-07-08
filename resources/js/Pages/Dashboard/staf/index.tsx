import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Monitor } from "lucide-react";
import { StafCreate } from "./components/staf-create-dialog";
import { ProfilEdit } from "./components/staf-edit-dialog";
import { ProfilDelete } from "./components/staf-delete-dialog";

type Staf = {
    id: number;
    nama: string;
    jabatan: string;
    alamat: string;
    telepon: string;
    kode_jabatan: string;
};
export default function ProfilIndex({ data }: { data: Staf[] }) {
    return (
        <AuthenticatedLayout>
            <Head title="Monitoring" />
            <div className="relative w-full rounded-xl border border-zinc-300 bg-white">
                <div className="flex items-center justify-between border-b border-zinc-300 px-5 py-4">
                    <div className="flex items-center gap-x-2.5">
                        <Monitor className="size-6 text-zinc-500" />
                        <h1 className="text-xl">Staf</h1>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <div className="relative">
                            <StafCreate />
                        </div>
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
                                        <td className="px-4 py-2 flex gap-3">
                                            <ProfilEdit
                                                data={item}
                                            ></ProfilEdit>
                                            <ProfilDelete
                                                data={item}
                                            ></ProfilDelete>
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
