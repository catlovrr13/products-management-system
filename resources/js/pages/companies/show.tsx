import AppLayout from '@/layouts/app-layout';

interface Product {
    id: number;
    gtin: string;
    name_en: string;
    name_fr: string;
}

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
    products: Product[];
}

interface ShowCompanyProps {
    company: Company;
}

export default function ShowCompany({ company }: ShowCompanyProps) {
    return (
        <AppLayout>
            <div className="space-y-6 p-6">
                <div>
                    <h1 className="text-xl font-semibold">{company.name}</h1>
                    <p className="text-muted-foreground text-sm">{company.address}</p>
                    <p className="text-muted-foreground text-sm">{company.email_address}</p>
                </div>

                <div className='flex flex-wrap flex-row m-3 gap-2'>
                    <div className='border border-grey rounded-2xl p-5'>
                        <h1 className="text-sm font-semibold italic">Owner's Information</h1>
                        <p className="text-l font-semibold">{company.owner_name}</p>
                        <p className="text-muted-foreground text-sm">{company.owner_mobile_number}</p>
                        <p className="text-muted-foreground text-sm">{company.owner_email_address}</p>
                    </div>

                    <div className='border border-grey rounded-2xl p-5'>
                        <h1 className="text-sm font-semibold italic">Contact's Information</h1>
                        <p className="text-l font-semibold">{company.contact_name}</p>
                        <p className="text-muted-foreground text-sm">{company.contact_mobile_number}</p>
                        <p className="text-muted-foreground text-sm">{company.contact_email_address}</p>
                    </div>
                </div>

                {/* <div>
                    <h2 className="font-medium mb-2">Products</h2>
                    {company.products.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No products yet.</p>
                    ) : (
                        <ul className="space-y-1">
                            {company.products.map((product) => (
                                <li key={product.id} className="text-sm">
                                    {product.name_en} — GTIN {product.gtin}
                                </li>
                            ))}
                        </ul>
                    )}
                </div> */}
            </div>
        </AppLayout>
    );
}
