import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.js";
import "./components/css/global.css";
import Feed from "./components/feed/Feed.tsx";
import Login from "./components/userAuth/Login.tsx";
import Register from "./components/userAuth/Register.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import EditProfile from "./components/profile/EditProfile.tsx";
import Search from "./components/search/Search.tsx";
import Navbar from "./components/Navbar.tsx";
import React from "react";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        element: <Navbar />,
        path: "/",
        children: [
            {
                path: "/",
                element: <Feed />,
            },
            {
                path: "/profile",
                element: <EditProfile />,
            },
            {
                path: "/search",
                element: <Search />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <GoogleOAuthProvider clientId="378937528478-jvk6no06q3cvmem7ram6vagbmis1amlf.apps.googleusercontent.com">
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    </GoogleOAuthProvider>
);