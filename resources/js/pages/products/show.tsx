import AppLayout from '@/layouts/app-layout';
import { Link } from '@inertiajs/react';

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
}

interface ShowProductProps {
    product: Product;
}

export default function ShowProduct({ product }: ShowProductProps) {
    return (
        <AppLayout>
            <div className="space-y-6 p-6 flex flex-col" key={product.GTIN}>
                <div className='flex flex-col gap-3'>
                <div>
                    {product?.image ? (
                        <img src={`/storage/products/${product.GTIN}/${product.image}`} width={100} height={100} />
                    ) : (
                        <img src="/storage/placeholder.jpg" width={100} height={100} />
                    )}
                </div>
                <div>
                    <Link href={`/products/${product.id}/edit`} className="rounded-lg border px-3 py-1 text-sm">
                        Edit Image
                    </Link>
                </div>
                </div>
                <div>
                    <h1 className="text-muted-foreground text-sm">{product.GTIN}</h1>
                    <p className="text-l font-semibold">{product.name}</p>
                    <p className="text-muted-foreground text-sm">{product.name_fr}</p>
                </div>

                <div className="m-3 flex flex-row flex-wrap gap-2">
                    <div className="border-grey rounded-2xl border p-5">
                        <h1 className="text-sm font-semibold italic">Product Information</h1>
                        <p className="text-l font-semibold">{product.brand_name}</p>
                        <p className="text-muted-foreground text-sm">Product Description</p>
                        <p className="text-l font-semibold">{product.description}</p>
                        <p className="text-muted-foreground text-sm">Description in Frech</p>
                        <p className="text-l font-semibold">{product.description_fr}</p>
                        <p className="text-muted-foreground text-sm">Gross Weight</p>
                        <p className="text-l font-semibold">{product.gross_weight}</p>
                        <p className="text-muted-foreground text-sm">Weight Unit</p>
                        <p className="text-l font-semibold">{product.weight_unit}</p>
                        <p className="text-muted-foreground text-sm">Country of Origin</p>
                        <p className="text-l font-semibold">{product.country_of_origin}</p>
                        <p className="text-muted-foreground text-sm">Category</p>
                        <p className="text-l font-semibold">{product.category}</p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
