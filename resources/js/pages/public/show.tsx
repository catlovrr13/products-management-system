import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface Review {
    id: number;
    comment: string;
    rating: number;
    user: { name: string };
}

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
    reviews: Review[];
}

interface ShowProductProps {
    product: Product;
    avgRating: number;
    reviewCount: number;
}

export default function Product({ product, avgRating, reviewCount }: ShowProductProps) {
    const [lang, setLang] = useState<'en' | 'fr'>('en');
    const { auth } = usePage().props as any;
    const isLoggedIn = !!auth?.user;

    const { data, setData, post, reset, processing, errors } = useForm({ comment: '', rating: 5 });

    const submitReview = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/products/${product.id}/reviews`, { onSuccess: () => reset() });
    };

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

                <div className="border-t pt-4">
                    <h2 className="mb-2 font-semibold">{lang === 'en' ? 'Reviews' : 'Avis'}</h2>

                    <div className="mb-4 flex items-center gap-2">
                        <div className="flex gap-0.5 text-yellow-400">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <span key={s}>{s <= Math.round(avgRating) ? '★' : '☆'}</span>
                            ))}
                        </div>
                        <span className="text-muted-foreground text-sm">
                            {avgRating} ({reviewCount} {lang === 'en' ? 'ratings' : 'notes'})
                        </span>
                    </div>

                    {isLoggedIn && (
                        <form onSubmit={submitReview} className="mb-4 space-y-2">
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <button
                                        key={s}
                                        type="button"
                                        onClick={() => setData('rating', s)}
                                        className={`text-xl ${s <= data.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>
                            <textarea
                                value={data.comment}
                                onChange={(e) => setData('comment', e.target.value)}
                                maxLength={200}
                                rows={3}
                                placeholder={lang === 'en' ? 'Write a review (max 200 characters)' : 'Écrire un avis (200 caractères max)'}
                                className="w-full rounded border p-2 text-sm"
                            />
                            <p className="text-muted-foreground text-right text-xs">{data.comment.length}/200</p>
                            {errors.comment && <p className="text-sm text-red-500">{errors.comment}</p>}
                            <button disabled={processing} className="rounded bg-black px-4 py-2 text-sm text-white">
                                {lang === 'en' ? 'Submit review' : 'Envoyer'}
                            </button>
                        </form>
                    )}

                    <ul className="space-y-3">
                        {product.reviews.map((r) => (
                            <li key={r.id} className="text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="text-yellow-400">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <span key={s}>{s <= r.rating ? '★' : '☆'}</span>
                                        ))}
                                    </span>
                                    <span className="font-medium">{r.user.name}</span>
                                </div>
                                <p className="text-muted-foreground">{r.comment}</p>
                            </li>
                        ))}
                        {product.reviews.length === 0 && (
                            <p className="text-muted-foreground text-sm">{lang === 'en' ? 'No reviews yet.' : 'Aucun avis pour le moment.'}</p>
                        )}
                    </ul>
                </div>
            </div>
        </AppLayout>
    );
}