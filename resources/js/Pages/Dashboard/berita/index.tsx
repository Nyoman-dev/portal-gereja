import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Monitor } from "lucide-react";
import { BeritaCreate } from "./components/berita-create-dialog";
import { BeritaEdit } from "./components/berita-edit-dialog";
import { BeritaDelete } from "./components/berita-delete-dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/Components/ui/drawer";

type Berita = {
    id: number;
    judul: string;
    deskripsi: string;
    gambar: string;
    tanggal: string;
};
export default function BeritaIndex({ data }: { data: Berita[] }) {
    return (
        <AuthenticatedLayout>
            <Head title="Berita" />
            <div className="relative w-full rounded-xl border border-zinc-300 bg-white">
                <div className="flex items-center justify-between border-b border-zinc-300 px-5 py-4">
                    <div className="flex items-center gap-x-2.5">
                        <Monitor className="size-6 text-zinc-500" />
                        <h1 className="text-xl">Berita</h1>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <div className="relative">
                            <BeritaCreate></BeritaCreate>
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm rtl:text-right">
                        <thead className="border-b border-zinc-300 text-zinc-500 text-sm">
                            <tr>
                                <th className="px-4 py-3">No</th>
                                <th className="px-4 py-3">Tanggal</th>
                                <th className="px-4 py-3">Judul</th>
                                <th className="px-4 py-3">Deskripsi</th>
                                <th className="px-4 py-3">Gambar</th>
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
                                            {item.tanggal}
                                        </td>
                                        <td className="px-4 py-2">
                                            {item.judul}
                                        </td>
                                        <td className="px-4 py-2 max-w-lg">
                                            {item.deskripsi}
                                        </td>
                                        <td className="px-4 py-2">
                                            <Drawer>
                                                <DrawerTrigger asChild>
                                                    <img
                                                        src={`/storage/${item.gambar}`}
                                                        alt={item.judul}
                                                        className="max-w-[100px] max-h-[40px] object-cover rounded cursor-pointer"
                                                    />
                                                </DrawerTrigger>
                                                <DrawerContent>
                                                    <div className="mx-auto w-full max-w-sm">
                                                        <DrawerHeader>
                                                            <DrawerTitle>
                                                                Detail Gambar
                                                            </DrawerTitle>
                                                        </DrawerHeader>
                                                        <img
                                                            src={`/storage/${item.gambar}`}
                                                            alt={item.judul}
                                                            className="rounded"
                                                        />
                                                        <DrawerFooter>
                                                            <DrawerClose
                                                                asChild
                                                            ></DrawerClose>
                                                        </DrawerFooter>
                                                    </div>
                                                </DrawerContent>
                                            </Drawer>
                                        </td>
                                        <td className="px-4 py-2 flex gap-3 items-center">
                                            <BeritaEdit
                                                data={item}
                                            ></BeritaEdit>
                                            <BeritaDelete
                                                data={item}
                                            ></BeritaDelete>
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
