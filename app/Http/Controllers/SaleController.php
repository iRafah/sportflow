<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\Client;
use App\Services\SaleService;
use App\Http\Requests\StoreSaleRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\UpdateSaleRequest;

class SaleController extends Controller
{
    /**
     * Display a listing of the sales with optional filters for client, status, and clothing name.
     */
    public function index(Request $request)
    {
        $query = Sale::with('client');

        // Filters
        $query->when(
            $request->client_id,
            fn($q) =>
            $q->where('client_id', $request->client_id)
        );

        $query->when(
            $request->status,
            fn($q) =>
            $q->where('status', $request->status)
        );

        $query->when(
            $request->clothing_name,
            fn($q) =>
            $q->where('clothing_name', 'like', "%{$request->clothing_name}%")
        );

        return Inertia::render('Sales/Index', [
            'sales' => $query->latest()->paginate(10)->withQueryString(),
            'clients' => Client::orderBy('name')->get(),
            'filters' => $request->only(['client_id', 'status', 'clothing_name'])
        ]);
    }

    /**
     * Show the form for creating a new sale.
     */
    public function create()
    {
        return Inertia::render('Sales/Create', [
            'clients' => Client::orderBy('name')->get()
        ]);
    }

    /**
     * Store a newly created sale in storage.
     */
    public function store(StoreSaleRequest $request, SaleService $service)
    {
        $service->create($request->validated());

        return redirect()
            ->route('sales.index')
            ->with('success', 'Venda criada com sucesso!');
    }

    /**
     * Show the form for editing the specified sale.
     */
    public function edit(Sale $sale)
    {
        return Inertia::render('Sales/Edit', [
            'sale' => $sale->load('client'),
            'clients' => Client::orderBy('name')->get()
        ]);
    }

    public function update(UpdateSaleRequest $request, Sale $sale, SaleService $service)
    {
        $service->update($sale, $request->validated());

        return redirect()
            ->route('sales.index')
            ->with('success', 'Venda atualizada com sucesso!');
    }

    public function destroy(Sale $sale)
    {
        $sale->delete();

        return redirect()
            ->route('sales.index')
            ->with('success', 'Venda removida.');
    }
}
