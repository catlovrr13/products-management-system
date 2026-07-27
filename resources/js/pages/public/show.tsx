import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

interface Product {
    id: number;
    GTIN: string;
    name: string;
    name_fr: string;
    description: string;
    description_fr: string;
    brand_name: string;
    country_of_origin: string;
    gross_weight: string;
    net_content_weight: string;
    weight_unit: string;
    category: string;
    image: string;
    company?: {
        id: number;
        name: string;
    } | null;
}

interface ShowProductProps {
    product: Product;
}

export default function Product({ product }: ShowProductProps) {
    const [lang, setLang] = useState<'en' | 'fr'>('en');

    const imageSrc = product.image ? `/storage/products/${product.GTIN}/${product.image}` : '/storage/placeholder.jpg';

    return (
        <AppLayout>
        <div lang={lang} className="space-y-6 p-6">
            <Head title={lang === 'en' ? product.name : product.name_fr} />

            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-muted-foreground text-sm">{product.GTIN}</h1>
                    <p className="text-l font-semibold">{lang === 'en' ? product.name : product.name_fr}</p>
                    <p className="text-muted-foreground text-sm">{product.company?.name ?? 'Unknown company'}</p>
                </div>

                {/* language toggle, matches theme's border/rounded conventions */}
                <div className="flex w-fit gap-1 rounded-full border p-0.5 text-sm">
                    {(['en', 'fr'] as const).map((l) => (
                        <button
                            key={l}
                            type="button"
                            onClick={() => setLang(l)}
                            className={`rounded-full px-3 py-1 ${l === lang ? 'bg-black text-white' : 'text-muted-foreground'}`}
                        >
                            {l.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <img
                    src={imageSrc}
                    alt={lang === 'en' ? product.name : product.name_fr}
                    width={200}
                    height={200}
                    className="rounded-2xl border object-cover"
                />
            </div>

            <div className="m-3 flex flex-row flex-wrap gap-2">
                <div className="border-grey rounded-2xl border p-5">
                    <h1 className="text-sm font-semibold italic">Product Information</h1>
                    <p className="text-l font-semibold">{product.brand_name}</p>

                    <p className="text-muted-foreground text-sm">{lang === 'en' ? 'Description' : 'Description'}</p>
                    {/* Both language blocks stay in the DOM with correct lang attrs; only the active one shows */}
                    <p lang="en" hidden={lang !== 'en'} className="text-l font-semibold">
                        {product.description}
                    </p>
                    <p lang="fr" hidden={lang !== 'fr'} className="text-l font-semibold">
                        {product.description_fr}
                    </p>

                    <p className="text-muted-foreground text-sm">{lang === 'en' ? 'Gross Weight' : 'Poids brut'}</p>
                    <p className="text-l font-semibold">
                        {product.gross_weight} {product.weight_unit}
                    </p>

                    <p className="text-muted-foreground text-sm">{lang === 'en' ? 'Net Weight' : 'Poids net'}</p>
                    <p className="text-l font-semibold">
                        {product.net_content_weight} {product.weight_unit}
                    </p>

                    <p className="text-muted-foreground text-sm">{lang === 'en' ? 'Country of Origin' : "Pays d'origine"}</p>
                    <p className="text-l font-semibold">{product.country_of_origin}</p>

                    <p className="text-muted-foreground text-sm">{lang === 'en' ? 'Category' : 'Catégorie'}</p>
                    <p className="text-l font-semibold">{product.category}</p>
                </div>
            </div>
        </div>
        </AppLayout>
    );
}