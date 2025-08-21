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

export function ProfilCreate() {
    const [judul, setJudul] = useState("");
    const [gambar, setGambar] = useState<File | null>(null);
    const [deskripsi, setDeskripsi] = useState("");
    const handleCreate = () => {
        const formData = new FormData();
        formData.append("judul", judul);
        if (gambar) {
            formData.append("gambar", gambar);
        }
        formData.append("deskripsi", deskripsi);
        router.post("/dashboard/profil", formData, {
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
                    <DialogTitle>Tambah Profil</DialogTitle>
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
                            defaultValue="Judul "
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
                            placeholder="Type your message here."
                            onChange={(e) => setDeskripsi(e.target.value)}
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
