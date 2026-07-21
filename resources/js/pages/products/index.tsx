import AppLayout from '@/layouts/app-layout';
import { Link } from '@inertiajs/react';

interface Product {
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
    return (
        <AppLayout>
            <Link href='/products/create' className="mt-2 flex items-center justify-end font-bold">
              Create a product
            </Link>
            <div className="flex max-w-screen flex-row flex-wrap m-5">
                {products.map((product) => (
                    <div key={product.GTIN} className="border-grey m-2 flex flex-col rounded-2xl border p-5 w-125">
                        <h1 className="text-sm font-extralight italic">GTIN:</h1>
                        <p className="text-l ml-8 font-serif font-semibold">{product.GTIN}</p>                        
                        <h1 className="text-sm font-extralight italic">Product Name:</h1>
                        <p className="text-l ml-8 font-serif font-semibold">{product.name}</p>
                        <h1 className="text-sm font-extralight italic">Description:</h1>
                        <p className="text-l ml-8 font-serif">{product.description}</p>
                        <h1 className="text-sm font-extralight italic">Description in french:</h1>
                        <p className="text-l ml-8 font-serif">{product.description_fr}</p>
                    </div>
                ))}
            </div>
        </AppLayout>
    );
}
