<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\Client;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $now = Carbon::now();

        $currentMonthRevenue = Sale::whereMonth('created_at', $now->month)
            ->whereYear('created_at', $now->year)
            ->sum('price');

        $previousMonth = $now->copy()->subMonth();
        $previousMonthRevenue = Sale::whereMonth('created_at', $previousMonth->month)
            ->whereYear('created_at', $previousMonth->year)
            ->sum('price');

        $growth = $previousMonthRevenue > 0
            ? (($currentMonthRevenue - $previousMonthRevenue) / $previousMonthRevenue * 100)
            : 0;

        $averageRevenue = Sale::avg('price');

        $topClients = Client::whereHas('sales')
            ->withSum('sales', 'price')
            ->orderBy('sales_sum_price', 'desc')
            ->take(5)
            ->get();

        // Metrics
        $totalSales = Sale::count();
        $totalClients = Client::count();

        $paid = Sale::where('status', 'pago')->count();
        $pending = Sale::where('status', 'pendente')->count();

        $totalRevenue = Sale::sum('price');
        $paidRevenue = Sale::selectRaw('SUM(price * paid_installments / NULLIF(total_installments, 0)) as total')
            ->first()->total ?? 0;
        $pendingRevenue = Sale::selectRaw('SUM(price - price * paid_installments / NULLIF(total_installments, 0)) as total')
            ->first()->total ?? 0;

        // Sales by month
        $salesByMonth = Sale::selectRaw("
            to_char(created_at, 'YYYY-MM') as month,
            count(*) as total,
            sum(price) as revenue
        ")
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        return Inertia::render('Dashboard/Index', [
            'metrics' => [
                'currentMonthRevenue' => $currentMonthRevenue,
                // 'previousMonthRevenue' => $previousMonthRevenue,
                'growth' => $growth,
                'averageRevenue' => $averageRevenue,
                'totalSales' => $totalSales,
                'totalClients' => $totalClients,
                'paidSales' => $paid,
                'pendingSales' => $pending,
                'totalRevenue' => $totalRevenue,
                'paidRevenue' => $paidRevenue,
                'pendingRevenue' => $pendingRevenue,
            ],
            'salesByMonth' => $salesByMonth,
            'topClients' => $topClients,
        ]);
    }
}
