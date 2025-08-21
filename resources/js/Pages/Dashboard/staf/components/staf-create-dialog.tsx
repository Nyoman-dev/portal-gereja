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

export function StafCreate() {
    const [nama, setNama] = useState("");
    const [jabatan, setJabatan] = useState("");
    const [alamat, setAlamat] = useState("");
    const [telepon, setTelepon] = useState("");
    const handleCreate = () => {
        const formData = new FormData();
        formData.append("nama", nama);
        formData.append("jabatan", jabatan);
        formData.append("alamat", alamat);
        formData.append("telepon", telepon);
        router.post("/dashboard/staf", formData, {
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
                    <DialogTitle>Tambah Staf</DialogTitle>
                    <DialogDescription>
                        Make changes to your staf here. Click save when
                        you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="grid gap-3">
                        <Label htmlFor="nama">Nama</Label>
                        <Input
                            id="nama"
                            name="nama"
                            placeholder="Nama"
                            onChange={(e) => setNama(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="jabatan">Jabatan</Label>
                        <Input
                            id="jabatan"
                            name="jabatan"
                            placeholder="Jabatan"
                            onChange={(e) => setJabatan(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="alamat">Alamat</Label>
                        <Input
                            id="alamat"
                            name="alamat"
                            placeholder="Alamat "
                            onChange={(e) => setAlamat(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="telepon">Telepon</Label>
                        <Input
                            id="telepon"
                            name="telepon"
                            type="number"
                            placeholder="+62-xxx-xxx-xxx"
                            onChange={(e) => setTelepon(e.target.value)}
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
