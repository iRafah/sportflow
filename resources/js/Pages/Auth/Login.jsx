import './login.style.css';
import { useForm } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post('/login');
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="w-full max-w-md bg-white p-8 rounded shadow">

                <h1 className="text-2xl font-bold mb-6 text-center brand-name">
                    SportFlow Login
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full border p-2 rounded"
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                        />
                        {errors.email && (
                            <div className="text-red-500 text-sm">
                                {errors.email}
                            </div>
                        )}
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Senha"
                            className="w-full border p-2 rounded"
                            value={data.password}
                            onChange={e => setData('password', e.target.value)}
                        />
                    </div>

                    <button
                        disabled={processing}
                        className="w-full bg-blue-600 text-white py-2 rounded"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}