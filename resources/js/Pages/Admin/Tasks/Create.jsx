import PrimaryButton from '@/Components/PrimaryButton';
import AdminLayout from '@/Layouts/AdminLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        deadline: '',
        status: 'pending',
        priority: 'medium'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.tasks.store'));
    };

    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Task</h2>}
        >
            <Head title="Create Task" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Title</label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                    {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Description</label>
                                    <textarea
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        className="w-full border rounded px-3 py-2"
                                        rows="3"
                                    />
                                    {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Deadline</label>
                                    <input
                                        type="date"
                                        value={data.deadline}
                                        onChange={e => setData('deadline', e.target.value)}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                    {errors.deadline && <div className="text-red-500 text-sm mt-1">{errors.deadline}</div>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Priority</label>
                                    <select
                                        value={data.priority}
                                        onChange={e => setData('priority', e.target.value)}
                                        className="w-full border rounded px-3 py-2"
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Status</label>
                                    <select
                                        value={data.status}
                                        onChange={e => setData('status', e.target.value)}
                                        className="w-full border rounded px-3 py-2"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>

                                <div className="flex justify-end">
                                    <a
                                        href={route('admin.tasks.index')}
                                        className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                                    >
                                        Cancel
                                    </a>
                                    <PrimaryButton
                                        type="submit"
                                        disabled={processing}
                                    >
                                        Create Task
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
