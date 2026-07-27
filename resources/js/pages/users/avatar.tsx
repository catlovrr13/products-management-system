import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import { FileUploader } from 'react-drag-drop-files';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';

export default function Avatar() {
    const { auth, errors } = usePage().props as any;
    const user = auth.user;

    const [preview, setPreview] = useState<string | null>(user.avatar ? `/storage/${user.avatar}` : null);
    const [processing, setProcessing] = useState(false);

    const handleChange = (file: File) => {
        setPreview(URL.createObjectURL(file));
        setProcessing(true);

        router.post(
            `/users/${user.id}/avatar`,
            { avatar: file, _method: 'patch' },
            {
                onFinish: () => setProcessing(false),
            },
        );
    };

    const remove = () => {
        setPreview(null);
        router.delete(`/users/${user.id}/avatar`);
    };

    return (
        <div>
            <p className="mb-3 text-sm">Avatar</p>

            {preview && (
                <div className="mb-3 flex items-center gap-3">
                    <img src={preview} alt={user.name} className="h-16 w-16 rounded-full object-cover" />
                    <Button type="button" variant="outline" size="sm" onClick={remove} disabled={processing}>
                        Remove
                    </Button>
                </div>
            )}

            <FileUploader
                name="avatar"
                types={['JPG', 'JPEG', 'PNG', 'GIF']}
                hoverTitle="Upload Image Here"
                handleChange={handleChange}
                disabled={processing}
            />

            <InputError message={errors.avatar} className="mt-2" />
        </div>
    );
}