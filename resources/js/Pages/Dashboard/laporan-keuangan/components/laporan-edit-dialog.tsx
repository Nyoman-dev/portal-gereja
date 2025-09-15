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
import { useEffect } from "react";
import { SquarePen } from "lucide-react";

type Laporan = {
    id: number;
    keterangan: string;
    masuk: string;
    keluar: string;
    tanggal: string;
};

export function LaporanEdit({ data }: { data: Laporan }) {
    const [keterangan, setKeterangan] = useState(data.keterangan);
    const [nominal, setNominal] = useState("");
    const [jenis, setJenis] = useState("");
    const [tanggal, setTanggal] = useState<Date | undefined>(
        data.tanggal ? new Date(data.tanggal) : undefined
    );
    useEffect(() => {
        if (data.masuk !== null) {
            setNominal(data.masuk);
            setJenis("total_masuk");
        } else if (data.keluar !== null) {
            setNominal(data.keluar);
            setJenis("total_keluar");
        }
    }, [data]);

    const handleUpdate = () => {
        const formData = new FormData();
        formData.append("_method", "put");
        formData.append("keterangan", keterangan);
        formData.append("nominal", nominal);
        formData.append("jenis", jenis);
        formData.append("tanggal", tanggal?.toISOString().split("T")[0] ?? "");

        router.post("/dashboard/laporan-keuangan/" + data.id, formData, {
            forceFormData: true,
            preserveScroll: true,
            onStart: () =>
                toast.loading("Updating data...", { id: "update-data" }),
            onSuccess: () => {
                toast.dismiss("update-data");
                toast.success("Data berhasil diperbarui");
            },
            onError: (error) => {
                toast.dismiss("update-data");
                if (error?.message) {
                    toast.error(error.message);
                } else {
                    toast.error("Update gagal");
                }
            },
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <SquarePen></SquarePen>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Laporan</DialogTitle>
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
                            value={keterangan}
                            onChange={(e) => setKeterangan(e.target.value)}
                        />
                        <div className="grid gap-3">
                            <Label htmlFor="jenis">Jenis</Label>
                            <Select
                                name="jenis"
                                value={jenis}
                                onValueChange={setJenis}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih jenis" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>
                                            Keterangan Jenis
                                        </SelectLabel>
                                        <SelectItem value="masuk">
                                            Masuk
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
                                value={nominal}
                                onChange={(e) => setNominal(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" onClick={handleUpdate}>
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
