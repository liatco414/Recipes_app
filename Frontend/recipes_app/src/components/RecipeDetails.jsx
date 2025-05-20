import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteComment, getRecipeById } from "../Service/recipes";
import "../css/recipeDetails.css";
import { GetCommentsByRecipeId } from "../Service/recipes";
import "../css/reviews.css";
import { jwtDecode } from "jwt-decode";
import { successMsg } from "../Service/feedbackService";

function RecipeDetails({ openCommentModal }) {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [user_id, setUser_id] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decode = jwtDecode(token);
            setUser_id(decode._id);
            setIsAdmin(decode.isAdmin);
        }
    }, []);

    useEffect(() => {
        getRecipeById(recipeId)
            .then((res) => {
                setRecipe(res);
                console.log(res);
            })
            .catch((err) => console.log(err));
    }, [recipeId]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await GetCommentsByRecipeId(recipeId);
                setReviews(response);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching comments: ", error);
                setLoading(false);
            }
        };
        fetchComments();
    }, [recipeId]);

    if (loading) {
        return <div className="loader">Loading...</div>;
    }

    const handleDeleteComment = (commentId) => {
        deleteComment(recipeId, commentId).then((response) => {
            setReviews((prevReview) => prevReview.filter((comment) => comment._id != commentId));
            successMsg("Comment deleted successfully");
        });
    };

    return (
        <>
            {recipe ? (
                <div className="" key={recipe._id}>
                    <div className="recipeBody">
                        <div className="recipeImg">
                            <img src={recipe.image?.url} alt={recipe.image?.alt} />
                        </div>
                        <div className="recipeContent">
                            <div className="headlines">
                                <h1>{recipe.title}</h1>
                                <h4>{recipe.subtitle}</h4>
                            </div>
                            <div className="line"></div>
                            <div className="content">
                                <p>
                                    <strong>Ingredients:</strong> <br /> {recipe.recipeContent?.ingredients}
                                </p>
                                <div className="line"></div>
                                <p>
                                    <strong>Instructions:</strong> <br /> {recipe.recipeContent?.instructions}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>loading</p>
            )}
            <div className="reviews-container">
                <div className="plus">
                    <i onClick={() => openCommentModal(recipeId)} title="Add a review" className="fa-regular fa-square-plus"></i>
                </div>
                <h3>Reviews</h3>

                <div className="reviews-list">
                    {reviews.map((review) => (
                        <div className="review-item" key={review._id}>
                            <div className="review-header">
                                <span className="review-username">{review.username}</span>
                                <span className="review-date">{new Date(review.date).toLocaleDateString()}</span>
                            </div>
                            <p className="review-comment">{review.comment}</p>
                            <div className="trash-icon">
                                {(review.userId._id === user_id || isAdmin === true) && (
                                    <p>
                                        <i onClick={() => handleDeleteComment(review._id)} className="fa-solid fa-trash"></i>
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default RecipeDetails;
