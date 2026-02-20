import { router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import SmartPagination from '@/Components/Pagination';
import { Link } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';

import { toast } from 'sonner';

function Index({ clients, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const { flash } = usePage().props;

    function applyFilter() {
        router.get('/clients', { search }, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    }

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }

        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    // Filter clients when search changes.
    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get('/clients', { search }, {
                preserveState: true,
                preserveScroll: true,
                replace: true
            });
        }, 500);

        return () => clearTimeout(timeout);
    }, [search]);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Clientes</h1>


            {/* Search */}
            <div className="flex gap-2 mb-6">
                <input
                    type="text"
                    placeholder="Buscar cliente..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="border p-2 rounded w-full max-w-sm"
                />
                <Button
                    onClick={applyFilter}
                    className="bg-gray-800 text-white p-5"
                >
                    Buscar
                </Button>

                <Link href="/clients/create">
                    <Button className="bg-green-600 hover:bg-green-700 text-white p-5">
                        Novo cliente
                    </Button>
                </Link>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white rounded shadow">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">Nome</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-left">Telefone</th>
                            <th className="p-3 text-right">Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {clients.data.map(client => (
                            <tr key={client.id} className="border-t">
                                <td className="p-3">{client.name}</td>
                                <td className="p-3">{client.email}</td>
                                <td className="p-3">{client.phone}</td>

                                <td className="p-3 text-right">
                                    <div className="flex justify-end gap-4">
                                        <Link href={`/clients/${client.id}/edit`} className="m-0">
                                            <Button variant="outline">
                                                <PencilIcon className="w-5 h-5" />
                                            </Button>
                                        </Link>

                                        <Button
                                            variant="outline"
                                            onClick={() => {
                                                toast("Tem certeza que deseja excluir?", {
                                                    description: "Essa ação não pode ser desfeita.",
                                                    action: {
                                                        label: "Sim, excluir",
                                                        onClick: () => {
                                                            router.delete(`/clients/${client.id}`);
                                                        }
                                                    }
                                                })
                                            }}
                                        >
                                            <TrashIcon className="w-5 h-5" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <SmartPagination meta={clients} />
        </div>
    );
}

Index.layout = page => <AppLayout>{page}</AppLayout>

export default Index;