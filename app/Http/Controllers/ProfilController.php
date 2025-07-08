<?php

namespace App\Http\Controllers;

use App\Models\Profil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProfilController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Dashboard/profil/index', [
            'data' => Profil::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'gambar' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        if ($request->hasFile('gambar')) {
            $filePath = $request->file('gambar')->store('images', 'public');
            $validated['gambar'] = $filePath;
        }
        Profil::create($validated);
    }

    /**
     * Display the specified resource.
     */
    public function show(Profil $profil)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Profil $profil) {}

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Profil $profil)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
        ]);
        if ($request->hasFile('gambar')) {
            $filePath = $request->file('gambar')->store('images', 'public');
            $validated['gambar'] = $filePath;
        }
        Profil::where('id', $profil->id)->update($validated);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Profil $profil)
    {
        if ($profil->gambar && Storage::disk('public')->exists($profil->gambar)) {
            Storage::disk('public')->delete($profil->gambar);
        }
        Profil::destroy($profil->id);
    }
}
