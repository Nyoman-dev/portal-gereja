<?php

use Inertia\Inertia;
use App\Models\Laporan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StafController;
use App\Http\Controllers\AgendaController;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\ProfilController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RenunganController;
use App\Http\Controllers\View\ViewController;
use App\Http\Controllers\LaporanKeuanganController;

Route::get('/', [ViewController::class, 'home'])->name('home');
Route::get('/berita', [ViewController::class, 'berita'])->name('berita');
Route::get('/detail', [ViewController::class, 'detail'])->name('detail');
Route::get('/profil', [ViewController::class, 'profil'])->name('profil');
Route::get('/staf', [ViewController::class, 'staf'])->name('staf');
Route::get('/agenda', [ViewController::class, 'agenda'])->name('agenda');

Route::get('/dashboard', function () {
    $laporans = Laporan::select(
        'tanggal',
        DB::raw('SUM(COALESCE(masuk,0)) as total_masuk'),
        DB::raw('SUM(COALESCE(keluar,0)) as total_keluar')
    )
        ->groupBy('tanggal')
        ->orderBy('tanggal', 'asc')
        ->get();

    return Inertia::render('Dashboard', [
        'laporans' => $laporans
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::resource('/dashboard/profil', ProfilController::class)->middleware('auth');
Route::resource('/dashboard/berita', BeritaController::class)->middleware('auth');
Route::resource('/dashboard/staf', StafController::class)->middleware('auth');
Route::resource('/dashboard/agenda', AgendaController::class)->middleware('auth');
Route::post('/dashboard/agenda/send', [AgendaController::class, 'sendWatsapp'])->middleware('auth');
Route::resource('/dashboard/renungan', RenunganController::class)->middleware('auth');
Route::resource('/dashboard/laporan-keuangan', LaporanKeuanganController::class)->middleware('auth');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
