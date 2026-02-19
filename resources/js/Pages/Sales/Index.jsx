import { router, Link } from '@inertiajs/react';
import { useState } from 'react';

import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import FlashMessage from '@/Components/FlashMessage';
import Pagination from '@/Components/Pagination';
import { Button } from '@/Components/ui/button';
import AppLayout from '@/Layouts/AppLayout';

Index.layout = page => <AppLayout children={page} />;

export default function Index({ sales, clients, filters }) {
    const [filterData, setFilterData] = useState(filters);

    function applyFilters() {
        router.get('/sales', filterData, { 
            preserveState: true, 
            preserveScroll: true 
        });
    }

    return (
        <div className="p-6">
            <FlashMessage />

            <h1 className="text-2xl font-bold mb-6">Vendas</h1>
            
            <Link href="/sales/create" className="m-0">
                <Button className="bg-green-600 hover:bg-green-700 text-white p-5">
                    Nova venda
                </Button>
            </Link>

            {/* Filters */}
            <div className="grid md:grid-cols-3 gap-4 my-6">

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

                 <Button 
                    onClick={applyFilters}
                    className="bg-gray-800 text-white p-5"
                >
                    Filtrar
                </Button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full border">
                    <thead className="bg-gray-100 text-align-left">
                        <tr>
                            <th className="p-2  text-align-left">Cliente</th>
                            <th className="p-2">Peça</th>
                            <th className="p-2">Preço</th>
                            <th className="p-2">Parcelas</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Ações</th>
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
                                        ? '✔ Pago'
                                        : '⏳ Pendente'}
                                </td>
                                <td className="p-2 space-x-2 flex flex-direction-row">
                                    <a
                                        href={`/sales/${sale.id}/edit`}
                                        className="text-blue-600"
                                    >
                                        <PencilIcon className="w-5 h-5" />
                                    </a>

                                    <button
                                        onClick={() => {
                                            if (confirm('Tem certeza que deseja excluir?')) {
                                                router.delete(`sales/${sale.id}`);
                                            }
                                        }}
                                        className="text-red-600"
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
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