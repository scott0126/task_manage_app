import React, { useState } from 'react';
import { mdiHome, mdiCog, mdiLogout } from '@mdi/js';
import Icon from '@mdi/react';
import NavLink from '@/Components/NavLink';
import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function UserSidebar() {
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className="relative z-10 flex h-screen">
            <div className="absolute inset-0 bg-gray-600 bg-opacity-75 lg:hidden" onClick={toggleSidebar}></div>
            <div className={`sidebar flex flex-col z-10 border-r border-gray-200 bg-gray-100 ${collapsed ? 'collapsed' : ''}`}>
                <div className="flex min-h-0 flex-1 flex-col">
                    <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                        <div className="flex items-center justify-center px-4">
                            <Link href="/">
                                <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                            </Link>
                        </div>
                        <nav className="mt-5 flex-1" aria-label="Sidebar">
                            <div className="space-y-1 px-2">
                                <NavLink href="/user/dashboard" active={window.location.pathname === '/admin/dashboard'}>
                                    <Icon path={mdiHome} size={1} className="text-2xl mr-1" />
                                    <span className="label">Dashboard</span>
                                </NavLink>
                                <hr />
                                <NavLink href="/user/users" active={window.location.pathname.startsWith('/admin/users')}>
                                    <Icon path={mdiCog} size={1} className="text-2xl mr-1" />
                                    <span className="label">Users</span>
                                </NavLink>
                                <NavLink href="/user/tasks" active={window.location.pathname.startsWith('/admin/tasks')}>
                                    <Icon path={mdiCog} size={1} className="text-2xl mr-1" />
                                    <span className="label">Tasks</span>
                                </NavLink>
                                <NavLink href="/user/settings" active={window.location.pathname.startsWith('/admin/settings')}>
                                    <Icon path={mdiCog} size={1} className="text-2xl mr-1" />
                                    <span className="label">Settings</span>
                                </NavLink>
                                <NavLink href="/logout" onClick={(e) => { e.preventDefault(); /* handle logout */ }}>
                                    <Icon path={mdiLogout} size={1} className="text-2xl mr-1" />
                                    <span className="label">Logout</span>
                                </NavLink>
                            </div>
                        </nav>
                    </div>
                    <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
                        <NavLink href="#" className="group block flex-shrink-0 cursor-pointer">
                            <div className="flex items-center">
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">User Name</p>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}
