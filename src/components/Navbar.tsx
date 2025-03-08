import React, { useState } from "react";
import { logout } from "../services/user-service";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [expanded, setExpanded] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const closeNavbar = () => {
        if (expanded) setExpanded(false);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
                <div className="container">
                    <Link to="/" className="navbar-brand d-flex align-items-center" onClick={closeNavbar}>
                        <span className="fw-bold">ShowIt</span>
                    </Link>

                    <button
                        className="navbar-toggler border-0"
                        type="button"
                        onClick={() => setExpanded(!expanded)}
                        aria-controls="navbarContent"
                        aria-expanded={expanded}
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className={`collapse navbar-collapse ${expanded ? 'show' : ''}`} id="navbarContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item mx-lg-2">
                                <Link
                                    to="/"
                                    className={`nav-link px-3 py-2 rounded-pill ${
                                        location.pathname === "/" ? "active bg-light fw-medium" : ""
                                    }`}
                                    onClick={closeNavbar}
                                >
                                    <i className="bi bi-house-door me-1"></i> Home
                                </Link>
                            </li>
                            <li className="nav-item mx-lg-2">
                                <Link
                                    to="/search"
                                    className={`nav-link px-3 py-2 rounded-pill ${
                                        location.pathname === "/search" ? "active bg-light fw-medium" : ""
                                    }`}
                                    onClick={closeNavbar}
                                >
                                    <i className="bi bi-search me-1"></i> Search
                                </Link>
                            </li>
                            <li className="nav-item mx-lg-2">
                                <Link
                                    to="/profile"
                                    className={`nav-link px-3 py-2 rounded-pill ${
                                        location.pathname === "/profile" ? "active bg-light fw-medium" : ""
                                    }`}
                                    onClick={closeNavbar}
                                >
                                    <i className="bi bi-person me-1"></i> My Profile
                                </Link>
                            </li>
                            <li className="nav-item mx-lg-2">
                                <Link
                                    to="/myreviews"
                                    className={`nav-link px-3 py-2 rounded-pill ${
                                        location.pathname === "/myreviews" ? "active bg-light fw-medium" : ""
                                    }`}
                                    onClick={closeNavbar}
                                >
                                    <i className="bi bi-star me-1"></i> My Reviews
                                </Link>
                            </li>
                        </ul>

                        <div className="d-flex">
                            <button
                                className="btn btn-outline-danger rounded-pill px-3 py-2"
                                type="button"
                                onClick={handleLogout}
                            >
                                <i className="bi bi-box-arrow-right me-1"></i> Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    );
};

export default Navbar;