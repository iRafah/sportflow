import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { HomeIcon, ShoppingBagIcon, UserGroupIcon, PowerIcon } from '@heroicons/react/24/outline';
import NavLink from '@/Components/NavLink';
import { router } from '@inertiajs/react';
import { Toaster } from '@/Components/ui/sonner';
 
export default function AppLayout({ children }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="min-h-screen flex bg-gray-100">

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-white transform 
                ${open ? 'translate-x-0' : '-translate-x-full'} 
                transition-transform duration-200 ease-in-out
                md:relative md:translate-x-0`}
            >
                <div className="p-6 text-xl font-bold border-b border-gray-700 flex justify-between items-center">
                    <img src="/images/sportflow-brand.png" alt="Logo" />

                    {/* Close button mobile */}
                    <button
                        className="md:hidden"
                        onClick={() => setOpen(false)}
                    >
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                <nav className="p-4 space-y-2">
                    <NavLink href="/" icon={HomeIcon}>
                        Dashboard
                    </NavLink>
                    <NavLink href="/sales" icon={ShoppingBagIcon}>
                        Vendas
                    </NavLink>
                    <NavLink href="/clients" icon={UserGroupIcon}>
                        Clientes
                    </NavLink>

                    <div className="mt-auto p-4 border-t border-gray-700">
                        <button
                            onClick={() => router.post('/logout')}
                            className="flex items-center gap-2 text-red-400 hover:text-red-600 transition"
                        >
                            <PowerIcon className="w-5 h-5" />
                            Sair                            
                        </button>
                    </div>
                </nav>
            </aside>

            {/* Content */}
            <div className="flex-1 flex flex-col">
                {/* Topbar */}
                <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
                    {/* Mobile menu button */}
                    <button
                        className="md:hidden"
                        onClick={() => setOpen(true)}
                    >
                        <Bars3Icon className="w-6 h-6" />
                    </button>

                    <h1 className="text-lg font-semibold">
                        Sistema de Vendas
                    </h1>

                </header>

                <main className="p-6 flex-1">
                    {children}
                </main>
                
                <Toaster 
                    richColors 
                    position="bottom-right"
                    expand={true}                    
                />
            </div>           
        </div>
    );
}
