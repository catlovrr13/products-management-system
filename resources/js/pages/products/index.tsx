import AppLayout from '@/layouts/app-layout';
import { Link, router } from '@inertiajs/react';

interface Product {
    id: number;
    GTIN: string;
    name: string;
    description: string;
    description_fr: string;
    name_fr: string;
    brand_name: string;
    country_of_origin: string;
    gross_weight: string;
    net_content_weight: string;
    weight_unit: string;
    category: string;
}
interface ProductsPageProps {
    products: Product[];
}

export default function Products({ products }: ProductsPageProps) {

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(`/products/${id}`);
        }
    }

    return (
        <AppLayout>
            <Link href="/products/create" className="mt-2 flex items-center justify-end font-bold">
                Create a product
            </Link>
            <div className="m-5 flex max-w-screen flex-row flex-wrap">
                {products.map((product) => (
                    <div key={product.GTIN} className="border-grey m-2 flex w-125 flex-col rounded-2xl border p-5">
                        <h1 className="text-sm font-extralight italic">GTIN:</h1>
                        <Link href={route('products.show', product.GTIN)}>
                            <p className="text-l ml-8 font-serif font-semibold text-blue-600">{product.GTIN}</p>
                        </Link>
                        <h1 className="text-sm font-extralight italic">Product Name:</h1>
                        <p className="text-l ml-8 font-serif font-semibold">{product.name}</p>
                        <h1 className="text-sm font-extralight italic">Description:</h1>
                        <p className="text-l ml-8 font-serif">{product.description}</p>
                        <h1 className="text-sm font-extralight italic">Description in french:</h1>
                        <p className="text-l ml-8 font-serif">{product.description_fr}</p>

                        <div className="mt-3 flex gap-2">
                            <button onClick={() => handleDelete(product.id)} className="rounded-lg border px-3 py-1 text-sm text-red-600">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </AppLayout>
    );
}
