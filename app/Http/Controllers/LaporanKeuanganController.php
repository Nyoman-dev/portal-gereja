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
    public function index()
    {
        $query = Laporan::orderBy('tanggal', 'asc')->get();
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
        $jenis = $request['jenis'];
        Laporan::create([
            'tanggal' => $tanggal,
            'keterangan' => $request['keterangan'],
            'masuk' => $jenis == 'masuk' ? $request['nominal'] : null,
            'keluar' => $jenis == 'keluar' ? $request['nominal'] : null,
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
        $jenis = $request['jenis'];

        Laporan::where('id', $id)->update([
            'tanggal' => $tanggal,
            'keterangan' => $request['keterangan'],
            'masuk' => $jenis == 'masuk' ? $request['nominal'] : null,
            'keluar' => $jenis == 'keluar' ? $request['nominal'] : null,
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
