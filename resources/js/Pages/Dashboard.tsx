import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { ChartBarInteractive } from "@/components/Chart";

type Laporan = {
    id: number;
    keterangan: string;
    tanggal: string;
    total_masuk: string;
    total_keluar: string;
};
export default function Dashboard({ laporans }: { laporans: Laporan[] }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            You're logged in!
                        </div>
                        <ChartBarInteractive laporans={laporans} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
