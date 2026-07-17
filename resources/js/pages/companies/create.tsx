import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';

type CompanyForm = {
    name: string;
    address: string;
    telephone_number: string;
    email_address: string;
    company_name: string;
    owner_name: string;
    owner_mobile_number: string;
    owner_email_address: string;
    contact_name: string;
    contact_mobile_number: string;
    contact_email_address: string;
};

export default function CreateCompany() {
    const { data, setData, post, processing, errors, reset } = useForm<CompanyForm>({
        name: '',
        address: '',
        telephone_number: '',
        email_address: '',
        company_name: '',
        owner_name: '',
        owner_mobile_number: '',
        owner_email_address: '',
        contact_name: '',
        contact_mobile_number: '',
        contact_email_address: ''
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('/companies/create'));
    };

    return (
        <AppLayout>
            <Head title="Create a Company" />
            <form className="flex flex-col gap-6 p-10" onSubmit={submit}>
                <div className="grid gap-6">
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
                        <Label htmlFor="address">Address</Label>
                        <Input
                            id="address"
                            type="text"
                            required
                            tabIndex={2}
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            disabled={processing}
                            placeholder="address@example.com"
                        />
                        <InputError message={errors.address} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="telephone_number">Telephone Number</Label>
                        <Input
                            id="telephone_number"
                            type="tel"
                            required
                            tabIndex={2}
                            value={data.telephone_number}
                            onChange={(e) => setData('telephone_number', e.target.value)}
                            disabled={processing}
                            placeholder="telephone_number"
                        />
                        <InputError message={errors.telephone_number} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            tabIndex={2}
                            autoComplete="email"
                            value={data.email_address}
                            onChange={(e) => setData('email_address', e.target.value)}
                            disabled={processing}
                            placeholder="email_address@example.com"
                        />
                        <InputError message={errors.email_address} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="owner_name">Owner's Name</Label>
                        <Input
                            id="owner_name"
                            type="string"
                            required
                            tabIndex={3}
                            value={data.owner_name}
                            onChange={(e) => setData('owner_name', e.target.value)}
                            disabled={processing}
                            placeholder="owner_name"
                        />
                        <InputError message={errors.owner_name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="owner_mobile_number">Owner's Mobile Number</Label>
                        <Input
                            id="owner_mobile_number"
                            type="string"
                            required
                            tabIndex={3}
                            value={data.owner_mobile_number}
                            onChange={(e) => setData('owner_mobile_number', e.target.value)}
                            disabled={processing}
                            placeholder="owner_mobile_number"
                        />
                        <InputError message={errors.owner_mobile_number} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="owner_email_address">Owner's Email Address</Label>
                        <Input
                            id="owner_email_address"
                            type="string"
                            required
                            tabIndex={3}
                            value={data.owner_email_address}
                            onChange={(e) => setData('owner_email_address', e.target.value)}
                            disabled={processing}
                            placeholder="owner_email_address"
                        />
                        <InputError message={errors.owner_email_address} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="contact_name">Contact Name</Label>
                        <Input
                            id="contact_name"
                            type="string"
                            required
                            tabIndex={3}
                            value={data.contact_name}
                            onChange={(e) => setData('contact_name', e.target.value)}
                            disabled={processing}
                            placeholder="contact_name"
                        />
                        <InputError message={errors.contact_name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="contact_mobile_number">Contact Mobile Number</Label>
                        <Input
                            id="contact_mobile_number"
                            type="string"
                            required
                            tabIndex={3}
                            value={data.contact_mobile_number}
                            onChange={(e) => setData('contact_mobile_number', e.target.value)}
                            disabled={processing}
                            placeholder="contact_mobile_number"
                        />
                        <InputError message={errors.contact_mobile_number} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="contact_email_address">Contact Email Address</Label>
                        <Input
                            id="contact_email_address"
                            type="string"
                            required
                            tabIndex={3}
                            value={data.contact_email_address}
                            onChange={(e) => setData('contact_email_address', e.target.value)}
                            disabled={processing}
                            placeholder="contact_email_address"
                        />
                        <InputError message={errors.contact_email_address} />
                    </div>

                    <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Create company
                    </Button>
                </div>
            </form>
        </AppLayout>
    );
}
