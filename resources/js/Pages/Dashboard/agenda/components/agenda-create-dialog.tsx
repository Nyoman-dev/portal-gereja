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
} from "@/Components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/Components/ui/label";
import { toast } from "sonner";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { DatePicker } from "@/Components/date-picker";

export function AgendaCreate() {
    const [tanggal, setTanggal] = useState<Date>();
    const [tempatIbadah, setTempatIbadah] = useState("");
    const [waktuIbadah, setWaktuIbadah] = useState("");
    const [pf, setPf] = useState("");
    const [pi, setPi] = useState("");
    const [open, setOpen] = useState(false);

    const handleCreate = () => {
        const formData = {
            tanggal: tanggal?.toISOString().split("T")[0],
            tempat_ibadah: tempatIbadah,
            waktu_ibadah: waktuIbadah,
            pf,
            pi,
        };

        router.post("/dashboard/agenda", formData, {
            preserveScroll: true,
            onStart: () =>
                toast.loading("Inserting data...", { id: "insert-data" }),
            onSuccess: () => {
                toast.dismiss("insert-data");
                toast.success("Data berhasil ditambahkan");
                setOpen(false);
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
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => setOpen(true)}>Tambah Data</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Tambah Agenda</DialogTitle>
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
                        <Label>Tempat Ibadah</Label>
                        <Input
                            value={tempatIbadah}
                            onChange={(e) => setTempatIbadah(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label>Jam Ibadah</Label>
                        <Input
                            type="time"
                            value={waktuIbadah}
                            onChange={(e) => setWaktuIbadah(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label>Pelayan Firman</Label>
                        <Input
                            value={pf}
                            onChange={(e) => setPf(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label>Pelayan Ibadah</Label>
                        <Input
                            value={pi}
                            onChange={(e) => setPi(e.target.value)}
                        />
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
