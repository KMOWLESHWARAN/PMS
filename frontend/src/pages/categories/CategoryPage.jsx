import React from 'react'
import { useState, useEffect } from 'react';
import CategoryModal from '@/components/CategoryModal';
import { createCategory, getCategories, updateCategory, deleteCategory } from '../../api/category';
import { Trash,Pencil } from 'lucide-react';
import toast from 'react-hot-toast';
function CategoryPage() {
    const [openModel, setOpenModel] = useState(false);
    const [categories, setCategories] = useState([]);
    const [editData, setEditData] = useState(null);

    const handleEdit = (cat) => {
        setEditData(cat);
        setOpenModel(true);
    }
    const fetchCategories = async () => {
        try {
            const res = await getCategories();
            setCategories(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteCategory(id);
            toast.success("Deleted");
            fetchCategories();
        } catch (err) {
            console.error("Delete error:", err);
            console.error("Error response:", err.response?.data);
            toast.error(`Failed: ${err.response?.data?.message || err.message}`);
        }
    };

    return (
        <div className='bg-white p-6 rounded-xl shadow'>
            <h1 className='text-2xl font-bold mb-4'>Category Management</h1>

            <button
                onClick={() => setOpenModel(true)}
                className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow text-white px-4 py-2 rounded'
            >+ Add Category</button>

            <div className='mt-6'>
                <table className='w-full border roundedlg overflow-hidden'>
                    <thead className='bg-gray-100'>
                        <tr className='bg-gray-200'>
                            {/* <th className='p-3 text-left'>ID</th> */}
                            <th className='p-3 text-left'>Name</th>
                            <th className='p-3 text-left'>Parent</th>
                            <th className='p-3 text-left'>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {categories.map((cat) => (
                            <tr key={cat.id} className='border'>
                                {/* <td className='p-2'>{cat.id}</td> */}
                                <td className='p-2'>{cat.name}</td>
                                <td className='p-2'>{cat.parent_id ? cat.parent_id : "-"}</td>
                                <td className='p-2 space-x-2'>
                                    <button
                                        className='text-blue-500 hover:underline'
                                        onClick={() => handleEdit(cat)}
                                    >
                                        <Pencil size={15}/>
                                    </button>

                                    <button
                                        className='text-red-500 hover:underline'
                                        onClick={() => handleDelete(cat.id)}
                                    >
                                        <Trash size={15}/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <CategoryModal
                    isOpen={openModel}
                    onClose={() => {
                        setOpenModel(false);
                        setEditData(null);
                    }}
                    editData={editData}
                    onSubmit={async (data) => {
                        try {
                            if (editData) {
                                await updateCategory(editData.id, data);
                                toast.success("Updated")
                            } else {
                                await createCategory(data);
                                toast.success("Created");
                            }
                            fetchCategories();
                            setOpenModel(false);
                            setEditData(null);
                        } catch (err) {
                            console.error("Full Error:", err);
                            console.error("Response:", err.response?.data);
                            toast.error(err.response?.data?.message || err.message)
                        }
                    }}
                />
            </div>
        </div >
    )
}

export default CategoryPage;