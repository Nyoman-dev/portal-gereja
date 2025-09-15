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
    const [nominal, setNominal] = useState("");
    const [jenis, setJenis] = useState("");

    const handleCreate = () => {
        const formData = new FormData();
        formData.append("keterangan", keterangan);
        formData.append("nominal", nominal);
        formData.append("jenis", jenis);
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
                            <Label htmlFor="jenis">Jenis</Label>
                            <Select name="jenis" onValueChange={setJenis}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih jenis" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>
                                            Keterangan Jenis
                                        </SelectLabel>
                                        <SelectItem value="masuk">
                                            Mausk
                                        </SelectItem>
                                        <SelectItem value="keluar">
                                            Keluar
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="nominal">Nominal</Label>
                            <Input
                                id="nominal"
                                name="nominal"
                                type="number"
                                placeholder="Rp. 0"
                                onChange={(e) => setNominal(e.target.value)}
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
