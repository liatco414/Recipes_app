import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/recipes`;
const userToken = () => localStorage.getItem("token");

export const getAllRecipes = () => {
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

export const getRecipeById = (recipeId) => {
    let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${API}/${recipeId}`,
        headers: {},
    };

    return axios
        .request(config)
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
        .catch((error) => {
            console.error("Failed to fetch recipe:", error.response?.data || error.message);
            return null;
        });
};

export const getRecipeByCategoryId = (categoryId) => {
    let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${API}/${categoryId}/recipes-by-category`,
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

export const addRecipe = (user) => {
    let data = {
        recipeContent: {
            ingredients: user.recipeContent?.ingredients,
            instructions: user.recipeContent?.instructions,
        },
        image: {
            url: user.image?.url || "https://st4.depositphotos.com/21557188/23286/v/450/depositphotos_232861182-stock-illustration-restaurant-cloche-tray-restaurant-icon.jpg",
            alt: user.image?.alt || "food icon",
        },
        title: user.title,
        subtitle: user.subtitle,
        category: [user.category],
    };

    let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${API}`,
        headers: {
            "x-auth-token": userToken(),
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

export const favRecipe = (recipeId, updatedLikes) => {
    const data = {
        likes: updatedLikes,
    };

    let config = {
        method: "patch",
        maxBodyLength: Infinity,
        url: `${API}/${recipeId}`,
        headers: {
            "x-auth-token": userToken(),
            "Content-Type": "application/json",
        },
        data: data,
    };

    return axios
        .request(config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
};

export const editRecipe = (recipeId, recipeData) => {
    let data = JSON.stringify({
        recipeContent: {
            ingredients: recipeData.recipeContent?.ingredients,
            instructions: recipeData.recipeContent?.instructions,
        },
        image: {
            url: recipeData.image?.url,
            alt: recipeData.image?.alt,
        },
        title: recipeData.title,
        subtitle: recipeData.subtitle,
        category: recipeData.category,
    });

    let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `${API}/${recipeId}`,
        headers: {
            "x-auth-token": userToken(),
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

export const GetCommentsByRecipeId = (recipeId) => {
    let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${API}/${recipeId}/comments`,
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

export const commentRecipe = (recipeId, comment) => {
    if (!comment) {
        console.log("Comment is required");
        return;
    }
    let data = {
        comments: [
            {
                comment: comment,
            },
        ],
    };

    let config = {
        method: "patch",
        maxBodyLength: Infinity,
        url: `${API}/comments/${recipeId}`,
        headers: {
            "x-auth-token": userToken(),
            "Content-Type": "application/json",
        },
        data: data,
    };

    return axios
        .request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
};

export const deleteComment = (recipeId, commentId) => {
    let config = {
        method: "patch",
        maxBodyLength: Infinity,
        url: `${API}/comments/${recipeId}/${commentId}`,
        headers: {
            "x-auth-token": userToken(),
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

export const deleteRecipe = (recipeId) => {
    let config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: `${API}/${recipeId}`,
        headers: {
            "x-auth-token": userToken(),
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
