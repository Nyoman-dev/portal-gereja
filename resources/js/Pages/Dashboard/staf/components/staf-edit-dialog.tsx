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

type Staf = {
    id: number;
    nama: string;
    jabatan: string;
    alamat: string;
    telepon: string;
};

export function ProfilEdit({ data }: { data: Staf }) {
    const [nama, setNama] = useState(data.nama);
    const [jabatan, setJabatan] = useState(data.jabatan);
    const [alamat, setAlamat] = useState(data.alamat);
    const [telepon, setTelepon] = useState(data.telepon);
    const handleUpdate = () => {
        const formData = new FormData();
        formData.append("_method", "put");
        formData.append("nama", nama);
        formData.append("jabatan", jabatan);
        formData.append("alamat", alamat);
        formData.append("telepon", telepon);
        router.post("/dashboard/staf/" + data.id, formData, {
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
                            value={nama}
                            placeholder="Nama"
                            onChange={(e) => setNama(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="jabatan">Jabatan</Label>
                        <Input
                            id="jabatan"
                            name="jabatan"
                            value={jabatan}
                            placeholder="Jabatan"
                            onChange={(e) => setJabatan(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="alamat">Alamat</Label>
                        <Input
                            id="alamat"
                            name="alamat"
                            value={alamat}
                            placeholder="Alamat "
                            onChange={(e) => setAlamat(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="telepon">Telepon</Label>
                        <Input
                            id="telepon"
                            name="telepon"
                            value={telepon}
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
                    <Button type="submit" onClick={handleUpdate}>
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
