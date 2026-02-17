import { Link, usePage } from '@inertiajs/react';
import NavLink from '../Components/NavLink';

export default function AppLayout({ children }) {

    const { url } = usePage();

    const isActive = (path) => url.startsWith(path);

    return (
        <div className="min-h-screen flex bg-gray-100">

            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 text-white hidden md:flex flex-col">

                <div className="p-6 text-xl font-bold border-b border-gray-700">
                    ⚽ SportFlow
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <NavLink href="/">
                        Dashboard
                    </NavLink>
                    <NavLink href="/sales">
                        Vendas
                    </NavLink>
                    <NavLink href="/clients">
                        Clientes
                    </NavLink>

                </nav>

            </aside>

            {/* Content */}
            <div className="flex-1 flex flex-col">
                {/* Topbar (mobile + title area) */}
                <header className="bg-white shadow px-6 py-4 flex justify-between items-center">

                    <h1 className="text-lg font-semibold">
                        Sistema de Vendas
                    </h1>

                </header>

                <main className="p-6 flex-1">
                    {children}
                </main>

            </div>

        </div>
    );
}