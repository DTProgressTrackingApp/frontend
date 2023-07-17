import React from "react";

import {logout} from "../../Service/AuthService.js";
import {useNavigate} from "react-router-dom";

export const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log("Handle logout!!");
        logout()
            .then((response) => {
                console.log("Logout RES: " + JSON.stringify(response))
                if (response.status == 200) {
                    localStorage.removeItem("token");
                    navigate("/");
                }
            }, (error) => {
                console.log("Logout ERROR: " + JSON.stringify(error))
                alert("Logout error");
            });
    }

    return (
        <button className="logout" onClick={() => handleLogout()}><span>Logout</span></button>
    );
}