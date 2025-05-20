import { NavLink } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";

function LoggedInNavBar({ setShowLogOutModal, onSearchChange }) {
    const [userId, setUserId] = useState(null);
    const [isBlogger, setIsBlogger] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwtDecode(token);
            setUserId(decoded._id);
            setIsBlogger(decoded.isBlogger);
            setIsAdmin(decoded.isAdmin);
        }
    }, []);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        onSearchChange(event.target.value);
    };

    return (
        <>
            <nav
                className="navbar navbar-expand-lg bg-body-tertiary"
                style={{
                    width: "100%",
                    position: "fixed",
                    top: "0",
                    left: "0",
                    right: "0",
                    zIndex: "1000",
                    height: "80px",
                    boxShadow: "1px 1px 5px black",
                }}
            >
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">
                        <i className="fa-solid fa-house"></i>
                    </NavLink>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/about">
                                    About
                                </NavLink>
                            </li>
                            {(isBlogger === true || isAdmin === true) && (
                                <li className="nav-item">
                                    <NavLink className="nav-link active" aria-current="page" to="/saved-recipes">
                                        Saved Recipes
                                    </NavLink>
                                </li>
                            )}
                            {(isBlogger === true || isAdmin === true) && (
                                <li className="nav-item">
                                    <NavLink className="nav-link active" aria-current="page" to="/post-recipes">
                                        Post Recipe
                                    </NavLink>
                                </li>
                            )}
                        </ul>

                        <form className="d-flex" role="search">
                            <div className="input-group">
                                <input className="form-control" type="search" placeholder="Search" aria-label="Search" value={inputValue} onChange={handleInputChange} />
                                <span className="input-group-text">
                                    <button className="btn" type="submit">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </button>
                                </span>
                            </div>
                        </form>

                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Button style={{ color: "black", textDecoration: "none" }} variant="link" onClick={() => setShowLogOutModal(true)}>
                                    Log-Out
                                </Button>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to={`/profile/${userId}`}>
                                    <i className="fa-solid fa-user"></i>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default LoggedInNavBar;
