import React, { useState, useEffect } from 'react';
import { getCategories } from '../../api/category';
import { createProduct, getProduct, updateProduct, deleteProduct, bulkImportProducts, exportProducts } from '../../api/product';
import { Trash, Pencil, LayoutTemplate } from 'lucide-react';
import VariantModal from '@/components/VariantModal';
import { createVariant, deleteVariant, updateVariant } from '../../api/variant';
import toast from 'react-hot-toast';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    const [title, setTitle] = useState("");
    const [brand, setBrand] = useState("");
    const [description, setDescription] = useState("");
    const [editP, setEditP] = useState(null);

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const [openModelVariant, setOpenModelVariant] = useState(false);
    const [selectProductId, setSelectProductId] = useState(null);
    const [editVariant, setEditVariant] = useState(null);

    const [selectedCategory, setSelectedCategory] = useState("all");

    const [search, setSearch] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const prodcutPerPage = 3;

    const [totalPages, setTotalPages] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage]);

    const fetchCategories = async () => {
        try {
            const res = await getCategories();
            console.log("Full Response:", res);
            console.log("Data", res.data);

            setCategories(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchProducts = async (page = 1) => {
        try {
            const res = await getProduct(page, prodcutPerPage, search, selectedCategory);

            setProducts(res.data.data);
            setTotalPages(res.data.totalPages);
            setCurrentPage(res.data.page);
            setTotalProducts(res.data.total);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
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
                toast.success("Product Updated");
            } else {
                await createProduct({
                    title,
                    description,
                    brand,
                    category_id: categoryId,
                    is_active: true
                });
                toast.success("Product Created");
            }

            fetchProducts();
            resetForm();

        } catch (err) {
            toast.error(err.response?.data?.message || err.message);
        }
    };

    const resetForm = () => {
        setTitle("");
        setBrand("");
        setDescription("");
        setCategoryId("");
        setEditP(null);
    };

    const handleEdit = (p) => {
        setEditP(p.id);
        setTitle(p.title);
        setDescription(p.description);
        setBrand(p.brand);
        setCategoryId(p.category_id);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure?")) {
            await deleteProduct(id);
            toast.success("Deleted");
            fetchProducts();
        }
    };

    const handleFileChange = (e) => {
        const f = e.target.files[0];

        if (!f) return;

        if (!f.name.endsWith(".csv")) {
            toast.error("Only CSV allowed");
            return;
        }

        setFile(f);
    };

    const handleUpload = async () => {
        if (!file) {
            toast.error("Select file first");
            return;
        }
        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("file", file);

            const res = await bulkImportProducts(formData);

            toast.success(
                `Inserted: ${res.inserted}, Skipped: ${res.skipped}`
            );

            setFile(null);
            fetchProducts();

        } catch (err) {
            toast.error(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVariantSubmit = async (data) => {
        try {
            if (editVariant) {
                await updateVariant(editVariant.id, data);
                toast.success("Variant Updated");
            } else {
                await createVariant(data);
                toast.success("Variant Created");
            }

            fetchProducts();
            setOpenModelVariant(false);
            setEditVariant(null);

        } catch (err) {
            toast.error(err.response?.data?.message);
        }
    };

    const handleEditVariant = (variant) => {
        setEditVariant(variant);
        setSelectProductId(variant.product_id);
        setOpenModelVariant(true);
    };

    const handleDeleteVariant = async (id) => {
        if (window.confirm("Are you sure")) {
            await deleteVariant(id);
            toast.success("Variant Deleted");
            fetchProducts();
        }
    };

    const handleExport = async () => {
        try {
            const data = await exportProducts();

            const blob = new Blob([data], { type: "text/csv" });

            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = "products.csv";

            document.body.appendChild(link);
            link.click();
            link.remove();

        } catch (err) {
            console.error("Export error:", err);
            alert("Export failed");
        }
    };
    
    useEffect(() => {
        setCurrentPage(1);
        fetchProducts(1);
    }, [selectedCategory, search]);

    const getPageNumbers = () => {
        let pages = [];

        if (totalPages === 0) return pages;

        let start = Math.max(1, currentPage - 1);
        let end = Math.min(totalPages, start + 2);

        if (end - start < 2) {
            start = Math.max(1, end - 2);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    };

    const pages = getPageNumbers();

    return (
        <div className='p-6'>
            <h1 className='text-2xl font-bold mb-4'>
                Products
            </h1>

            <div className='mb-6 bg-white p-4 rounded shadow'>
                <h2 className='text-lg font-semibold mb-3'>
                    {editP ? "Edit Product" : "Add Product"}
                </h2>

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
                        <option value="">Select Category</option>
                        {categories.map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>

                    <button className='bg-blue-600 text-white px-4 py-2 rounded col-span-2'>
                        {editP ? "Update Product" : "Create Product"}
                    </button>
                </form>

                <div className="flex gap-3 mt-4">
                    <input type="file" accept=".csv" onChange={handleFileChange} />

                    <button
                        type="button"
                        onClick={handleUpload}
                        disabled={loading}
                        className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                        {loading ? "Uploading..." : "Upload CSV"}
                    </button>
                    <button
                        type="button"
                        onClick={handleExport}
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                        Export CSV
                    </button>
                </div>
            </div>
            <div>
                <input
                    type="text"
                    placeholder='search products..'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='w-full px-3 py-2'
                />
            </div>
            <div className='bg-gray-300 w-full py-3 px-4 my-3 rounded-sm flex gap-2'>
                <button
                    onClick={() => setSelectedCategory("all")}
                    className='bg-black rounded px-3 py-1 text-white'
                >
                    All
                </button>

                {categories.map((c) => (
                    <button
                        key={c.id}
                        onClick={() => setSelectedCategory(c.id)}
                        className='bg-black rounded px-3 py-1 text-white'
                    >
                        {c.name}
                    </button>
                ))}
            </div>


            <div className='flex justify-between items-center my-2'>
                <div className='text-gray-700'>
                    Total Products: {totalProducts}
                </div>
            </div>

            <div className='grid grid-cols-3 gap-4'>
                {products.length === 0 ? (
                    <div className='col-span-3 text-center text-gray-500'>No products found.</div>
                ) : (
                    products.map((p) => (
                        <div key={p.id} className='bg-blue-200 p-4 rounded shadow'>
                            <h2 className='font-semibold'>{p.title}</h2>
                            <p>{p.description}</p>
                            <p>Brand: {p.brand}</p>
                            <p>Category: {p.Category?.name}</p>
                            <div className='flex gap-2 mt-3'>
                                <button onClick={() => handleEdit(p)}>
                                    <Pencil size={16} />
                                </button>
                                <button onClick={() => handleDelete(p.id)}>
                                    <Trash size={16} />
                                </button>
                                <button
                                    onClick={() => {
                                        setSelectProductId(p.id);
                                        setOpenModelVariant(true);
                                    }}
                                >
                                    Add Variant
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="flex justify-center mt-4 gap-2">

                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className="px-3 py-1 bg-gray-400 text-white rounded"
                >
                    Prev
                </button>

                {pages.map((p, i) =>
                    p === "..." ? (
                        <span key={i}>...</span>
                    ) : (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(p)}
                            className={currentPage === p ? "bg-blue-600 text-white px-3 rounded" : ""}
                        >
                            {p}
                        </button>
                    )
                )}

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className="px-3 py-1 bg-gray-400 text-white rounded"
                >
                    Next
                </button>

            </div>
            <VariantModal
                isOpen={openModelVariant}
                onClose={() => {
                    setOpenModelVariant(false);
                    setEditVariant(null);
                }}
                productId={selectProductId}
                editData={editVariant}
                onSubmit={handleVariantSubmit}
            />
        </div>
    );
}

export default ProductList;