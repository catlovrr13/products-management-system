import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Textarea } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

type ProductForm = {
    GTIN: string;
};
interface Product {
    id: number;
    GTIN: string;
}
interface ValidateGTINProps {
    products: Product[];
}

export default function ValidateGTIN({ products = [] }: ValidateGTINProps) {
    const { data, setData, post, processing, errors, reset } = useForm<ProductForm>({
        GTIN: '',
    });

    const isAllValid = () => {
        const gtins = data.GTIN.split("\n")
        for (let i = 0 ; i < gtins.length ; i++) {
            if(products.find(p => p.GTIN === gtins[i])){
                continue
            }

            return false
        }

        return true
    }

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('products.find'));
    };
    return (
        <AppLayout>
            <form className="flex flex-col gap-6 p-10" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="gtin">Validate GTIN</Label>
                        <Textarea
                            id="gtin"
                            required
                            value={data.GTIN}
                            onChange={(e) => setData('GTIN', e.target.value)}
                            className="h-50 w-full border border-gray-500 p-3"
                        />
                        <InputError message={errors.GTIN} />
                    </div>

                    <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Check GTIN validity
                    </Button>
                </div>
            </form>
            <div className="flex flex-col items-center justify-center">
                {products.length > 0 ? (
                    <div className="border-grey-300 m-2 w-fit border flex flex-col justify-between items-center p-2">
                        {isAllValid() ? (
                            <div className='flex items-center justify-center flex-col'>
                                <img src="/storage/green-tick.png" width={20} height={20} className='rounded-2xl' />
                                <p>All valid</p>
                            </div>
                            ) : ''}
                        {data.GTIN.split('\n').map((product) => (
                            <div>
                                <div className="m-2 flex flex-row gap-3" key={product}>
                                    <div className="flex flex-col">{product}</div>
                                    <div className="flex flex-col">{products.find((p) => p.GTIN === product) ? 'VALID' : 'INVALID'}</div>
                                    <div>
                                        {products.find((p) => p.GTIN === product) ? <img src="/storage/green-tick.png" width={20} height={20} className='rounded-2xl' /> : ''}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
        </AppLayout>
    );
}
