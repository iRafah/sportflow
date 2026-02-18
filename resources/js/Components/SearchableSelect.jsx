import { useState } from "react";

export default function SearchableSelect({
    options,
    value,
    onChange,
    placeholder,
    createUrl
}) {
    const [search, setSearch] = useState('');

    const filtered = options.filter(option =>
        option.name.toLowerCase().includes(search.toLocaleLowerCase())
    );

    return (
        <div className="space-y-2">
            <input
                type="text"
                placeholder={placeholder}
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full border p-2 rounded"
            />

            <div className="border rounded max-h-40 overflow-y-auto">
                {filtered.length > 0 ? (
                    filtered.map(option => (
                        <div
                            key={option.id}
                            onClick={() => onChange(option.id)}
                            className={`p-2 cursor-pointer hover:bg-gray-100 ${value === option.id && 'bg-gray-200'}`}
                        >
                            {option.name}
                        </div>
                    ))
                ) : (
                    <div className="p-2 text-sm text-gray-500">
                        Cliente não encontrado.
                        <a
                            href={createUrl}
                            className="text-blue-600 ml-2 underline"
                        >
                            Criar novo cliente
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}