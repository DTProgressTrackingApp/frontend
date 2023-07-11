import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

export const login = (email, password) => {
    const response = {
        "data": {
            "accessToken": "12344535",
            "success" : true,
            "role": "MANAGER"
        }
    };
    return response.data;
    // return axios
    //     .post(API_URL + "login", { email, password })
    //     .then((response) => {
    //         console.log("Response Login: " + JSON.stringify(response));
    //         if (response.status !== 200) {
    //             console.log("Login fail.");
    //             return;
    //         }
    //         if (response.data.accessToken) {
    //             localStorage.setItem("user", JSON.stringify(response.data));
    //         }
    //         return response.data;
    //     }, (error) => {
    //         console.log("Response Error: " + JSON.stringify(error));
    //     });
}

export const logout = () => {
    localStorage.removeItem("user");
}

export const authHeader = () => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.accessToken) {
        return { Authorization: "Bearer " + user.accessToken };
    } else {
        return {};
    }
}

