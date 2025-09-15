<?php

namespace App\Http\Controllers;

use App\Models\Renungan;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Carbon\Carbon;

class RenunganController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Dashboard/renungan/index', [
            'data' => Renungan::all()
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
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
        ]);
        $validated['tanggal'] = $tanggal;
        $validated['slug'] = Str::slug($validated['judul']);
        Renungan::create($validated);
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
    public function edit(string $id)
    {
        //
    }

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
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
        ]);
        $validated['slug'] = Str::slug($validated['judul']);
        $validated['tanggal'] = $tanggal;
        Renungan::where('id', $id)->update($validated);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Renungan::destroy($id);
    }
}
