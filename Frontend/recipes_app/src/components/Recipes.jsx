import { useEffect, useState } from "react";
import { deleteRecipe, favRecipe, getRecipeByCategoryId } from "../Service/recipes";
import "../css/recipes.css";
import { Link, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { successMsg } from "../Service/feedbackService";

function Recipes({ searchTerm }) {
    const { categoryId } = useParams();
    const [recipes, setRecipes] = useState([]);
    const [userId, setUserId] = useState();
    const [userToken, setUserToken] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [filterdRecipes, setFilteredRecipes] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        setUserToken(token);

        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUserId(decoded._id);
                setIsAdmin(decoded.isAdmin);
            } catch (error) {
                console.log(error);
            }
        }

        getRecipeByCategoryId(categoryId)
            .then((response) => {
                setRecipes(response);
            })
            .catch((err) => console.log(err));
    }, [categoryId, userToken]);

    const handleFavRecipe = (recipeId) => {
        const recipeToUpdate = recipes.find((recipe) => recipe._id === recipeId);
        if (!recipeToUpdate) return;

        const isAlreadyLiked = recipeToUpdate.likes.includes(userId);
        let newLikes;

        if (isAlreadyLiked) {
            newLikes = recipeToUpdate.likes.filter((id) => id !== userId);
        } else {
            newLikes = [...recipeToUpdate.likes, userId];
        }

        const cleanedLikes = newLikes.filter((id) => id != null);

        favRecipe(recipeId, cleanedLikes.join(","))
            .then(() => {
                setRecipes((prevRecipes) => prevRecipes.map((recipe) => (recipe._id === recipeId ? { ...recipe, likes: cleanedLikes } : recipe)));
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        console.log(recipes);
    }, [recipes]);

    const handleDeleteRecipe = (recipeId) => {
        deleteRecipe(recipeId)
            .then(() => {
                setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe._id !== recipeId));
                successMsg("Recipe deleted successfully");
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        console.log(recipes);

        if (searchTerm) {
            const filtered = recipes.filter((recipe) => recipe.title?.toLowerCase().includes(searchTerm.toLowerCase()) || recipe.subtitle?.toLowerCase().includes(searchTerm.toLowerCase()));
            setFilteredRecipes(filtered);
        } else {
            setFilteredRecipes(recipes);
        }
    }, [searchTerm, recipes]);

    const displayedRecipes = searchTerm ? filterdRecipes.slice() : recipes.slice();

    return (
        <>
            <div className="recipes">
                {displayedRecipes.map((recipe) => (
                    <div className="recipe-body" key={recipe._id}>
                        <div className="recipe-content">
                            <h5>{recipe.title}</h5>
                            <p>{recipe.subtitle}</p>
                            <div className="more">
                                <Link className="show" to={`/recipes/${categoryId}/${recipe._id}`}>
                                    <strong>See full recipe</strong>
                                </Link>
                            </div>

                            <div className="icons">
                                {userToken && (
                                    <div onClick={() => handleFavRecipe(recipe._id)}>
                                        {recipe.likes.includes(userId) ? (
                                            <i className="fa-solid fa-bookmark" style={{ cursor: "pointer", padding: "10px", fontSize: "1.2em" }}></i>
                                        ) : (
                                            <i className="fa-regular fa-bookmark" style={{ cursor: "pointer", padding: "10px", fontSize: "1.2em" }}></i>
                                        )}
                                    </div>
                                )}
                                {recipe.user_id === userId && userToken && (
                                    <Link to={`/edit-recipe/${recipe._id}`} style={{ color: "white" }}>
                                        <i style={{ cursor: "pointer", padding: "10px", fontSize: "1.2em" }} className="fa-solid fa-pen-to-square"></i>
                                    </Link>
                                )}
                                {((userToken && recipe.user_id === userId) || isAdmin === true) && (
                                    <i
                                        onClick={() => handleDeleteRecipe(recipe._id)}
                                        style={{ cursor: "pointer", padding: "10px", fontSize: "1.2em", color: "white" }}
                                        className="fa-solid fa-trash"
                                    ></i>
                                )}
                            </div>
                        </div>
                        <div className="recipe-img-div">
                            <img src={recipe.image?.url} className="recipe-img" alt={recipe.image?.alt} />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Recipes;
