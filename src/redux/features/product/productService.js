import axios from "axios";

export const BACKEND_URL = 'https://inv-man-api.onrender.com';

export const createNewProduct = async (formData) => {
    const response = await axios.post(`${BACKEND_URL}/api/products`, formData);
    return response.data;
};

export const getAllProducts = async () => {
    const response = await axios.get(`${BACKEND_URL}/api/products`);
    return response.data;
};

export const DeleteProduct = async (id) => {
    const response = await axios.delete(`${BACKEND_URL}/api/products/${id}`);
    return response.data;
};

export const getSingleProduct = async (id) => {
    const response = await axios.get(`${BACKEND_URL}/api/products/${id}`);
    return response.data;
};

export const updateProduct = async (id, formData) => {
    const response = await axios.patch(`${BACKEND_URL}/api/products/${id}`, formData);
    return response.data;
};

