<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Laporan;
use Illuminate\Http\Request;

class LaporanKeuanganController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if (!$request->search) {
            // jika tidak ada request search, jangan ambil data apapun
            return inertia('Dashboard/laporan-keuangan/index', [
                'data' => [],
                'totalMasuk' => 0,
                'totalKeluar' => 0,
            ]);
        }
        if (Carbon::parse($request->search)->format('m Y') == date('m Y')) {
            $tanggal = Carbon::parse($request->search)->format('m Y');
        } else {
            $tanggal = date('m Y', strtotime($request->search . ' +1 day'));
        }
        [$bulan, $tahun] = explode(' ', $tanggal);
        $query = Laporan::orderBy('tanggal', 'asc')
            ->whereMonth('tanggal', $bulan)
            ->whereYear('tanggal', $tahun)
            ->get();
        $totalMasuk = $query->sum('masuk');
        $totalKeluar = $query->sum('keluar');

        return inertia('Dashboard/laporan-keuangan/index', [
            'data' => $query,
            'totalMasuk' => $totalMasuk,
            'totalKeluar' => $totalKeluar
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (Carbon::parse($request['tanggal'])->format('Y-m-d') == date('Y-m-d')) {
            $tanggal = Carbon::parse($request['tanggal'])->format('Y-m-d');
        } else {
            $tanggal = date('Y-m-d', strtotime($request['tanggal'] . ' +1 day'));
        }

        Laporan::create([
            'tanggal' => $tanggal,
            'keterangan' => $request['keterangan'],
            'masuk' => $request['masuk'],
            'keluar' => $request['keluar'],
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id) {}

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        if (Carbon::parse($request['tanggal'])->format('Y-m-d') == date('Y-m-d')) {
            $tanggal = Carbon::parse($request['tanggal'])->format('Y-m-d');
        } else {
            $tanggal = date('Y-m-d', strtotime($request['tanggal'] . ' +1 day'));
        }

        Laporan::where('id', $id)->update([
            'tanggal' => $tanggal,
            'keterangan' => $request['keterangan'],
            'masuk' => $request['masuk'],
            'keluar' => $request['keluar'],
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Laporan::destroy($id);
    }
}
