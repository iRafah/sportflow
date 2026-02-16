import { router } from '@inertiajs/react';
import { useState } from 'react';
import Pagination from '../../Components/Pagination';

export default function Index({ sales, clients, filters }) {
    console.log(sales);
    const [filterData, setFilterData] = useState(filters);

    function applyFilters() {
        router.get('/sales', filterData, { preserveState: true });
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Vendas</h1>

            <a
                href="/sales/create"
                className="bg-blue-600 text-white px-4 py-2 rounded inline-block mb-6"
            >
                + Nova Venda
            </a>

            {/* Filters */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">

                <select
                    className="border p-2 rounded"
                    value={filterData.client_id || ''}
                    onChange={e =>
                        setFilterData({ ...filterData, client_id: e.target.value })
                    }
                >
                    <option value="">Cliente</option>
                    {clients.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>

                <select
                    className="border p-2 rounded"
                    value={filterData.status || ''}
                    onChange={e =>
                        setFilterData({ ...filterData, status: e.target.value })
                    }
                >
                    <option value="">Status</option>
                    <option value="pago">Pago</option>
                    <option value="pendente">Pendente</option>
                </select>

                <button
                    onClick={applyFilters}
                    className="bg-gray-800 text-white rounded px-4"
                >
                    Filtrar
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2">Cliente</th>
                            <th className="p-2">Peça</th>
                            <th className="p-2">Preço</th>
                            <th className="p-2">Parcelas</th>
                            <th className="p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.data.map(sale => (
                            <tr key={sale.id} className="border-t">
                                <td className="p-2">{sale.client.name}</td>
                                <td className="p-2">{sale.clothing_name}</td>
                                <td className="p-2">R$ {sale.price}</td>
                                <td className="p-2">
                                    {sale.paid_installments} / {sale.total_installments}
                                </td>
                                <td className="p-2">
                                    {sale.status === 'pago'
                                        ? '🟢 Pago'
                                        : '🟡 Pendente'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
            </div>
            <Pagination meta={sales} />
        </div>
    );
}