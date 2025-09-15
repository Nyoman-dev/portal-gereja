<?php

namespace App\Http\Controllers\View;

use App\Models\Staf;
use Inertia\Inertia;
use App\Models\Agenda;
use App\Models\Berita;
use App\Models\Profil;
use App\Models\Renungan;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Http\Controllers\Controller;


class ViewController extends Controller
{
    public function home()
    {
        $news = Berita::query()
            ->orderBy('created_at', 'desc')
            ->first();

        $berita = Berita::query()
            ->orderBy('created_at', 'desc')
            ->skip(1)
            ->take(2)
            ->get();

        $today = Carbon::today();
        $agenda = Agenda::orderByRaw('ABS(DATEDIFF(tanggal, ?))', [$today->toDateString()])
            ->first();

        $image = Berita::query()
            ->select('gambar')
            ->get();

        $renungan = Renungan::query()
            ->orderBy('created_at', 'desc')
            ->first();

        return Inertia::render('View/home/index', [
            'news' => $news,
            'berita' => $berita,
            'agenda' => $agenda,
            'image' => $image,
            'renungan' => $renungan
        ]);
    }

    public function berita()
    {
        $data = Berita::all();
        $news = Berita::query()
            ->orderBy('created_at', 'desc')
            ->first();
        return Inertia::render('View/berita/index', [
            'data' => $data,
            'news' => $news
        ]);
    }

    public function profil()
    {
        $data = Profil::all();
        return Inertia::render('View/profil/index', [
            'data' => $data
        ]);
    }

    public function staf()
    {
        $data = Staf::all();
        return Inertia::render('View/staf/index', [
            'data' => $data
        ]);
    }

    public function detail(Request $request)
    {
        $id = $request->id;
        $data = Berita::find($id);
        return Inertia::render('View/berita/components/detail', [
            'data' => $data
        ]);
    }

    public function agenda()
    {
        $data = Agenda::all();
        return Inertia::render('View/agenda/index', [
            'data' => $data
        ]);
    }
}
