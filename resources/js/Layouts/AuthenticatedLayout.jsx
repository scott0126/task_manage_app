import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-white">
            <main className="py-8">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
