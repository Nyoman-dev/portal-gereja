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

type Profil = {
    id: number;
    judul: string;
    deskripsi: string;
    gambar: string;
};

export function ProfilDelete({ data }: { data: Profil }) {
    const handleDelete = () => {
        const formData = new FormData();
        formData.append("_method", "delete");

        router.post("/dashboard/profil/" + data.id, formData, {
            forceFormData: true,
            preserveScroll: true,
            onStart: () =>
                toast.loading("Deleting data...", { id: "delete-data" }),
            onSuccess: () => {
                toast.dismiss("delete-data");
                toast.success("Data berhasil dihapus");
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
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-red-600">
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
