import { useEffect, useState } from "react";
import { getAllRecipes, favRecipe } from "../Service/recipes";
import { jwtDecode } from "jwt-decode";
import "../css/recipes.css";
import { Link } from "react-router-dom";

function SavedRecipes({ searchTerm }) {
    const [favRecipes, setFavRecipes] = useState([]);
    const [userId, setUserId] = useState();
    const [userToken, setUserToken] = useState(null);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setUserToken(token);
        if (token) {
            const decode = jwtDecode(token);
            setUserId(decode._id);
            setIsAdmin(decode.isAdmin);
        }
    }, []);

    useEffect(() => {
        if (!userId) return;

        getAllRecipes()
            .then((response) => {
                const favs = response.filter((recipe) => Array.isArray(recipe.likes) && recipe.likes.includes(userId));
                setFavRecipes(favs);
            })
            .catch((error) => console.log(error.response?.data));
    }, [userId]);

    const handleFavToggle = async (recipeId) => {
        try {
            await favRecipe(recipeId, userId, {
                likes: favRecipes.find((recipe) => recipe._id === recipeId).likes.filter((id) => id !== userId),
            });
            setFavRecipes((prevFavRecipe) => prevFavRecipe.filter((recipe) => recipe._id !== recipeId));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (searchTerm) {
            const filtered = favRecipes.filter((recipe) => recipe.title?.toLowerCase().includes(searchTerm.toLowerCase()) || recipe.subtitle?.toLowerCase().includes(searchTerm.toLowerCase()));
            setFilteredRecipes(filtered);
        } else {
            setFilteredRecipes(favRecipes);
        }
    }, [searchTerm, favRecipes]);

    const displayedRecipes = searchTerm ? filteredRecipes : favRecipes;

    return (
        <div className="recipes">
            {displayedRecipes.map((recipe) => (
                <div className="recipe-body" key={recipe._id}>
                    <div className="recipe-content">
                        <h5>{recipe.title}</h5>
                        <p>{recipe.subtitle}</p>
                        <div className="more">
                            <Link className="show" to={`/recipes/${recipe.category.join(",")}/${recipe._id}`}>
                                <strong>See full recipe</strong>
                            </Link>
                        </div>
                        <div className="icons">
                            {userToken && (
                                <div onClick={() => handleFavToggle(recipe._id)}>
                                    <i className="fa-solid fa-bookmark" style={{ cursor: "pointer", padding: "10px", fontSize: "1.2em" }}></i>
                                </div>
                            )}
                            {recipe.user_id === userId && userToken && (
                                <Link to={`/edit-recipe/${recipe._id}`} style={{ color: "white" }}>
                                    <i style={{ cursor: "pointer", padding: "10px", fontSize: "1.2em" }} className="fa-solid fa-pen-to-square"></i>
                                </Link>
                            )}
                            {((userToken && recipe.user_id === userId) || isAdmin === true) && (
                                <i onClick={() => handleDeleteRecipe(recipe._id)} style={{ cursor: "pointer", padding: "10px", fontSize: "1.2em", color: "white" }} className="fa-solid fa-trash"></i>
                            )}
                        </div>
                    </div>
                    <div className="recipe-img-div">
                        <img src={recipe.image?.url} className="recipe-img" alt={recipe.image?.alt} />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SavedRecipes;
