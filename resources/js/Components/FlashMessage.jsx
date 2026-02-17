import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function FlashMessage() {
    const { flash } = usePage().props;

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (flash?.success) {
            setVisible(true);

            const timer = setTimeout(() => {
                setVisible(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [flash?.success]);

    if (!flash?.success || !visible) return null;

    return (
        <div
            className="mb-4 p-4 rounded border border-green-300 bg-green-100 text-green-800
                               flex items-center justify-between
                               transition-opacity duration-500 fixed bottom-5 right-5"
        >
            <span>{flash.success}</span>

            <button
                onClick={() => setVisible(false)}
                className="text-green-700 hover:text-green-900 transition"
            >
                <XMarkIcon className="w-5 h-5" />
            </button>
        </div>
    );
}