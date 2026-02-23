import AppLayout from "@/Layouts/AppLayout";

import {
    PieChart, Pie,
    LineChart, Line, XAxis, YAxis,
    Tooltip, ResponsiveContainer
} from 'recharts';

function Dashboard({ metrics, salesByMonth, topClients }) {
    const pieData = [
        { name: 'Paga', value: metrics.paidSales, fill: '#22c55e' },
        { name: 'Pendente', value: metrics.pendingSales, fill: '#facc15' },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

            {/* KPI Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8 md:text-center">
                <div className="bg-gray-800 text-white p-6 rounded shadow">
                    <h2>Receita Total</h2>
                    <p className="text-2xl font-bold">
                        R$ {Number(metrics.totalRevenue).toFixed(2)}
                    </p>
                </div>
                <div className="text-white p-6 rounded shadow bg-green-600">
                    <h2>Receita Recebida</h2>
                    <p className="text-2xl font-bold">
                        R$ {Number(metrics.paidRevenue).toFixed(2)}
                    </p>
                </div>
                <div className="text-white p-6 rounded shadow bg-yellow-500">
                    <h2 className="text-white">Receita Pendente</h2>
                    <p className="text-2xl font-bold text-white">
                        R$ {Number(metrics.pendingRevenue).toFixed(2)}
                    </p>
                </div>

                <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-gray-500">Receita do Mês</h2>
                    <p className="text-2xl font-bold">
                        R$ {Number(metrics.currentMonthRevenue).toFixed(2)}
                    </p>
                </div>

                {metrics.growth > 0 && (                    
                    <div className="bg-white p-6 rounded shadow">
                        <h2 className="text-gray-500">Crescimento Mensal</h2>
                        <p
                            className={`text-2xl font-bold ${metrics.growth >= 0
                                ? 'text-green-600'
                                : 'text-red-600'
                                }`}
                        >
                            {metrics.growth}%
                        </p>
                    </div>
                )}

                <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-gray-500">Ticket Médio</h2>
                    <p className="text-2xl font-bold">
                        R$ {Number(metrics.averageRevenue).toFixed(2)}
                    </p>
                </div>                
                <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-gray-500">Total de Vendas</h2>
                    <p className="text-2xl font-bold">{metrics.totalSales}</p>
                </div>
                <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-gray-500">Total de Clientes</h2>
                    <p className="text-2xl font-bold">{metrics.totalClients}</p>
                </div>
            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Pie */}
                <div className="bg-white p-6 rounded shadow">
                    <h2 className="mb-4 font-semibold">
                        Pago vs Pendente
                    </h2>

                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                outerRadius={80}
                                innerRadius={50}
                                paddingAngle={4}
                                label
                            />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Line */}
                <div className="bg-white p-6 rounded shadow">
                    <h2 className="mb-4 font-semibold">
                        Vendas por Mês
                    </h2>

                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={salesByMonth}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="#3b82f6"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Top 5 Clients */}
            <div className="bg-white p-6 rounded shadow mt-6">
                <h2 className="mb-4 font-semibold">
                    Top 5 Clientes (Receita)
                </h2>
                <ul className="space-y-2">
                    {topClients.map((client, index) => {
                        const medals = ["🥇", "🥈", "🥉"];
                        const isTopThree = index < 3;

                        return (
                            <li
                                key={client.id}
                                className={`flex justify-between border p-4 rounded ${isTopThree ? 'bg-green-50' : 'bg-gray-50'}`}
                            >
                                <div className="flex items-center gap-3">
                                    {isTopThree && (
                                        <span className="text-x1">{medals[index]}</span>
                                    )}
                                </div>
                                <span>{client.name}</span>
                                <span className="font-bold">
                                    R$ {Number(client.sales_sum_price || 0).toFixed(2)}
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

Dashboard.layout = page => <AppLayout>{page}</AppLayout>;

export default Dashboard;

