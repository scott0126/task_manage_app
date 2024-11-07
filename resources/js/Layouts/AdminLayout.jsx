// resources/js/Layouts/AdminLayout.jsx
import React from 'react';
import AdminSidebar from '@/Components/Layouts/AdminSidebar';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function AdminLayout({ user, children }) {
    return (
        <div className="flex">
            <AdminSidebar />
            <div className="flex-1">
                <AuthenticatedLayout user={user}>
                    {children}
                </AuthenticatedLayout>
            </div>
        </div>
    );
}
