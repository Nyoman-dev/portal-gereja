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
import { Trash2 } from "lucide-react";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { useState } from "react";

type Agenda = {
    id: number;
    tanggal: string;
    tempat_ibadah: string;
    waktu_ibadah: string;
    pf: string;
    pi: string;
};

export function AgendaDelete({ data }: { data: Agenda }) {
    const [open, setOpen] = useState(false);

    const handleDelete = () => {
        const formData = {
            _method: "delete",
        };

        router.post("/dashboard/agenda/" + data.id, formData, {
            forceFormData: true,
            preserveScroll: true,
            onStart: () =>
                toast.loading("Deleting data...", { id: "delete-data" }),
            onSuccess: () => {
                toast.dismiss("delete-data");
                toast.success("Data berhasil dihapus");
                setOpen(false);
            },
            onError: (error) => {
                toast.dismiss("delete-data");
                if (error?.message) {
                    toast.error(error.message);
                } else {
                    toast.error("Delete gagal");
                }
            },
        });
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    onClick={() => setOpen(true)}
                    className="px-2"
                    variant={"outline"}
                >
                    <Trash2></Trash2>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Informasi !</DialogTitle>
                    <DialogDescription>
                        Anda yakin menghapus data ini !!!
                    </DialogDescription>
                </DialogHeader>
                <Button
                    type="submit"
                    className="bg-red-600"
                    onClick={handleDelete}
                >
                    Hapus
                </Button>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
