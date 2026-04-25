import API from "./axios";

export const createProduct = (data) => {
    return API.post("/products/create", data);
};

export const getProduct = (page = 1, limit = 3, search = "", category = "all") => {
    return API.get(`/products?page=${page}&limit=${limit}&search=${search}&category=${category}`);
};

export const updateProduct = (id, data) => {
    return API.put(`/products/${id}`, data);
};

export const deleteProduct = (id) => {
    return API.delete(`/products/${id}`);
};

export const bulkImportProducts = (formData) => {
    return API.post("/products/bulk-import", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
};

export const exportProducts = async () => {
    const res = await API.get("/products/export", {
        responseType: "blob"
    });
    return res.data;
};