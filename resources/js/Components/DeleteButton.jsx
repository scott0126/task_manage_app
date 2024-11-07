import { router } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import IconButton from './IconButton';
import { mdiDelete } from '@mdi/js';

export default function DeleteButton({ route, onSuccess, className = '' }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDelete = () => {
        router.delete(route);
        setShowDeleteModal(false);
    };

    return (
        <>
            <IconButton
                icon={mdiDelete}
                color="red"
                onClick={() => setShowDeleteModal(true)}
                title="Delete Task"
            />

            <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to delete this task?
                    </h2>

                    <div className="mt-6 flex justify-end gap-4">
                        <button
                            type="button"
                            className="bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                            onClick={() => setShowDeleteModal(false)}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 rounded-md"
                            onClick={handleDelete}
                        >
                            Delete Task
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
