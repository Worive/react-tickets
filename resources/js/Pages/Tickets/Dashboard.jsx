import {Head} from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tickets - Dashboard</h2>}
        >
            <Head title="Tickets Dashboard" />

        </AuthenticatedLayout>
    );
};
