import { Link, Head } from '@inertiajs/react';

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <Head title="Home" />

            <header className="bg-white shadow w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
                    {/* Left - Icon */}
                    <div className="text-2xl font-bold text-indigo-600">TaskManager</div>

                    <div>
                        <Link
                            href={route('login')}
                            className="text-sm font-medium text-gray-600 hover:text-gray-900 px-4"
                        >
                            Login
                        </Link>
                        <Link
                            href={route('register')}
                            className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            </header>

            {/* Content Section */}
            <main className="flex-1 flex flex-col items-center justify-center p-4 text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Task Manager</h1>
                <p className="text-lg text-gray-600 mb-8">
                    Manage your tasks effectively with real-time updates, organized views, and easy collaboration.
                </p>
                <Link
                    href={route('dashboard')}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700"
                >
                    Go to Dashboard
                </Link>
            </main>
        </div>
    );
}
