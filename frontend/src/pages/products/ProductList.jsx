import React, { useState, useEffect } from 'react';
import API from "../../api/axios";

function ProductList() {
    const [products,setProducts] = useState([]);

    useEffect(()=>{
        fetchProducts();
    },[]);

    async function fetchProducts(){
        try{
            const res = await API.get("/products");
            console.log(res.data);
            setProducts(res.data);
        }catch(error){
            console.log(error);
        }
    }

    return (
        <div className='p-6'>
            <h1 className='text-2xl font-bold mb-4'>Products</h1>

            <div className='grid grid-cols-3 gap-4'>
                {products.map((p)=>(
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