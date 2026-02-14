<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\Client;
use App\Services\SaleService;
use App\Http\Requests\StoreSaleRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SaleController extends Controller
{
    /**
     * Display a listing of the sales with optional filters for client, status, and clothing name.
     */
    public function index(Request $request)
    {
        $query = Sale::with('client');

        // Filters
        $query->when($request->client_id, fn ($q) =>
            $q->where('client_id', $request->client_id)
        );

        $query->when($request->status, fn ($q) =>
            $q->where('status', $request->status)
        );

        $query->when($request->clothing_name, fn ($q) =>
            $q->where('clothing_name', 'like', "%{$request->clothing_name}%")
        );

        return Inertia::render('Sales/Index', [
            'sales' => $query->latest()->paginate(10)->withQueryString(),
            'clients' => Client::orderBy('name')->get(),
            'filters' => $request->only(['client_id', 'status', 'clothing_name'])
        ]);
    }

    public function create()
    {
        return Inertia::render('Sales/Create', [
            'clients' => Client::orderBy('name')->get()
        ]);
    }

    public function store(StoreSaleRequest $request, SaleService $service)
    {
        $service->create($request->validated());

        return redirect()->route('sales.index')
            ->with('success', 'Venda criada com sucesso!');
    }
}
