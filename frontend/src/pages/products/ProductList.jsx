import React, { useState, useEffect } from 'react';
import { getCategories } from '../../api/category';
import API from "../../api/axios";
import { createProduct, getProduct, updateProduct, deleteProduct } from '../../api/product';
import { Trash,Pencil } from 'lucide-react';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    const [title, setTitle] = useState("");
    const [brand, setBrand] = useState("");
    const [description, setDescription] = useState("");
    const [editP, setEditP] = useState(null);

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
    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {
        try {
            const res = await getProduct();
            console.log(res.data);
            setProducts(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (editP) {
                await updateProduct(editP, {
                    title,
                    description,
                    brand,
                    category_id: categoryId,
                    is_active: true
                });
                alert("Product Updated");
                setEditP(null);
            } else {
                await createProduct({
                    title,
                    description,
                    brand,
                    category_id: categoryId,
                    is_active: true
                });
                alert("Product Created");
            }
            fetchProducts();
            setTitle("");
            setBrand("");
            setDescription("");
            setCategoryId("");
        } catch (err) {
            console.error("Error:",err);
            console.error("Error response : ",err.response?.data);
            alert(`Failed: ${err.response?.data?.message||err.message}`);
        }
    }

    function handleEdit(product) {
        setEditP(product.id);
        setTitle(product.title);
        setDescription(product.discription);
        setBrand(product.brand);
        setCategoryId(product.category_id);
    }
    async function handleDelete(id) {
        if (window.confirm("Are you sure?")) {
            try {
                await deleteProduct(id);
                alert("Deleted");
                fetchProducts();
            } catch (err) {
                console.error(err);
                alert("Delete Failed");
            }
        }
    }

    function handleCancel() {
        setEditP(null);
        setTitle("");
        setBrand("");
        setDescription("");
        setCategoryId("");
    }

    return (
        <div className='p-6'>
            <h1 className='text-2xl font-bold mb-4'>Products</h1>

            <div className='mb-6 bg-white p-4 rounded shadow'>
                <h2 className='text-lg font-semibold mb-3'>{editP ? "Edit Product" : "Add Product"}</h2>

                <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-4'>
                    <input
                        type="text"
                        placeholder='Title'
                        className='border p-2 rounded'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder='Brand'
                        className='border p-2 rounded'
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder='Description'
                        className='border p-2 rounded col-span-2'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <select
                        className='border p-2 rounded col-span-2'
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                    >
                        <option value="">select Category</option>
                        {
                            categories.map((cat) => (
                                <option value={cat.id} key={cat.id}>
                                    {cat.name}
                                </option>
                            ))
                        }
                    </select>

                    <div className='col-span-2 felx-gap-4'>
                        <button type='submit' className='bg-blue-600 text-white px-4 py-2 rounded flex-1'>
                            {editP ? "Update Product" : "Create Product"}
                        </button>
                        {editP && (
                            <button
                                type='button'
                                onClick={handleCancel}
                                className='bg-gray-400 text-white px-4 py-2 ml-2 rounded'
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className='grid grid-cols-3 gap-4'>
                {products.map((p) => (
                    <div key={p.id} className='bg-blue-200 border p-4 rounded shadow'>
                        <h2 className='font-semibold text-lg'>{p.title}</h2>

                        <p className='text-gray-600'>{p.discription}</p>

                        <p className='mt-2'>Brand: {p.brand}</p>

                        <p className='text-green-600 font-bold mt-2'>Category: {p.Category?.name}</p>

                        <p className='text-sm mt-2'>Status: {p.is_active ? "Active" : "Inactive"}</p>

                        <div className='mt-4 flex gap-2'>
                            <button
                            onClick={()=> handleEdit(p)}
                            className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700'
                            >
                                <Pencil size={15}/>
                            </button>
                            <button
                                onClick={()=> handleDelete(p.id)}
                                className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700'
                            >
                                <Trash size={15}/>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductList