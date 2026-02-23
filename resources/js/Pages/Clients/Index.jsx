import { router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import SmartPagination from '@/Components/Pagination';
import { Link } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';

import ClientsForm from '@/Components/ClientsForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/Components/ui/dialog';

import { toast } from 'sonner';

function Index({ clients, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const { flash } = usePage().props;
    const [open, setOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);

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

                <Button
                    onClick={() => {
                        setSelectedClient(null);
                        setOpen(true);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white p-5"
                >
                    Novo cliente
                </Button>
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
                                        <Button variant="outline" onClick={() => {
                                            setSelectedClient(client);
                                            setOpen(true);
                                        }}>
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
                 {/* Dialog para criação/edição de venda */}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {selectedClient ? 'Editar Cliente' : 'Novo Cliente'}
                            </DialogTitle>
                        </DialogHeader>

                        <ClientsForm
                            client={selectedClient}                            
                            onSuccess={() => {
                                setOpen(false);
                            }}
                        />
                    </DialogContent>
                </Dialog>
            </div>

            <SmartPagination meta={clients} />
        </div>
    );
}

Index.layout = page => <AppLayout>{page}</AppLayout>

export default Index;