import React from 'react';
import UserSidebar from '@/Components/Layouts/UserSidebar';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function UserLayout({ user, children }) {
    return (
        <div className="flex">
            <UserSidebar />
            <div className="flex-1">
                <AuthenticatedLayout user={user}>
                    {children}
                </AuthenticatedLayout>
            </div>
        </div>
    );
}
