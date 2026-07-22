import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { FileUploader } from 'react-drag-drop-files';

type ProductForm = {
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
    image: any;
};

export default function CreateProduct() {
    const { data, setData, post, processing, errors, reset } = useForm<ProductForm>({
        GTIN: '',
        name: '',
        description: '',
        description_fr: '',
        name_fr: '',
        brand_name: '',
        country_of_origin: '',
        gross_weight: '',
        net_content_weight: '',
        weight_unit: '',
        category: '',
        image: '',
    });


    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('products.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout>
            <Head title="Create a Product" />
            <form className="flex flex-col gap-6 p-10" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="GTIN">GTIN</Label>
                        <Input
                            id="GTIN"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="GTIN"
                            value={data.GTIN}
                            onChange={(e) => setData('GTIN', e.target.value)}
                            disabled={processing}
                            placeholder="GTIN"
                        />
                        <InputError message={errors.GTIN} className="mt-2" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            placeholder="Full name"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                            id="description"
                            type="text"
                            required
                            tabIndex={2}
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            disabled={processing}
                            placeholder="description"
                        />
                        <InputError message={errors.description} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description_fr">Description in french</Label>
                        <Input
                            id="description_fr"
                            type="text"
                            required
                            tabIndex={2}
                            value={data.description_fr}
                            onChange={(e) => setData('description_fr', e.target.value)}
                            disabled={processing}
                            placeholder="description_fr"
                        />
                        <InputError message={errors.description_fr} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="name_fr">Name in french</Label>
                        <Input
                            id="name_fr"
                            type="text"
                            required
                            tabIndex={2}
                            autoComplete="name_fr"
                            value={data.name_fr}
                            onChange={(e) => setData('name_fr', e.target.value)}
                            disabled={processing}
                            placeholder="name_fr"
                        />
                        <InputError message={errors.name_fr} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="brand_name">Brand Name</Label>
                        <Input
                            id="brand_name"
                            type="text"
                            required
                            tabIndex={3}
                            value={data.brand_name}
                            onChange={(e) => setData('brand_name', e.target.value)}
                            disabled={processing}
                            placeholder="brand_name"
                        />
                        <InputError message={errors.brand_name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="country_of_origin">Country of origin</Label>
                        <Input
                            id="country_of_origin"
                            type="text"
                            required
                            tabIndex={3}
                            value={data.country_of_origin}
                            onChange={(e) => setData('country_of_origin', e.target.value)}
                            disabled={processing}
                            placeholder="country_of_origin"
                        />
                        <InputError message={errors.country_of_origin} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="gross_weight">Gross Weight</Label>
                        <Input
                            id="gross_weight"
                            type="text"
                            required
                            tabIndex={3}
                            value={data.gross_weight}
                            onChange={(e) => setData('gross_weight', e.target.value)}
                            disabled={processing}
                            placeholder="gross_weight"
                        />
                        <InputError message={errors.gross_weight} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="net_content_weight">Net Content Weight</Label>
                        <Input
                            id="net_content_weight"
                            type="text"
                            required
                            tabIndex={3}
                            value={data.net_content_weight}
                            onChange={(e) => setData('net_content_weight', e.target.value)}
                            disabled={processing}
                            placeholder="net_content_weight"
                        />
                        <InputError message={errors.net_content_weight} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="weight_unit">Weight Unit</Label>
                        <Input
                            id="weight_unit"
                            type="text"
                            required
                            tabIndex={3}
                            value={data.weight_unit}
                            onChange={(e) => setData('weight_unit', e.target.value)}
                            disabled={processing}
                            placeholder="weight_unit"
                        />
                        <InputError message={errors.weight_unit} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="category">Category</Label>
                        <Input
                            id="category"
                            type="text"
                            required
                            tabIndex={3}
                            value={data.category}
                            onChange={(e) => setData('category', e.target.value)}
                            disabled={processing}
                            placeholder="category"
                        />
                        <InputError message={errors.category} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="image">Image</Label>
                        <FileUploader 
                            name='image'
                            hoverTitle='Upload Image Here'
                            handleChange={(file) => {
                                setData("image", file)
                            }}
                        />
                    </div>

                    <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Create product
                    </Button>
                </div>
            </form>
        </AppLayout>
    );
}
