import AppLayout from '@/layouts/app-layout';
import { Link } from '@inertiajs/react';

interface Company {
    id: number;
    name: string;
    address: string;
    telephone_number: string;
    email_address: string;
    owner_name: string;
    owner_email_address: string;
    owner_mobile_number: string;
    contact_name: string;
    contact_email_address: string;
    contact_mobile_number: string;
}

interface CompaniesPageProps {
    companies: Company[];
}

export default function Companies({ companies }: CompaniesPageProps) {
    const breadcrumbs = [
        {
            title: 'Companies',
            href: '/companies',
        },
    ];

    const handleDeactivate = (id: number) => {
        if (confirm('Are you sure you want to dea this company?')) {
            // router.delete(`/companies/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Link href="/companies/create" className="mt-2 flex items-center justify-end font-bold">
                <button className="rounded-xl p-3">Create a company</button>
            </Link>
            <div className="flex max-w-screen flex-row flex-wrap m-5">
                {companies.map((item) => (
                    <div key={item.id} className="border-grey m-2 flex flex-col rounded-2xl border p-5 w-125">
                        <h1 className="text-sm font-extralight italic">Company Name:</h1>
                        <Link href={route('companies.show', item.id)}>
                            <p className="text-l ml-8 font-serif text-blue-600 hover:underline">{item.name}</p>
                        </Link>
                        <h1 className="text-sm font-extralight italic">Address:</h1>
                        <p className="text-l ml-8 font-serif">{item.address}</p>
                        <h1 className="text-sm font-extralight italic">Email Address:</h1>
                        <p className="text-l ml-8 font-serif">{item.email_address}</p>

                        <div className="mt-3 flex gap-2">
                            <Link href={`/companies/${item.id}/edit`} className="rounded-lg border px-3 py-1 text-sm">
                                Edit
                            </Link>
                            <button onClick={() => handleDeactivate(item.id)} className="rounded-lg border px-3 py-1 text-sm text-red-600">
                                Deactivate
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </AppLayout>
    );
}
