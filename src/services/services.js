import axios from "axios";

export const getAllCategories = () => {
    return axios.get(`https://fakestoreapi.com/products/categories`)
        .then(res=> res.data)

}

export const getAllProducts = () => {
    return axios.get(`https://fakestoreapi.com/products`)
            .then(res=> res.data)
};

export const getSingleProduct = (id) => {
    return axios.get(`https://fakestoreapi.com/products/${id}`)
            .then(res=> res.data)
};


export const filterCategory = (cat) => {
    return axios.get(`https://fakestoreapi.com/products/category/${cat}`)
        .then(res=> res.data)
};
