import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { FileUploader } from 'react-drag-drop-files';

type ProductForm = {
    GTIN: string;
    // name: string;
    // description: string;
    // description_fr: string;
    // name_fr: string;
    // brand_name: string;
    // country_of_origin: string;
    // gross_weight: string;
    // net_content_weight: string;
    // weight_unit: string;
    // category: string;
    image: any;
};

interface Product extends ProductForm {
    id: number;
}

interface EditProductProps {
    product: Product;
}

export default function EditProductImage({ product }: EditProductProps) {
    const { data, setData, post, processing, errors, reset } = useForm<ProductForm>({
        GTIN: product.GTIN,
        image: product.image,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(data.image)
        post(route('products.update', product.id));
    };
    return (
        <AppLayout>
            <div className='m-5'>
                <form onSubmit={submit}>
                    <div className="grid gap-2">
                        <Label htmlFor="image">Update Image</Label>
                        <FileUploader
                            name="image"
                            hoverTitle="Upload Image Here"
                            handleChange={(file) => {
                                setData('image', file);
                            }}
                        />
                        <InputError message={errors.image} className="mt-2" />
                        
                    </div>

                    <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Update product image
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
