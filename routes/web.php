<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StafController;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\ProfilController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\View\ViewController;

Route::get('/', [ViewController::class, 'home'])->name('home');
Route::get('/berita', [ViewController::class, 'berita'])->name('berita');
Route::get('/detail', [ViewController::class, 'detail'])->name('detail');
Route::get('/profil', [ViewController::class, 'profil'])->name('profil');
Route::get('/staf', [ViewController::class, 'staf'])->name('staf');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::resource('/dashboard/profil', ProfilController::class)->middleware('auth');
Route::resource('/dashboard/berita', BeritaController::class)->middleware('auth');
Route::resource('/dashboard/staf', StafController::class)->middleware('auth');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
