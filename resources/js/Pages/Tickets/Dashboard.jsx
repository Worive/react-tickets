import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import Resizable from '@/Components/Resizable.jsx';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Tickets Dashboard" />
            <div className="flex min-h-screen">
                <Resizable>
                    <h1>RESIZABLE ONE</h1>
                </Resizable>
                <div className="flex-1 bg-white p-6">
                    <h1 className="text-3xl font-bold">Main Content</h1>
                    <p>This is the main content area.</p>
                </div>
                <Resizable side="left">
                    <h1>RESIZABLE TWO</h1>
                </Resizable>
            </div>
        </AuthenticatedLayout>
    );
}
