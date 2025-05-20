import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Recipes from "./components/Recipes";
import RecipeDetails from "./components/RecipeDetails";
import Login from "./components/Login";
import LoggedInNavBar from "./components/loggedInNavBar";
import SavedRecipes from "./components/SavedRecipes";
import LogOutModal from "./components/LogoutModal";
import Register from "./components/Register";
import PostRecipe from "./components/PostRecipe";
import UserProfile from "./components/Profile";
import EditRecipe from "./components/EditRecipe";
import { successMsg } from "./Service/feedbackService";
import { ToastContainer } from "react-toastify";
import Comments from "./components/CommentsModal";
import About from "./components/About";
import Footer from "./components/Footer";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLogOutModal, setShowLogOutModal] = useState(false);
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [selectedRecipeId, setSelectedRecipeId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (term) => {
        setSearchTerm(term);
    };

    const nav = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleLogOutModal = () => {
        setShowLogOutModal(!showLogOutModal);
    };

    const handleUserLogOut = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("token");
        setShowLogOutModal(false);
        successMsg("User logged out successfully");
        nav("/");
    };
    const openCommentModal = (recipeId) => {
        setSelectedRecipeId(recipeId);
        setShowCommentModal(true);
    };

    const closeCommentModal = () => {
        setShowCommentModal(false);
        setSelectedRecipeId(null);
    };

    function isTokenExpired(token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const expiry = payload.exp;
        const now = Math.floor(Date.now() / 1000);
        return now > expiry;
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && !isTokenExpired(token)) {
            const { exp } = JSON.parse(atob(token.split(".")[1]));
            const expiryTime = exp * 1000 - Date.now();

            const timeout = setTimeout(() => {
                alert("Your session has expired. Please log in again to continue.");
                localStorage.removeItem("token");
                setIsLoggedIn(false);
                nav("/login");
            }, expiryTime);

            return () => clearTimeout(timeout);
        }
    }, []);

    return (
        <>
            <ToastContainer />
            {!isLoggedIn ? (
                <>
                    <NavBar onSearchChange={handleSearchChange} />
                    <Routes>
                        <Route path="/" element={<Home />} searchTerm={searchTerm} />
                        <Route path="recipes/:categoryId/" element={<Recipes isLoggedIn={isLoggedIn} searchTerm={searchTerm} />} />
                        <Route path="recipes/:categoryId/:recipeId" element={<RecipeDetails />} />
                        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                    <Footer />
                </>
            ) : (
                <>
                    <LoggedInNavBar setShowLogOutModal={handleLogOutModal} onSearchChange={handleSearchChange} />
                    <Routes>
                        <Route path="/" element={<Home searchTerm={searchTerm} />} />
                        <Route path="/saved-recipes" element={<SavedRecipes searchTerm={searchTerm} />} />
                        <Route path="/recipes/:categoryId/" element={<Recipes isLoggedIn={isLoggedIn} searchTerm={searchTerm} />} />
                        <Route path="/post-recipes" element={<PostRecipe />} />
                        <Route path="/recipes/:categoryId/:recipeId" element={<RecipeDetails openCommentModal={openCommentModal} />} />
                        <Route path="/profile/:id" element={<UserProfile />} />
                        <Route path="/edit-recipe/:recipeId" element={<EditRecipe />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                    <Footer />
                </>
            )}
            <LogOutModal show={showLogOutModal} onHide={handleLogOutModal} handleLogOut={handleUserLogOut} />
            <Comments show={showCommentModal} onHide={closeCommentModal} recipeId={selectedRecipeId} />
        </>
    );
}

export default App;
