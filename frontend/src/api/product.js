import API from "./axios";

export const createProduct = (data)=>{
    return API.post("/products/create",data);
};

export const getProduct = ()=>{
    return API.get("/products");
};

export const updateProduct = (id,data)=>{
    return API.put(`/products/${id}`,data);
};

export const deleteProduct = (id)=>{
    return API.delete(`/products/${id}`);
};
