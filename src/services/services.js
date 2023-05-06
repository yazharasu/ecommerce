import { api_url } from "../utils/Constants"
import axios from "axios";


export const getAllCategories = () => {
    return axios.get(`${api_url}/products/categories`)
        .then(res=> res.data)

}

export const getAllProducts = () => {
    return axios.get(`${api_url}/products`)
            .then(res=> res.data)
};

export const getSingleProduct = (id) => {
    return axios.get(`${api_url}/products/${id}`)
            .then(res=> res.data)
};


export const filterCategory = (cat) => {
    return axios.get(`${api_url}/products/category/${cat}`)
        .then(res=> res.data)
};
