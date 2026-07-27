import AppLayout from '@/layouts/app-layout';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

type Product = {
    GTIN: string;
    name: string;
    name_fr: string;
    image: string | null;
    company: { id: number; name: string };
    category: { id: number; name: string };
};

export default function ProductList({
    products = [],
    companies = [],
    categories = [],
}: {
    products?: Product[];
    companies?: { id: number; name: string }[];
    categories?: string[];
}) {
    const params = new URLSearchParams(window.location.search);
    const [companyId, setCompanyId] = useState(params.get('company_id') ?? '');
    const [categoryId, setCategoryId] = useState(params.get('category_id') ?? '');

    const applyFilters = (nextCompany = companyId, nextCategory = categoryId) => {
        router.get(
            'public/products',
            { company_id: nextCompany || undefined, category_id: nextCategory || undefined },
            { preserveState: true, replace: true },
        );
    };

    return (
        <AppLayout>
        <div className="mx-auto max-w-4xl px-4 py-6">
            <h1 className="mb-4 text-xl font-bold">Products</h1>

            <div className="mb-6 flex flex-wrap gap-3">
                <select
                    value={companyId}
                    onChange={(e) => {
                        setCompanyId(e.target.value);
                        applyFilters(e.target.value, categoryId);
                    }}
                    className="rounded border px-3 py-2 text-sm"
                >
                    <option value="">All companies</option>
                    {companies.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                </select>

                <select
                    value={categoryId}
                    onChange={(e) => {
                        setCategoryId(e.target.value);
                        applyFilters(companyId, e.target.value);
                    }}
                    className="rounded border px-3 py-2 text-sm"
                >
                    <option value="">All categories</option>
                    {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                </select>

                {(companyId || categoryId) && (
                    <button
                        onClick={() => {
                            setCompanyId('');
                            setCategoryId('');
                            router.get('/XX_module_b/products-public');
                        }}
                        className="text-sm text-gray-500 underline"
                    >
                        Clear filters
                    </button>
                )}
            </div>

            {products.length === 0 && <p className="text-gray-500">No products found.</p>}

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {products.map((p) => (
                    <Link key={p.GTIN} href={`/public/products/${p.GTIN}`} className="overflow-hidden rounded-lg border transition hover:shadow">
                        <img src={p.image ? `/storage/products/${p.image}` : '/storage/placeholder.jpg'} className="h-32 w-full object-cover" />
                        <div className="p-2">
                            <p className="truncate text-sm font-medium">{p.name}</p>
                            {/* <p className="truncate text-xs text-gray-500">{p.company.name}</p> */}
                            {/* <span className="mt-1 inline-block rounded-full bg-gray-100 px-2 py-0.5 text-[10px]">{p.category.name}</span> */}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
        </AppLayout>
    );
}
