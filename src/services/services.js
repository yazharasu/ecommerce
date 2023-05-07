import { api_url } from "../utils/Constants"
import axios from "axios";


export const getAllCategories = () => {
    return axios.get(`${api_url}/products/categories`)
}

export const getAllProducts = () => {
    return axios.get(`${api_url}/products`)
};

export const getSingleProduct = (id) => {
    return axios.get(`${api_url}/products/${id}`)
};


export const filterCategory = (cat) => {
    return axios.get(`${api_url}/products/category/${cat}`)
};
