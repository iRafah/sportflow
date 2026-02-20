import AppLayout from "@/Layouts/AppLayout";

import {
    PieChart, Pie,
    LineChart, Line, XAxis, YAxis,
    Tooltip, ResponsiveContainer
} from 'recharts';

function Dashboard({ metrics, salesByMonth }) {
    const pieData = [
        { name: 'Paga', value: metrics.paid, fill: '#22c55e' },
        { name: 'Pendente', value: metrics.pending, fill: '#facc15' },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

            {/* KPI Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">

                <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-gray-500">Total de Vendas</h2>
                    <p className="text-2xl font-bold">{metrics.totalSales}</p>
                </div>

                <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-gray-500">Total de Clientes</h2>
                    <p className="text-2xl font-bold">{metrics.totalClients}</p>
                </div>

                <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-gray-500">Pendentes</h2>
                    <p className="text-2xl font-bold text-yellow-600">
                        {metrics.pending}
                    </p>
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
                                dataKey="total"
                                stroke="#3b82f6"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

            </div>

        </div>
    );
}

Dashboard.layout = page => <AppLayout>{page}</AppLayout>;

export default Dashboard;

