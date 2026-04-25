import API from "./axios";

export const createVariant = (data) => {
    return API.post("/variant/create", data);
}

export const getVariantByProduct = (productID) => {
    return API.get(`/variant/${productID}`);
};

export const updateVariant = (id, data) => {
    return API.put(`/variant/${id}`, data);
};

export const deleteVariant = (id) => {
    return API.delete(`/variant/${id}`);
};
