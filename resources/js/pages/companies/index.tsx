import AppLayout from '@/layouts/app-layout';
import { Link, router } from '@inertiajs/react';

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

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this company?')) {
            router.delete(`/companies/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Link href="/companies/create" className='flex justify-end items-center mt-2 font-bold'>
                <button className='p-3 rounded-xl'>Create a company</button>
            </Link>
            <div className='flex flex-wrap w-150 flex-row'>
                {companies.map((item) => (
                    <div key={item.id} className='flex p-5 border border-grey flex-col m-2 hover:font-semibold rounded-2xl'>
                        <h1>Company name: {item.name}</h1>
                        <h1>Owners name: {item.address}</h1>
                        <h1>Email address: {item.email_address}</h1>

                        <div className="flex gap-2 mt-3">
                            <Link
                                href={`/companies/${item.id}/edit`}
                                className="px-3 py-1 border rounded-lg text-sm"
                            >
                                Edit
                            </Link>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="px-3 py-1 border rounded-lg text-sm text-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>

                    
                ))}
            </div>
        </AppLayout>
    );
}
