import { Link, usePage } from '@inertiajs/react';

export default function NavLink({ href, children }) {
    const { url } = usePage();
    console.log('Current URL:', url);

    const isActive =
        href === '/'
            ? url === '/'
            : url.startsWith(href);

    return (
        <Link
            href={href}
            className={`block px-4 py-2 rounded transition ${isActive
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
        >
            {children}
        </Link>
    )
}