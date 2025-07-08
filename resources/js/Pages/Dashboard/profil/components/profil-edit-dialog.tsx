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
import { Textarea } from "@/Components/ui/textarea";
import { toast } from "sonner";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { SquarePen } from "lucide-react";

type Profil = {
    id: number;
    judul: string;
    deskripsi: string;
    gambar: string;
};

export function ProfilEdit({ data }: { data: Profil }) {
    const [judul, setJudul] = useState(data.judul);
    const [deskripsi, setDeskripsi] = useState(data.deskripsi);
    const [gambar, setGambar] = useState<File | null>(null);
    const handleUpdate = () => {
        const formData = new FormData();
        formData.append("_method", "put");
        formData.append("judul", judul);
        if (gambar) {
            formData.append("gambar", gambar);
        }
        formData.append("deskripsi", deskripsi);
        router.post("/dashboard/profil/" + data.id, formData, {
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
                    <DialogTitle>Edit Profil</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when
                        you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
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
                        <Label htmlFor="gambar">Gambar</Label>
                        <Input
                            id="gambar"
                            name="gambar"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                if (
                                    e.target.files &&
                                    e.target.files.length > 0
                                ) {
                                    setGambar(e.target.files[0]);
                                }
                            }}
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
