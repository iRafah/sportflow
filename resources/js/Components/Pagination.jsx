import { router } from '@inertiajs/react';

export default function Pagination({ meta }) {
    if (!meta) return null;

    const { current_page, last_page } = meta;

    if (!current_page || last_page <= 1) return null;

    if (last_page <= 1) return null;

    const goToPage = (page) => {
        router.get(
            window.location.pathname,
            { page },
            { preserveState: true, preserveScroll: true }
        );
    };

    const generatePages = () => {
        const pages = [];

        const delta = 2;
        const left = current_page - delta;
        const right = current_page + delta;

        for (let i = 1; i <= last_page; i++) {
            if (
                i === 1 ||
                i === last_page ||
                (i >= left && i <= right)
            ) {
                pages.push(i);
            }
        }

        return pages;
    };

    const pages = generatePages();

    const renderPages = () => {
        const items = [];
        let previous = null;
        
        pages.forEach((page) => {
            if (previous && page - previous > 1) {
                items.push(
                    <span key={`ellipsis-${page}`} className="px-2">
                        ...
                    </span>
                );
            }

            items.push(
                <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`px-3 py-1 border rounded ${
                        page === current_page
                            ? 'bg-blue-600 text-white'
                            : 'bg-white'
                    }`}
                >
                    {page}
                </button>
            );

            previous = page;
        });

        return items;
    };

    return (
        <div className="flex items-center gap-2 mt-6 flex-wrap">

            {/* Previous */}
            <button
                disabled={current_page === 1}
                onClick={() => goToPage(current_page - 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
            >
                ←
            </button>

            {renderPages()}

            {/* Next */}
            <button
                disabled={current_page === last_page}
                onClick={() => goToPage(current_page + 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
            >
                →
            </button>

        </div>
    );
}