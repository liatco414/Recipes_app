import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/users`;
const UserToken = () => localStorage.getItem("token");

export const loginUser = (user) => {
    let data = JSON.stringify({
        email: user.email,
        password: user.password,
    });

    let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${API}/login`,
        headers: {
            "Content-Type": "application/json",
        },
        data: data,
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

export const registerUser = (user) => {
    let data = {
        name: {
            first: user.name.first,
            middle: user.name.middle,
            last: user.name.last,
        },
        phone: user.phone,
        email: user.email,
        password: user.password,
        image: {
            url: user.image.url || "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png",
            alt: user.image.alt || "default profile pic - icon",
        },
        isBlogger: Boolean(user.isBlogger) || false,
        isAdmin: false,
    };

    let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${API}`,
        headers: {
            "Content-Type": "application/json",
        },
        data: data,
    };

    return axios
        .request(config)
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
        .catch((error) => {
            console.log(error);
            throw error;
        });
};

export const getAllUsers = () => {
    let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${API}`,
        headers: {
            "Content-Type": "application/json",
        },
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

export const getUserById = (userId) => {
    let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${API}/${userId}`,
        headers: {
            "x-auth-token": UserToken(),
        },
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

export const editUser = (userId, userData) => {
    let data = JSON.stringify({
        name: {
            first: userData.name?.first,
            middle: userData.name?.middle,
            last: userData.name?.last,
        },
        phone: userData.phone,
        email: userData.email,
        image: {
            url: userData.image?.url,
            alt: userData.image?.alt,
        },
    });

    let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `${API}/${userId}`,
        headers: {
            "x-auth-token": UserToken(),
            "Content-Type": "application/json",
        },
        data: data,
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

export const deleteUser = (userId) => {
    let config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: `${API}/${userId}`,
        headers: {
            "x-auth-token": UserToken(),
        },
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
