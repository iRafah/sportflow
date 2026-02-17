import { Link, usePage } from '@inertiajs/react';

export default function NavLink({ href, icon: Icon, children }) {
    const { url } = usePage();

    const isActive =
        href === '/'
            ? url === '/'
            : url.startsWith(href);

    return (
        <Link
            href={href}
            className={`flex gap-2 px-4 py-2 rounded transition ${isActive
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
        >
            {Icon && <Icon className="w-5 h-5" />}
            <span>{children}</span>
        </Link>
    )
}