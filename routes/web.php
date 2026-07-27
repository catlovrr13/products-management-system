<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReviewController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Route::resource('companies', CompanyController::class);
Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/companies', [CompanyController::class, 'index'])->name('companies.index');
    Route::get('/companies.json', [CompanyController::class, 'json'])->name('companies.json');
    Route::get('/companies/create', [CompanyController::class, 'create'])->name('companies.create');
    Route::get('/companies/{company}.json', [CompanyController::class, 'companyJSON'])->name('companies.companyJSON');
    Route::get('/companies/{company}', [CompanyController::class, 'show'])->name('companies.show');
    Route::post('/companies', [CompanyController::class, 'store'])->name('companies.store');
    Route::put('/companies/{company}', [CompanyController::class, 'update'])->name('companies.update');
    Route::get('/companies/{company}/edit', [CompanyController::class, 'edit'])->name('companies.edit');
    // Route::delete('/companies/{company}', [CompanyController::class, 'destroy'])->name('companies.destroy');

    Route::get('/products', [ProductController::class, 'index'])->name('products.index');
    Route::get('/products.json', [ProductController::class, 'json'])->name('products.json');
    Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
    Route::post('/products', [ProductController::class, 'store'])->name('products.store');

    Route::get('/products/validate', [ProductController::class, 'validate'])->name('products.validate');
    Route::post('/products/validate', [ProductController::class, 'find'])->name('products.find');
    Route::post('/products/{product}', [ProductController::class, 'update'])->name('products.update');
    Route::get('/products/{product}/edit', [ProductController::class, 'edit'])->name('products.edit');
    Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');
    Route::get("/products/{gtin}.json", [ProductController::class, 'productJSON'])->name('products.productJSON');
    Route::get('/products/{gtin}', [ProductController::class, 'show'])->name('products.show');

    Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
    Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
    Route::put('/categories/{category}', [CategoryController::class, 'update'])->name('categories.update');
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');
});

Route::middleware('auth')->group(function () {
    Route::patch('/users/{user}/avatar', [AuthController::class, 'updateAvatar'])->name('users.avatar.update');
    Route::delete('/users/{user}/avatar', [AuthController::class, 'removeAvatar'])->name('users.avatar.destroy');
});

Route::get('public/products/{gtin}', [ProductController::class, 'publicShow'])->name('products.publicShow');
Route::get('/public/products', [ProductController::class, 'publicIndex'])->name('products.publicIndex');

Route::post('/products/{product}/reviews', [ReviewController::class, 'store'])->middleware('auth')->name('reviews.store');


Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';