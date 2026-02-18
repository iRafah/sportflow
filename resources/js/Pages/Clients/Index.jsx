import { router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import SmartPagination from '@/Components/Pagination';
import FlashMessage from '@/Components/FlashMessage';

function Index({ clients, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    function applyFilter() {
        router.get('/clients', { search }, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    }

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

            <FlashMessage />

            {/* Search */}
            <div className="flex gap-2 mb-6">
                <input
                    type="text"
                    placeholder="Buscar cliente..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="border p-2 rounded w-full max-w-sm"
                />

                <button
                    onClick={applyFilter}
                    className="bg-gray-800 text-white px-4 rounded"
                >
                    Buscar
                </button>

                <a
                    href="/clients/create"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    + Novo Cliente
                </a>
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

                                        <a
                                            href={`/clients/${client.id}/edit`}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            Editar
                                        </a>

                                        <button
                                            onClick={() => {
                                                if (confirm('Excluir cliente?')) {
                                                    router.delete(`/clients/${client.id}`);
                                                }
                                            }}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            Excluir
                                        </button>

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