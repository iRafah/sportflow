import { router, Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

import AppLayout from '@/Layouts/AppLayout';
// Components
import Pagination from '@/Components/Pagination';
import { Button } from '@/Components/ui/button';
import SalesForm from '@/Components/SalesForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/Components/ui/dialog';
import { toast } from 'sonner';

// Icons
import { TrashIcon, PencilIcon, CurrencyDollarIcon, CreditCardIcon } from '@heroicons/react/24/outline';

Index.layout = page => <AppLayout children={page} />;

export default function Index({ sales, clients, filters }) {
    const [open, setOpen] = useState(false);
    const [selectedSale, setSelectedSale] = useState(null);

    const [filterData, setFilterData] = useState(filters);
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }

        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    function applyFilters() {
        router.get('/sales', filterData, {
            preserveState: true,
            preserveScroll: true
        });
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Vendas</h1>


            <Button
                onClick={() => {
                    setSelectedSale(null);
                    setOpen(true)
                }}
                className="bg-green-600 hover:bg-green-700 text-white p-5">
                Nova venda
            </Button>

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
                <table className="w-full border text-align-left">
                    <thead className="bg-gray-100">
                        <tr className='text-left'>
                            <th className="p-2">Cliente</th>
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
                                        ? <CurrencyDollarIcon className="w-6 h-6 text-green-600" />
                                        : <CreditCardIcon className="w-6 h-6 text-yellow-600" />}
                                </td>
                                <td className="p-2 space-x-2 flex flex-direction-row">
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setSelectedSale(sale);
                                            setOpen(true);
                                        }}
                                    >
                                        <PencilIcon className="w-5 h-5" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            toast("Tem certeza que deseja excluir?", {
                                                description: "Essa ação não pode ser desfeita.",
                                                action: {
                                                    label: "Sim, excluir",
                                                    onClick: () => {
                                                        router.delete(`sales/${sale.id}`);
                                                    }
                                                }
                                            })
                                        }}
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Dialog para criação/edição de venda */}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {selectedSale ? 'Editar Venda' : 'Nova Venda'}
                            </DialogTitle>
                        </DialogHeader>

                        <SalesForm
                            sale={selectedSale}
                            clients={clients}
                            onSuccess={() => {
                                setOpen(false);
                            }}
                        />
                    </DialogContent>
                </Dialog>
            </div>
            <Pagination meta={sales} />
        </div>
    );
}