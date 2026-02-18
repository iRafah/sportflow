import { useForm } from '@inertiajs/react'
import AppLayout from '@/Layouts/AppLayout';
import SearchableSelect from '@/Components/SearchableSelect';

Create.layout = page => <AppLayout children={page} />;

export default function Create({ clients }) {
    const { data, setData, post, processing, errors } = useForm({
        client_id: '',
        clothing_name: '',
        price: '',
        payment_method: 'dinheiro',
        total_installments: 1,
        paid_installments: 0,
    });

    function submit(e) {
        e.preventDefault();
        post('/sales');
    }

    return (
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Nova Venda</h1>

            <form onSubmit={submit} className="space-y-4">
                <SearchableSelect
                    options={clients}
                    value={data.client_id}
                    onChange={(id) => setData('client_id', id)}
                    placeholder="Buscar cliente..."
                    createUrl="/clients/create"
                />

                <input
                    className="w-full border p-2 rounded"
                    placeholder="Nome da Peça"
                    value={data.clothing_name}
                    onChange={e => setData('clothing_name', e.target.value)}
                />

                <input
                    type="number"
                    className="w-full border p-2 rounded"
                    placeholder="Preço"
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
                        <p className=''>N° de parcelas</p>
                        <input
                            type="number"
                            className="w-full border p-2 rounded"
                            placeholder="Número de Parcelas"
                            value={data.total_installments}
                            onChange={e =>
                                setData('total_installments', e.target.value)
                            }
                        />
                        <p>Parcelas pagas</p>
                        <input
                            type="number"
                            className="w-full border p-2 rounded"
                            placeholder="Parcelas Pagas"
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
                    Salvar
                </button>

            </form>
        </div>
    );
}
