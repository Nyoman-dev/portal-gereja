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
import { SquarePen } from "lucide-react";
import { DatePicker } from "@/components/date-picker";

type Profil = {
    id: number;
    judul: string;
    deskripsi: string;
    tanggal: string;
};

export function RenunganEdit({ data }: { data: Profil }) {
    const [judul, setJudul] = useState(data.judul);
    const [deskripsi, setDeskripsi] = useState(data.deskripsi);
    const [gambar, setGambar] = useState<File | null>(null);
    const [tanggal, setTanggal] = useState<Date | undefined>(
        data.tanggal ? new Date(data.tanggal) : undefined
    );

    const handleUpdate = () => {
        const formData = new FormData();
        formData.append("_method", "put");
        formData.append("judul", judul);
        formData.append("deskripsi", deskripsi);
        formData.append("tanggal", tanggal?.toISOString().split("T")[0] ?? "");

        router.post("/dashboard/renungan/" + data.id, formData, {
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
                    <DialogTitle>Edit Renungan</DialogTitle>
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
                        <Label htmlFor="judul">Judul</Label>
                        <Input
                            id="judul"
                            name="judul"
                            value={judul}
                            onChange={(e) => setJudul(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="username-1">Deskripsi</Label>
                        <Textarea
                            value={deskripsi}
                            onChange={(e) => setDeskripsi(e.target.value)}
                        />
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
