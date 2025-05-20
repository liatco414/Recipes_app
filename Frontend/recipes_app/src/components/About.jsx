import React from "react";
import "../css/about.css";

function About() {
    return (
        <div className="about-container" style={{ marginTop: "130px", maxWidth: "800px" }}>
            <h2>🍽️ About the Website</h2>
            <p>Welcome to our recipe blogging platform — a vibrant space designed for food lovers, home cooks, and culinary creatives to connect, share, and explore.</p>

            <h4>👨‍🍳 Blogger Users Can:</h4>
            <ul>
                <li>Create and publish their own recipes</li>
                <li>Categorize recipes into existing categories</li>
                <li>Edit, update, or delete their recipes</li>
                <li>Comment on recipes shared by others</li>
            </ul>

            <h4>👥 Regular Users Can:</h4>
            <ul>
                <li>Save their favorite recipes for easy access</li>
                <li>Leave comments and feedback on any recipe</li>
            </ul>

            <h4>🛠️ Admins Can:</h4>
            <ul>
                <li>
                    Edit or delete <strong>any</strong> recipe on the platform
                </li>
                <li>Moderate content to ensure a high-quality experience</li>
            </ul>

            <h4>🎯 Our Mission</h4>
            <p>
                Our goal is to bring together people who love food — whether cooking it, eating it, or sharing it. We aim to build a friendly community where users can discover diverse recipes, get
                inspired, and even form virtual friendships with others who share the same passion for cooking and creativity in the kitchen.
            </p>
        </div>
    );
}

export default About;
