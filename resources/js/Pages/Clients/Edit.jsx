import { useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

function Edit({ client }) {

    const { data, setData, put, processing, errors } = useForm({
        name: client.name || '',
        email: client.email || '',
        phone: client.phone || '',
    });

    function submit(e) {
        e.preventDefault();
        put(`/clients/${client.id}`);
    }

    return (
        <div className="max-w-xl">
            <h1 className="text-2xl font-bold mb-6">Editar Cliente</h1>

            <form onSubmit={submit} className="space-y-4 bg-white p-6 rounded shadow">

                <div>
                    <label className="block mb-1">Nome</label>
                    <input
                        className="w-full border p-2 rounded"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                    />
                    {errors.name && (
                        <div className="text-red-500 text-sm">
                            {errors.name}
                        </div>
                    )}
                </div>

                <div>
                    <label className="block mb-1">Email</label>
                    <input
                        type="email"
                        className="w-full border p-2 rounded"
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                    />
                </div>

                <div>
                    <label className="block mb-1">Telefone</label>
                    <input
                        className="w-full border p-2 rounded"
                        value={data.phone}
                        onChange={e => setData('phone', e.target.value)}
                    />
                </div>

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

Edit.layout = page => <AppLayout>{page}</AppLayout>;

export default Edit;
