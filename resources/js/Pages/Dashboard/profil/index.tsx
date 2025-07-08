import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Monitor } from "lucide-react";
import { ProfilCreate } from "./components/profil-create-dialog";
import { ProfilEdit } from "./components/profil-edit-dialog";
import { ProfilDelete } from "./components/profil-delete-dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/Components/ui/drawer";

type Profil = {
    id: number;
    judul: string;
    deskripsi: string;
    gambar: string;
};
export default function ProfilIndex({ data }: { data: Profil[] }) {
    return (
        <AuthenticatedLayout>
            <Head title="Profil" />
            <div className="relative w-full rounded-xl border border-zinc-300 bg-white">
                <div className="flex items-center justify-between border-b border-zinc-300 px-5 py-4">
                    <div className="flex items-center gap-x-2.5">
                        <Monitor className="size-6 text-zinc-500" />
                        <h1 className="text-xl">Profil</h1>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <div className="relative">
                            <ProfilCreate></ProfilCreate>
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm rtl:text-right">
                        <thead className="border-b border-zinc-300 text-zinc-500 text-sm">
                            <tr>
                                <th className="px-4 py-3">No</th>
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
                                            {item.judul}
                                        </td>
                                        <td className="px-4 py-2 max-w-xl">
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
