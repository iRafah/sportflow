<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\Client;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Metrics
        $totalSales = Sale::count();
        $totalClients = Client::count();

        $paid = Sale::where('status', 'pago')->count();
        $pending = Sale::where('status', 'pendente')->count();

        // Sales by month
        $salesByMonth = Sale::selectRaw("
            to_char(created_at, 'YYYY-MM') as month,
            count(*) as total
        ")        
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        return Inertia::render('Dashboard/Index', [
            'metrics' => [
                'totalSales' => $totalSales,
                'totalClients' => $totalClients,
                'paid' => $paid,
                'pending' => $pending,
            ],
            'salesByMonth' => $salesByMonth,
        ]);
    }
}
