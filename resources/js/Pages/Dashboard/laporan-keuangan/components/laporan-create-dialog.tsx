import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { DatePicker } from "@/components/date-picker";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function LaporanCreate() {
    const [tanggal, setTanggal] = useState<Date>();
    const [keterangan, setKeterangan] = useState("");
    const [masuk, setMasuk] = useState("");
    const [keluar, setKeluar] = useState("");

    const handleCreate = () => {
        const formData = new FormData();
        formData.append("keterangan", keterangan);
        formData.append("masuk", masuk);
        formData.append("keluar", keluar);
        formData.append("tanggal", tanggal?.toISOString().split("T")[0] ?? "");
        router.post("/dashboard/laporan-keuangan", formData, {
            preserveScroll: true,
            onStart: () =>
                toast.loading("Inserting data...", { id: "insert-data" }),
            onSuccess: () => {
                toast.dismiss("insert-data");
                toast.success("Data berhasil ditambahkan");
            },
            onError: (error) => {
                toast.dismiss("insert-data");
                if (error?.message) {
                    toast.error(error.message);
                } else {
                    toast.error("Insert gagal");
                }
            },
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Tambah Data</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Tambah Data</DialogTitle>
                    <DialogDescription>
                        Make changes to your news here. Click save when
                        you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="grid gap-3">
                        <Label>Tanggal</Label>
                        <DatePicker value={tanggal} onChange={setTanggal} />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="username-1">Keterangan</Label>
                        <Textarea
                            placeholder="Keterangan kegiatan."
                            onChange={(e) => setKeterangan(e.target.value)}
                        />
                        <div className="grid gap-3">
                            <Label htmlFor="nominal">Masuk</Label>
                            <Input
                                id="masuk"
                                name="masuk"
                                type="number"
                                placeholder="Rp. 0"
                                onChange={(e) => setMasuk(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="nominal">Keluar</Label>
                            <Input
                                id="keluar"
                                name="keluar"
                                type="number"
                                placeholder="Rp. 0"
                                onChange={(e) => setKeluar(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" onClick={handleCreate}>
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
