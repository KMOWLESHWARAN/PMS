import React, { useEffect, useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

function VariantModal({ isOpen, onClose, onSubmit, productId, editData }) {
    const [sku, setSku] = useState("");
    const [price, setPrice] = useState("");
    const [discountPrice, setDiscountPrice] = useState("");
    const [stock, setStock] = useState("");
    const [attributes, setAttributes] = useState([{ name: "", value: "" }]);
    const [images, setImages] = useState([""]);

    useEffect(() => {
        if (editData) {
            setSku(editData.sku || "");
            setPrice(editData.price || "");
            setDiscountPrice(editData.discount_price || "");
            setStock(editData.stock || "");
            setAttributes(editData.attributes || [{ name: "", value: "" }]);
            setImages(editData.images || [""]);
        } else {
            setSku("");
            setPrice("");
            setDiscountPrice("");
            setStock("");
            setAttributes([{ name: "", value: "" }]);
            setImages([""]);
        }
    }, [editData, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit({
            product_id: productId,
            sku,
            price: parseFloat(price),
            discount_price: discountPrice ? parseFloat(discountPrice) : null,
            stock: parseInt(stock),
            attributes: attributes.filter(att => att.name && att.value),
            images: images.filter(img => img)
        });

        setSku("");
        setPrice("");
        setDiscountPrice("");
        setStock("");
        setAttributes([{ name: "", value: "" }]);
        setImages([""]);
    };

    const addAttribute = () => {
        setAttributes([...attributes, { name: "", value: "" }]);
    };

    const removeAttribute = (index) => {
        setAttributes(attributes.filter((_, i) => i !== index));
    };

    const updateAttribute = (index, field, value) => {
        const newAttributes = [...attributes];
        newAttributes[index][field] = value;
        setAttributes(newAttributes);
    };

    const addImage = () => {
        setImages([...images, ""]);
    };

    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const updateImage = (index, value) => {
        const newImage = [...images];
        newImage[index] = value;
        setImages(newImage);
    };

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
            <div className='bg-white p-6 rounded-xl w-[600px] max-h-[90vh] overflow-y-auto shadow-2xl'>
                <div className='flex justify-between items-center mb-6 pb-4 border-b'>
                    <h2 className='text-2xl font-bold text-gray-800'>
                        {editData ? "Edit Variant" : "Add Variant"}
                    </h2>
                    <button
                        onClick={onClose}
                        className='text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-full transition'
                    >
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className='space-y-5'>

                    <div>
                        <label className='block text-sm font-semibold mb-2 text-gray-700'>SKU</label>
                        <input
                            type="text"
                            placeholder=''
                            className='w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition'
                            value={sku}
                            onChange={(e) => setSku(e.target.value)}
                            required
                        />
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label className='block text-sm font-semibold mb-2 text-gray-700'>Price</label>
                            <input
                                type="number"
                                step="0.01"
                                placeholder=''
                                className='w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className='block text-sm font-semibold mb-2 text-gray-700'>Discount Price</label>
                            <input
                                type="number"
                                step="0.01"
                                placeholder=''
                                className='w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition'
                                value={discountPrice}
                                onChange={(e) => setDiscountPrice(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className='block text-sm font-semibold mb-2 text-gray-700'>Stock</label>
                        <input
                            type="number"
                            placeholder=''
                            className='w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition'
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            required
                        />
                    </div>

                    <div className='bg-gray-50 p-4 rounded-lg'>
                        <div className='flex justify-between items-center mb-3'>
                            <label className='block text-sm font-semibold text-gray-700'>Attributes</label>
                            <button
                                type='button'
                                onClick={addAttribute}
                                className='text-blue-600 text-sm flex items-center gap-1 hover:text-blue-700 bg-blue-50 px-3 py-1 rounded-md transition'
                            >
                                <Plus size={16} /> Add Attribute
                            </button>
                        </div>
                        {attributes.map((att, index) => (
                            <div key={index} className='flex gap-2 mb-3'>
                                <input
                                    type="text"
                                    placeholder=''
                                    className='flex-1 border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'
                                    value={att.name}
                                    onChange={(e) => updateAttribute(index, 'name', e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder=''
                                    className='flex-1 border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'
                                    value={att.value}
                                    onChange={(e) => updateAttribute(index, 'value', e.target.value)}
                                />
                                {attributes.length > 1 && (
                                    <button
                                        type='button'
                                        onClick={() => removeAttribute(index)}
                                        className='text-red-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition'
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className='bg-gray-50 p-4 rounded-lg'>
                        <div className='flex justify-between items-center mb-3'>
                            <label className='block text-sm font-semibold text-gray-700'>Image URLs</label>
                            <button
                                type='button'
                                onClick={addImage}
                                className='text-blue-600 text-sm flex items-center gap-1 hover:text-blue-700 bg-blue-50 px-3 py-1 rounded-md transition'
                            >
                                <Plus size={16} /> Add Image
                            </button>
                        </div>
                        {images.map((img, index) => (
                            <div key={index} className='flex gap-2 mb-3'>
                                <input
                                    type="text"
                                    placeholder=''
                                    className='flex-1 border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'
                                    value={img}
                                    onChange={(e) => updateImage(index, e.target.value)}
                                />
                                {images.length > 1 && (
                                    <button
                                        type='button'
                                        onClick={() => removeImage(index)}
                                        className='text-red-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition'
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className='flex justify-end gap-3 pt-4 border-t'>
                        <button
                            type='button'
                            onClick={onClose}
                            className='px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition font-semibold'
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className='px-6 py-3 bg-green-500 text-white rounded-lg'
                        >
                            {editData ? "Update" : "Add"} Variant
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default VariantModal;