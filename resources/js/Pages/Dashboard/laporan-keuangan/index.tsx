import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Monitor } from "lucide-react";
import { LaporanCreate } from "./components/laporan-create-dialog";
import { LaporanEdit } from "./components/laporan-edit-dialog";
import { LaporanDelete } from "./components/laporan-delete-dialog";
import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

type Laporan = {
    id: number;
    keterangan: string;
    masuk: string;
    keluar: string;
    tanggal: string;
};

type FilterState = {
    from?: Date;
    to?: Date;
};
export default function BeritaIndex({
    data,
    totalMasuk,
    totalKeluar,
}: {
    data: Laporan[];
    totalMasuk: number;
    totalKeluar: number;
}) {
    const convertToRupiah = (number: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(number);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Laporan Keuangan" />
            <div className="flex items-center gap-x-2">
                <div className="relative">
                    <LaporanCreate />
                </div>
            </div>
            <div className="relative w-full rounded-xl border border-zinc-300 bg-white">
                <div className="flex items-center justify-between border-b border-zinc-300 px-5 py-4">
                    <div className="flex items-center gap-x-2.5">
                        <Monitor className="size-6 text-zinc-500" />
                        <h1 className="text-xl">Laporan Keuangan</h1>
                    </div>
                    {/* <div className="flex items-center gap-x-2">
                        <DateRangePicker
                            from={filterState.from}
                            to={filterState.to}
                            key={`periode-${key}`}
                            onSelect={(from, to) => {
                                handleFilterChange("from", from);
                                handleFilterChange("to", to);
                            }}
                            placeholder="Pilih Tanggal"
                            className="bg-black text-white"
                        />
                        <Button>Cari Data</Button>
                    </div> */}
                </div>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Tanggal</TableHead>
                                <TableHead>Keterangan</TableHead>
                                <TableHead className="text-center">
                                    Masuk
                                </TableHead>
                                <TableHead className="text-center">
                                    Keluar
                                </TableHead>
                                <TableHead className="text-center">
                                    Action
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.tanggal}</TableCell>
                                    <TableCell>{item.keterangan}</TableCell>
                                    <TableCell className="text-right">
                                        {convertToRupiah(
                                            Number(item.masuk || 0)
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {convertToRupiah(
                                            Number(item.keluar || 0)
                                        )}
                                    </TableCell>
                                    <TableCell className="flex gap-x-2 justify-center">
                                        <LaporanEdit data={item} />
                                        <LaporanDelete data={item} />
                                    </TableCell>
                                </TableRow>
                            ))}

                            <TableRow className="font-bold">
                                <TableCell colSpan={2} className="text-center">
                                    Total
                                </TableCell>
                                <TableCell className="text-right">
                                    {convertToRupiah(totalMasuk || 0)}
                                </TableCell>
                                <TableCell className="text-right">
                                    {convertToRupiah(totalKeluar || 0)}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
