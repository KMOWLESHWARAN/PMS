import API from "./axios";

export const createCategory = (data)=>{
    return API.post("/category/create",data);
};

export const getCategories = ()=>{
    return API.get("/category");
};

export const updateCategory = (id,data)=>{
    return API.put(`/category/${id}`,data);
};

export const deleteCategory = (id)=>{
    return API.delete(`/category/${id}`);
};
