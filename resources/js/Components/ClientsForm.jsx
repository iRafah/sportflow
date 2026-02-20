import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ClientsForm({
    client,
    onSuccess,
}) {
    const isEdit = !!client;

    const { data, setData, post, put, processing } = useForm({
        name: client?.name || '',
        email: client?.email || '',
        phone: client?.phone || '',
    });

    function submit(e) {
        e.preventDefault();

        if (isEdit) {
            put(`/clients/${client.id}`, {
                onSuccess,
            });
        } else {
            post('/clients', {
                onSuccess,
            });
        }
    }

    return (
        <form onSubmit={submit} className="space-y-4">
            <div>
                <Label>Nome</Label>
                <Input
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                />
            </div>

            <div>
                <Label>Email</Label>
                <Input
                    type="email"
                    value={data.email}
                    onChange={e => setData('email', e.target.value)}
                />
            </div>

            <div>
                <Label>Telefone</Label>
                <Input
                    value={data.phone}
                    onChange={e => setData('phone', e.target.value)}
                />
            </div>
            
            <Button disabled={processing} className="w-full">
                {isEdit ? 'Atualizar Cliente' : 'Criar Cliente'}
            </Button>
        </form>
    )
}