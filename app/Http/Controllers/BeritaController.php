<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BeritaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Dashboard/berita/index', [
            'data' => Berita::all()
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
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'gambar' => 'required|image|mimes:jpeg,png,jpg,gif',
        ]);
        if ($request->hasFile('gambar')) {
            $filePath = $request->file('gambar')->store('images', 'public');
            $validated['gambar'] = $filePath;
        }
        $validated['tanggal'] = now();
        $validated['slug'] = Str::slug($validated['judul']);
        Berita::create($validated);
    }

    /**
     * Display the specified resource.
     */
    public function show(Berita $berita)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Berita $berita)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Berita $beritum)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
        ]);
        if ($request->hasFile('gambar')) {
            $filePath = $request->file('gambar')->store('images', 'public');
            $validated['gambar'] = $filePath;
        }
        $validated['slug'] = Str::slug($validated['judul']);
        Berita::where('id', $beritum->id)->update($validated);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Berita $beritum)
    {
        if ($beritum->gambar && Storage::disk('public')->exists($beritum->gambar)) {
            Storage::disk('public')->delete($beritum->gambar);
        }
        Berita::destroy($beritum->id);
    }
}
