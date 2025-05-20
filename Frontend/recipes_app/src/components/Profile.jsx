import { useEffect, useState } from "react";
import { getUserById } from "../Service/users";
import { Link, useParams } from "react-router-dom";
import "../css/profile.css";

function UserProfile() {
    const [userProfile, setUserProfile] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        getUserById(id)
            .then((response) => setUserProfile(response))
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className="profile">
            <h1 style={{ paddingTop: "80px" }}>User Profile</h1>

            {!userProfile ? (
                <p>Loading profile...</p>
            ) : (
                <div className="dets">
                    <div className="row1">
                        <div className="userImage">
                            <img className="pp" src={userProfile.image?.url} alt={userProfile.image?.alt} />
                            <p>
                                {userProfile.name?.first} {userProfile.name?.last}
                            </p>
                        </div>
                    </div>

                    <div className="row3">
                        <div className="title">
                            <p>Phone:</p>
                            <div className="content">
                                <p>{userProfile.phone}</p>
                            </div>
                        </div>
                    </div>

                    <div className="row4">
                        <p>email</p>
                    </div>

                    <div className="row5">
                        <div className="title">
                            <p>Email Address</p>
                            <div className="content">
                                <p>{userProfile.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserProfile;
