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
import { toast } from "sonner";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { SquarePen } from "lucide-react";
import { DatePicker } from "@/components/date-picker";

type Agenda = {
    id: number;
    tanggal: string;
    tempat_ibadah: string;
    waktu_ibadah: string;
    pf: string;
    pi: string;
};

export function AgendaEdit({ data }: { data: Agenda }) {
    const [tanggal, setTanggal] = useState<Date | undefined>(
        data.tanggal ? new Date(data.tanggal) : undefined
    );
    const [tempatIbadah, setTempatIbadah] = useState(data.tempat_ibadah);
    const [waktuIbadah, setWaktuIbadah] = useState(data.waktu_ibadah);
    const [pf, setPf] = useState(data.pf);
    const [pi, setPi] = useState(data.pi);
    const [open, setOpen] = useState(false);

    const handleUpdate = () => {
        const formData = {
            tanggal: tanggal?.toISOString().split("T")[0],
            tempat_ibadah: tempatIbadah,
            waktu_ibadah: waktuIbadah,
            pf,
            pi,
            _method: "put",
        };

        router.post("/dashboard/agenda/" + data.id, formData, {
            forceFormData: true,
            preserveScroll: true,
            onStart: () =>
                toast.loading("Updating data...", { id: "update-data" }),
            onSuccess: () => {
                toast.dismiss("update-data");
                toast.success("Data berhasil diperbarui");
                setOpen(false);
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
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    onClick={() => setOpen(true)}
                    variant="outline"
                    className="px-2"
                >
                    <SquarePen></SquarePen>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Agenda</DialogTitle>
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
                    <Button type="submit" onClick={handleUpdate}>
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
