<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SaleController;
use Inertia\Inertia;

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->name('dashboard');

Route::get('/', [SaleController::class, 'index'])
    ->name('home');

Route::resource('sales', SaleController::class);
