import AppLayout from '@/layouts/app-layout';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

interface CategoryRow {
    id: number;
    name: string;
    in_use: boolean;
}

interface CategoriesIndexProps {
    categories: CategoryRow[];
}

export default function CategoriesIndex({ categories }: CategoriesIndexProps) {
    const [editingId, setEditingId] = useState<number | null>(null);

    const createForm = useForm({ name: '' });
    const editForm = useForm({ name: '' });

    const submitCreate = (e: React.FormEvent) => {
        e.preventDefault();
        createForm.post('/categories', { onSuccess: () => createForm.reset() });
    };

    const startEdit = (cat: CategoryRow) => {
        setEditingId(cat.id);
        editForm.setData('name', cat.name);
    };

    const submitEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        editForm.put(`/categories/${id}`, { onSuccess: () => setEditingId(null) });
    };

    const remove = (id: number) => {
        editForm.delete(`/categories/${id}`, { preserveScroll: true });
    };

    return (
        <AppLayout>
            <div className="space-y-6 p-6">
                <h1 className="text-xl font-semibold">Categories</h1>

                <form onSubmit={submitCreate} className="flex gap-2">
                    <input
                        value={createForm.data.name}
                        onChange={(e) => createForm.setData('name', e.target.value)}
                        placeholder="New category name"
                        className="rounded border px-3 py-2 text-sm"
                    />
                    <button disabled={createForm.processing} className="rounded bg-black px-4 py-2 text-sm text-white">
                        Add Category
                    </button>
                </form>
                {createForm.errors.name && <p className="text-sm text-red-500">{createForm.errors.name}</p>}

                <ul className="divide-y rounded-2xl border">
                    {categories.map((cat) => (
                        <li key={cat.id} className="flex items-center justify-between p-4">
                            {editingId === cat.id ? (
                                <form onSubmit={(e) => submitEdit(e, cat.id)} className="flex flex-1 items-center gap-2">
                                    <input
                                        value={editForm.data.name}
                                        onChange={(e) => editForm.setData('name', e.target.value)}
                                        className="rounded border px-3 py-1 text-sm"
                                    />
                                    <button disabled={editForm.processing} className="rounded bg-black px-3 py-1 text-sm text-white">
                                        Save
                                    </button>
                                    <button type="button" onClick={() => setEditingId(null)} className="text-muted-foreground text-sm underline">
                                        Cancel
                                    </button>
                                </form>
                            ) : (
                                <>
                                    <div>
                                        <p className="font-semibold">{cat.name}</p>
                                        {cat.in_use && <p className="text-muted-foreground text-xs">In use by existing products</p>}
                                    </div>
                                    <div className="flex gap-3">
                                        <button onClick={() => startEdit(cat)} className="text-sm underline">
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => remove(cat.id)}
                                            disabled={cat.in_use}
                                            className="text-sm text-red-500 underline disabled:cursor-not-allowed disabled:text-gray-300"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>

                {editForm.errors.name && <p className="text-sm text-red-500">{editForm.errors.name}</p>}
            </div>
        </AppLayout>
    );
}
