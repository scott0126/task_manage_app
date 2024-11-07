import { useForm, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import AdminLayout from '@/Layouts/AdminLayout';


export default function Edit({ auth, task, users, is_admin, currentAssignments }) {
    const { data, setData, put, processing, errors } = useForm({
        title: task.title,
        description: task.description,
        deadline: task.deadline,
        status: task.status,
        priority: task.priority,
        assigned_users: currentAssignments || [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.tasks.update', task.id), {
            ...data
        });
    };

    return (
        <AdminLayout user={auth.user}>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label>Title</label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                className="w-full border rounded px-3 py-2"
                            />
                            {errors.title && <div className="text-red-500">{errors.title}</div>}
                        </div>

                        <div className="mb-4">
                            <label>Description</label>
                            <textarea
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                className="w-full border rounded px-3 py-2"
                                rows="4"
                            />
                            {errors.description && <div className="text-red-500">{errors.description}</div>}
                        </div>

                        <div className="mb-4">
                            <label>Deadline</label>
                            <input
                                type="date"
                                value={data.deadline}
                                onChange={e => setData('deadline', e.target.value)}
                                className="w-full border rounded px-3 py-2"
                            />
                            {errors.deadline && <div className="text-red-500">{errors.deadline}</div>}
                        </div>

                        <div className="mb-4">
                            <label>Status</label>
                            <select
                                value={data.status}
                                onChange={e => setData('status', e.target.value)}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="pending">Pending</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                            {errors.status && <div className="text-red-500">{errors.status}</div>}
                        </div>

                        <div className="mb-4">
                            <label>Priority</label>
                            <select
                                value={data.priority}
                                onChange={e => setData('priority', e.target.value)}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                            {errors.priority && <div className="text-red-500">{errors.priority}</div>}
                        </div>

                        {is_admin && (
                            <div className="mb-4">
                                <label className="block mb-2">Assign Users</label>
                                <div className="space-y-2 max-h-60 overflow-y-auto border rounded p-3">
                                    {users.map(user => (
                                        <div key={user.id} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id={`user-${user.id}`}
                                                checked={data.assigned_users.includes(user.id)}
                                                onChange={() => {
                                                    const newAssignments = data.assigned_users.includes(user.id)
                                                        ? data.assigned_users.filter(id => id !== user.id)
                                                        : [...data.assigned_users, user.id];
                                                    setData('assigned_users', newAssignments);
                                                }}
                                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            />
                                            <label htmlFor={`user-${user.id}`} className="ml-2">
                                                {user.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                {errors.assigned_users && (
                                    <div className="text-red-500">{errors.assigned_users}</div>
                                )}
                            </div>
                        )}

                        <div className="flex justify-end gap-4">
                            <a
                                href={route('admin.tasks.index')}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Cancel
                            </a>
                            <PrimaryButton
                                type="submit"
                                disabled={processing}
                            >
                                Update Task
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
