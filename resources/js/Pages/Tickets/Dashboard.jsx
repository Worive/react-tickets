import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Tickets - Dashboard</h2>}
        >
            <Head title="Tickets Dashboard" />
        </AuthenticatedLayout>
    );
}
