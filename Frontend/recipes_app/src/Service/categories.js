import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/categories`;

export const getAllCategories = () => {
    let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: API,
        headers: {},
    };

    return axios
        .request(config)
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
};

export const getCategoryById = (categoryId) => {
    let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${API}/${categoryId}`,
        headers: {},
    };

    return axios
        .request(config)
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
};
