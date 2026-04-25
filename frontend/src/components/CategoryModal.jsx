import React, { useEffect, useState } from 'react';

function CategoryModal({ isOpen, onClose, onSubmit, editData }) {
    const [name, setName] = useState("");
    const [parentId, setParentId] = useState("");

    useEffect(() => {
        if (editData) {
            setName(editData.name);
            setParentId(editData.parent_id || "");
        } else {
            setName("");
            setParentId("");
        }
    }, [editData]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit({
            name,
            parent_id: parentId || null,
        });

        setName("");
        setParentId("");
        onClose();
    };

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='bg-white p-6 rounded-xl w-[400px]'>
                <h2 className='text-lg font-bold mb-4'>{editData ? "Edit Category" : "Add Category"}</h2>

                <form onSubmit={handleSubmit} className='space-y-4'>

                    <input
                        type="text"
                        placeholder='Category Name'
                        className='w-full border p-2 rounded'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder='Parent ID'
                        className='w-full border p-2 rounded'
                        value={parentId}
                        onChange={(e) => setParentId(e.target.value)}
                    />

                    <div className='flex justify-end gap-2'>
                        <button
                            type='button'
                            onClick={onClose}
                            className='px-4 py-2 bg-gray-300 rounded'
                        >
                            Cancel
                        </button>

                        <button
                            type='submit'
                            className='px-4 py-2 bg-blue-500 text-white rounded'
                        >
                            {editData ? "Update" : "Add"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CategoryModal