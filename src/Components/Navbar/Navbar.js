import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import ProfileCard from "../ProfileCard/ProfileCard"; // Import ProfileCard

const Navbar = () => {
    const [click, setClick] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [showProfileCard, setShowProfileCard] = useState(false); // State for ProfileCard visibility
    const navigate = useNavigate();

    const handleClick = () => setClick(!click);

    const handleLogout = () => {
        sessionStorage.removeItem("auth-token");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("phone");
        localStorage.removeItem("doctorData");
        setIsLoggedIn(false);
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith("reviewFormData_")) {
                localStorage.removeItem(key);
            }
        }
        setEmail('');
        navigate("/");
        window.location.reload();
    }

    const handleProfileIconClick = () => {
        setShowProfileCard(!showProfileCard);
    }

    useEffect(() => {
        const storedEmail = sessionStorage.getItem("email");
        if (storedEmail) {
            setIsLoggedIn(true);
            setEmail(storedEmail);
            const name = storedEmail.split('@')[0];
            setUsername(name);
        }
    }, []);

    return (
        <nav>
            <div className="nav__logo">
                <Link to="/">StayHealthy <i style={{color:'#2190FF'}} className="fa fa-user-md"></i></Link>
                <span>.</span>
            </div>
            <div className="nav__icon" onClick={handleClick}>
                <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
            </div>
            <ul className={click ? 'nav__links active' : 'nav__links'}>
                <li className="link">
                    <Link to="/">Home</Link>
                </li>
                <li className="link">
                    <Link to="/searchdoctors">Appointments</Link>
                </li>
                <li className="link">
                    <Link to="/healthblog">Health Blog</Link>
                </li>
                <li className="link">
                    <Link to="/reviews">Reviews</Link>
                </li>
                <li className="link">
                    <Link to="/instant-consultation">Instant Consultation</Link>
                </li>
                {isLoggedIn ? (
                    <div className="profile-container">
                        <li className="link" onClick={handleProfileIconClick}>
                            <i className="fa fa-user-circle"></i>
                        </li>
                        <li className="link" onClick={handleProfileIconClick}>
                            <span className="username">{"Welcome, " + username}</span>
                        </li>
                        <li className="link">
                            <button className="btn2" onClick={handleLogout}>Logout</button>
                        </li>
                        {showProfileCard && (
                            <ProfileCard
                                isOpen={showProfileCard}
                                onClose={() => setShowProfileCard(false)}
                            />
                        )}
                    </div>
                ) : (
                    <>
                        <li className="link">
                            <Link to="/signup">
                                <button className="btn1">Sign Up</button>
                            </Link>
                        </li>
                        <li className="link">
                            <Link to="/login">
                                <button className="btn1">Login</button>
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;