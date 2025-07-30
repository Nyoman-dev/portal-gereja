<?php

namespace App\Http\Controllers;

use App\Models\Staf;
use Illuminate\Http\Request;

class StafController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Dashboard/staf/index', [
            'data' => Staf::all()
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
            'nama' => 'required|string|max:255',
            'jabatan' => 'required|string',
            'alamat' => 'required|string',
            'telepon' => 'required|numeric',
        ]);
        Staf::create($validated);
    }

    /**
     * Display the specified resource.
     */
    public function show(Staf $staf)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Staf $staf)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Staf $staf)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'jabatan' => 'required|string',
            'alamat' => 'required|string',
            'telepon' => 'required|numeric',
        ]);
        Staf::where('id', $staf->id)->update($validated);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Staf $staf)
    {
        Staf::destroy($staf->id);
    }
}
