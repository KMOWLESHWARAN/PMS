import React, { useState, useEffect } from 'react';
import { getCategories } from '../../api/category';
import API from "../../api/axios";
import { createProduct, getProduct } from '../../api/product';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    const [title, setTitle] = useState("");
    const [brand, setBrand] = useState("");
    const [description, setDescription] = useState("");

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
            await createProduct({
                title,
                description,
                brand,
                category_id: categoryId,
                is_active: true
            });

            alert("Product Created");
            fetchProducts();
            setTitle("");
            setBrand("");
            setDescription("");
            setCategoryId("");
        } catch (err) {
            console.error(err);
            alert("Failed");
        }
    }
    return (
        <div className='p-6'>
            <h1 className='text-2xl font-bold mb-4'>Products</h1>

            <div className='mb-6 bg-white p-4 rounded shadow'>
                <h2 className='text-lg font-semibold mb-3'>Add Product</h2>

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
                    <button className='bg-blue-600 text-white px-4 py-2 rounded col-sapn-2'>Create Product</button>
                </form>
            </div>

            <div className='grid grid-cols-3 gap-4'>
                {products.map((p) => (
                    <div key={p.id} className='border p-4 rounded shadow'>
                        <h2 className='font-semibold text-lg'>{p.title}</h2>

                        <p className='text-gray-600'>{p.discription}</p>

                        <p className='mt-2'>Brand: {p.brand}</p>

                        <p className='text-green-600 font-bold mt-2'>Category: {p.Category?.name}</p>

                        <p className='text-sm mt-2'>Status: {p.is_active ? "Active" : "Inactive"}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductList