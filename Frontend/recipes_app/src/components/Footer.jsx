import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../css/footer.css";

function Footer() {
    let connected = localStorage.getItem("token");
    let userId;
    if (connected) {
        let decoded = jwtDecode(connected);
        userId = decoded._id;
    }
    return (
        <>
            <div className="footer">
                <div className="footer-icons">
                    <div className="footer-icon">
                        <Link className="link" to="/about">
                            <i className="fa-solid fa-circle-exclamation" style={{ fontSize: "1.4em" }}></i>
                            <p>About</p>
                        </Link>
                    </div>
                    <div className="footer-icon">
                        <Link className="link" to="mailto:liat667788@gmail.com">
                            <i className="fa-solid fa-envelope" style={{ fontSize: "1.4em" }}></i>
                            <p>Contact Us</p>
                        </Link>
                    </div>
                    {connected ? (
                        <>
                            <div className="footer-icon">
                                <Link className="link" to={`/profile/${userId}`}>
                                    <i className="fa-solid fa-id-card" style={{ fontSize: "1.4em" }}></i>
                                    <p>Profile</p>
                                </Link>
                            </div>
                            <div className="footer-icon">
                                <Link className="link" to="/saved-recipes">
                                    <i className="fa-solid fa-thumbs-up" style={{ fontSize: "1.4em" }}></i> <p>My Favorites</p>
                                </Link>
                            </div>
                        </>
                    ) : null}
                </div>
            </div>
        </>
    );
}

export default Footer;
