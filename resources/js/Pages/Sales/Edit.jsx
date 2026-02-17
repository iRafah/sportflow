import { useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

Edit.layout = page => <AppLayout children={page} />;

export default function Edit({ sale, clients }) {

    const { data, setData, put, processing } = useForm({
        client_id: sale.client_id,
        clothing_name: sale.clothing_name,
        price: sale.price,
        payment_method: sale.payment_method,
        total_installments: sale.total_installments,
        paid_installments: sale.paid_installments,
    });

    function submit(e) {
        e.preventDefault();
        put(`/sales/${sale.id}`);
    }

    return (
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Editar Venda</h1>

            <form onSubmit={submit} className="space-y-4">
                <select
                    className="w-full border p-2 rounded"
                    value={data.client_id}
                    onChange={e => setData('client_id', e.target.value)}
                >
                    {clients.map(c => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                </select>

                <input
                    className="w-full border p-2 rounded"
                    value={data.clothing_name}
                    onChange={e => setData('clothing_name', e.target.value)}
                />

                <input
                    type="number"
                    className="w-full border p-2 rounded"
                    value={data.price}
                    onChange={e => setData('price', e.target.value)}
                />

                <select
                    className="w-full border p-2 rounded"
                    value={data.payment_method}
                    onChange={e => setData('payment_method', e.target.value)}
                >
                    <option value="dinheiro">Dinheiro</option>
                    <option value="parcelado">Parcelado</option>
                </select>

                {data.payment_method === 'parcelado' && (
                    <>
                        <input
                            type="number"
                            className="w-full border p-2 rounded"
                            value={data.total_installments}
                            onChange={e =>
                                setData('total_installments', e.target.value)
                            }
                        />

                        <input
                            type="number"
                            className="w-full border p-2 rounded"
                            value={data.paid_installments}
                            onChange={e =>
                                setData('paid_installments', e.target.value)
                            }
                        />
                    </>
                )}

                <button
                    disabled={processing}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Atualizar
                </button>

            </form>
        </div>
    );
}
