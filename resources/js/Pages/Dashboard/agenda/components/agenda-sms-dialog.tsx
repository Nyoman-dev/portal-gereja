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
import { Mails } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

type Agenda = {
    id: number;
    tanggal: string;
    tempat_ibadah: string;
    waktu_ibadah: string;
    pf: string;
    pi: string;
};

export function AgendaSendSms({ data }: { data: Agenda }) {
    const [open, setOpen] = useState(false);

    const formatTanggal = (tanggalStr: string) => {
        const date = new Date(tanggalStr);
        return date.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    const getDefaultMessage = (data: Agenda): string => {
        return `Syalom! Selamat pagi dan selamat hari Minggu teman²😇...  Untuk ibadah RT di 
laksanakan:
Hari/tgl:${formatTanggal(data.tanggal)}
Jam: ${data.waktu_ibadah}
Tempat: ${data.tempat_ibadah}
PF: ${data.pf}
PL: ${data.pi}
Kurre sumanga 🙏 TYM😇`;
    };

    const [pesan, setPesan] = useState(getDefaultMessage(data));

    const handleSendSms = () => {
        const formData = {
            pesan,
        };

        router.post("/dashboard/agenda/send", formData, {
            preserveScroll: true,
            onStart: () =>
                toast.loading("Kirim pesan...", { id: "kirim-pesan" }),
            onSuccess: () => {
                toast.dismiss("kirim-pesan");
                toast.success("SMS berhasil dikirim");
                setOpen(false);
            },
            onError: (error) => {
                toast.dismiss("kirim-pesan");
                toast.error(error?.message ?? "Gagal kirim SMS");
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
                    <Mails />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Kirim SMS</DialogTitle>
                    <DialogDescription>
                        Edit pesan sebelum dikirim ke jemaat.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="grid gap-3">
                        <Label>Preview Pesan SMS</Label>
                        <Textarea
                            className="h-40"
                            value={pesan}
                            onChange={(e) => setPesan(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" onClick={handleSendSms}>
                        Kirim Pesan
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
