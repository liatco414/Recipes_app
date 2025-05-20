import { useEffect, useState } from "react";
import { getAllCategories } from "../Service/categories";
import "../css/home.css";
import { Link } from "react-router-dom";
import { getRecipeByCategoryId } from "../Service/recipes";

function Home({ searchTerm }) {
    const [categories, setCategories] = useState([]);
    const [filterdRecipes, setFilteredRecipes] = useState("");

    useEffect(() => {
        getAllCategories()
            .then((response) => {
                setCategories(response);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        console.log(categories);

        if (searchTerm) {
            const filtered = categories.filter((category) => category.name?.toLowerCase().includes(searchTerm.toLowerCase()));
            setFilteredRecipes(filtered);
        } else {
            setFilteredRecipes(categories);
        }
    }, [searchTerm, categories]);

    const displayedCategories = searchTerm ? filterdRecipes.slice() : categories.slice();

    return (
        <>
            <div className="h1p">
                <h1>Categories</h1>
                <p>
                    Welcome to our recipe site! Here you'll find a wide variety of recipes to suit every taste. <br /> Simply click on any category to instantly explore delicious dishes that match
                    what you're looking for!
                </p>
            </div>
            <div className="categories">
                {displayedCategories.map((category) => (
                    <div className="category" key={category._id}>
                        <div className="category-image-wrapper">
                            <Link to={`/recipes/${category._id}`}>
                                <img src={category.image?.url} alt={category.image?.alt} className="category-image" />
                            </Link>
                        </div>
                        <div className="food">
                            <h4>{category.name}</h4>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Home;
