import { mdiPencil, mdiPlus, mdiEye, mdiFilterOff } from '@mdi/js';
import Icon from '@mdi/react';
import AdminLayout from '@/Layouts/AdminLayout';
import IconButton from '@/Components/IconButton';
import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import DeleteButton from '@/Components/DeleteButton';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import Pagination from '@/Components/Pagination';

export default function Index({ auth, tasks, filters }) {
    const [values, setValues] = useState({
        search: filters.search || '',
        status: filters.status || '',
        priority: filters.priority || '',
    });

    const handleFiltersChange = useDebouncedCallback((newValues) => {
        router.get(route('admin.tasks.index'), newValues, {
            preserveState: true,
            preserveScroll: true,
            replace: true
        });
    }, 300);

    const updateFilters = (name, value) => {
        const newValues = {
            ...values,
            [name]: value
        };
        setValues(newValues);
        handleFiltersChange(newValues);
    };

    const clearFilters = () => {
        const clearedValues = {
            search: '',
            status: '',
            priority: ''
        };
        setValues(clearedValues);
        handleFiltersChange(clearedValues);
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Tasks" />

            <div className="py-4 sm:py-8">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-4 sm:mb-6 flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-800">Tasks</h2>
                        <a
                            href={route('admin.tasks.create')}
                            className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-150"
                        >
                            <Icon path={mdiPlus} size={0.8} />
                            <span>Create Task</span>
                        </a>
                    </div>

                    <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4">
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={values.search}
                            onChange={(e) => updateFilters('search', e.target.value)}
                        />
                        <select
                            className="w-full px-4 py-2 border rounded-lg"
                            value={values.status}
                            onChange={(e) => updateFilters('status', e.target.value)}
                        >
                            <option value="">All Statuses</option>
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                        <select
                            className="w-full px-4 py-2 border rounded-lg"
                            value={values.priority}
                            onChange={(e) => updateFilters('priority', e.target.value)}
                        >
                            <option value="">All Priorities</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>

                        {(values.search || values.status || values.priority) && (
                            <button
                                onClick={clearFilters}
                                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-150"
                            >
                                <Icon path={mdiFilterOff} size={0.8} />
                                <span>Clear Filters</span>
                            </button>
                        )}
                    </div>

                    {tasks.data.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">
                                No tasks found matching your filters.
                            </p>
                            {(values.search || values.status || values.priority) && (
                                <button
                                    onClick={clearFilters}
                                    className="mt-4 text-blue-500 hover:text-blue-600"
                                >
                                    Clear all filters
                                </button>
                            )}
                        </div>
                    )}

                    <div className="bg-white overflow-hidden shadow-xl rounded-lg">
                        <div className="hidden md:block">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left font-medium text-black uppercase tracking-wider">Title</th>
                                        <th className="px-6 py-3 text-left font-medium text-black uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left font-medium text-black uppercase tracking-wider">Priority</th>
                                        <th className="px-6 py-3 text-left font-medium text-black uppercase tracking-wider">Deadline</th>
                                        <th className="px-6 py-3 text-left font-medium text-black uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {tasks.data.map((task) => (
                                        <tr key={task.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-normal font-medium text-gray-900">{task.title}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <StatusBadge status={task.status} />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <PriorityBadge priority={task.priority} />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-normal text-gray-500">
                                                {task.deadline}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <IconButton
                                                        icon={mdiPencil}
                                                        color="indigo"
                                                        onClick={() => router.visit(route('admin.tasks.edit', task.id))}
                                                        title="Edit Task"
                                                    />
                                                    <DeleteButton
                                                        route={route('admin.tasks.destroy', task.id)}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="block md:hidden">
                            <div className="divide-y divide-gray-200">
                                {tasks.data.map((task) => (
                                    <div key={task.id} className="p-4 space-y-3">
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-sm font-medium text-gray-900">{task.title}</h3>
                                            <StatusBadge status={task.status} />
                                        </div>

                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-500">Priority:</span>
                                            <PriorityBadge priority={task.priority} />
                                        </div>

                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-500">Deadline:</span>
                                            <span className="text-gray-900">{task.deadline}</span>
                                        </div>

                                        <div className="flex justify-end pt-2 border-t border-gray-100">
                                            <div className="flex items-center gap-2">
                                                <IconButton
                                                    icon={mdiPencil}
                                                    color="indigo"
                                                    onClick={() => router.visit(route('admin.tasks.edit', task.id))}
                                                    title="Edit Task"
                                                />
                                                <DeleteButton
                                                    route={route('admin.tasks.destroy', task.id)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {tasks.data.length > 0 && (
                            <Pagination links={tasks.links} />
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

const StatusBadge = ({ status }) => {
    const colors = {
        completed: 'bg-green-100 text-green-800',
        in_progress: 'bg-yellow-100 text-yellow-800',
        pending: 'bg-gray-100 text-gray-800'
    };

    return (
        <span className={`px-2 py-1 inline-flex text-normal leading-5 font-semibold rounded-full ${colors[status]}`}>
            {status.replace('_', ' ')}
        </span>
    );
};

const PriorityBadge = ({ priority }) => {
    const colors = {
        high: 'bg-red-100 text-red-800',
        medium: 'bg-yellow-100 text-yellow-800',
        low: 'bg-green-100 text-green-800'
    };

    return (
        <span className={`px-2 py-1 inline-flex text-normal leading-5 font-semibold rounded-full ${colors[priority]}`}>
            {priority}
        </span>
    );
};
