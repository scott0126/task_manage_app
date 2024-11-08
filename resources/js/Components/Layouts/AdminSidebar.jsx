import React, { useState } from 'react';
import { mdiHome, mdiCog, mdiLogout, mdiAccountGroup, mdiClipboardListOutline, mdiAccountCircle } from '@mdi/js';
import Icon from '@mdi/react';
import NavLink from '@/Components/NavLink';
import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function AdminSidebar() {
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className="relative z-10 flex h-screen">
            <div className={`sidebar flex flex-col z-10 border-r border-gray-200 bg-white ${collapsed ? 'collapsed' : ''}`}>
                <div className="flex min-h-0 flex-1 flex-col">
                    <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                        <div className="flex items-center justify-center px-4">
                            <Link href="/">
                                <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                            </Link>
                        </div>
                        <nav className="mt-5 flex-1" aria-label="Sidebar">
                            <div className="space-y-1 px-2">
                                <NavLink href="/admin/dashboard" active={window.location.pathname === '/admin/dashboard'}>
                                    <Icon path={mdiHome} size={1.3} className="text-2xl m-1" />
                                    <span className="label">Dashboard</span>
                                </NavLink>
                                <hr />
                                {/* <NavLink href="/admin/users" active={window.location.pathname.startsWith('/admin/users')}>
                                    <Icon path={mdiAccountGroup} size={1.3} className="text-2xl m-1" />
                                    <span className="label">Users</span>
                                </NavLink> */}
                                <NavLink href="/admin/tasks" active={window.location.pathname.startsWith('/admin/tasks')}>
                                    <Icon path={mdiClipboardListOutline} size={1.3} className="text-2xl m-1" />
                                    <span className="label">Tasks</span>
                                </NavLink>
                                {/* <NavLink href="/admin/settings" active={window.location.pathname.startsWith('/admin/settings')}>
                                    <Icon path={mdiCog} size={1.3} className="text-2xl m-1" />
                                    <span className="label">Settings</span>
                                </NavLink> */}
                                <NavLink href="/profile" active={window.location.pathname.startsWith('/profile')}>
                                    <Icon path={mdiAccountCircle} size={1.3} className="text-2xl m-1" />
                                    <span className="label">Profile</span>
                                </NavLink>
                                <NavLink href={route('logout')} method="post" as="button">
                                    <Icon path={mdiLogout} size={1.3} className="text-2xl m-1" />
                                    <span className="label">Logout</span>
                                </NavLink>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}
