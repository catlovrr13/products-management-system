import AppLayout from '@/layouts/app-layout';
import { Link } from '@inertiajs/react';

export default function Companies({ companies }) {
    console.log(companies);

    const breadcrumbs = [
        {
            title: 'Companies',
            href: '/companies',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Link href='/companies/create'>
                <button style={{ padding: 10, border: 'white', borderWidth: 3 }}>Create a company</button>
            </Link>
            <div>
                
            </div>
        </AppLayout>
    );
}
