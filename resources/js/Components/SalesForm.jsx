import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SalesForm({
    sale = null,
    clients,
    onSuccess,
}) {
    const isEdit = !!sale;

    const { data, setData, post, put, processing } = useForm({
        client_id: sale?.client_id || '',
        clothing_name: sale?.clothing_name || '',
        price: sale?.price || '',
        payment_method: sale?.payment_method || 'dinheiro',
        total_installments: sale?.total_installments || '',
        paid_installments: sale?.paid_installments || '',
    });

    function submit(e) {
        e.preventDefault();

        if (isEdit) {
            put(`/sales/${sale.id}`, {
                onSuccess,
            });
        } else {
            post('/sales', {
                onSuccess,
            });
        }
    }

    return (
        <form onSubmit={submit} className="space-y-4">
            <div>
                <Label>Cliente</Label>
                <select
                    className="w-full border p-2 rounded"
                    value={data.client_id}
                    onChange={e => setData('client_id', e.target.value)}
                >
                    <option value="">Selecione</option>
                    {clients.map(c => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <Label>Peça</Label>
                <Input
                    value={data.clothing_name}
                    onChange={e =>
                        setData('clothing_name', e.target.value)
                    }
                />
            </div>

            <div>
                <Label>Preço</Label>
                <Input
                    type="number"
                    value={data.price}
                    onChange={e =>
                        setData('price', e.target.value)
                    }
                />
            </div>

            <div>
                <Label>Forma de pagamento</Label>
                <select
                    className="w-full border p-2 rounded"
                    value={data.payment_method}
                    onChange={e =>
                        setData('payment_method', e.target.value)
                    }
                >
                    <option value="dinheiro">Dinheiro</option>
                    <option value="parcelado">Parcelado</option>
                </select>
            </div>
            {data.payment_method === 'parcelado' && (
                <>
                    <div>
                        <Label>N° de parcelas</Label>
                        <Input
                            type="number"
                            value={data.total_installments}
                            onChange={e =>
                                setData('total_installments', e.target.value)
                            }
                        />
                    </div>
                    <div>
                        <Label>Parcelas pagas</Label>
                        <Input
                            type="number"
                            value={data.paid_installments}
                            onChange={e =>
                                setData('paid_installments', e.target.value)
                            }
                        />
                    </div>
                </>
            )}
            
            <Button disabled={processing} className="w-full">
                {isEdit ? 'Atualizar Venda' : 'Criar Venda'}
            </Button>
        </form>
    )
}