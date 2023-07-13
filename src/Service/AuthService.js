import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/auth/";

export const login = (email, password) => {
    return axios
        .post(API_URL + "login", { email, password })
        .then((response) => {
            return response;
        }, (error) => {
            throw error;
        });
}

export const logout = () => {
    localStorage.removeItem("token");
}

export const authHeader = () => {

    const user = JSON.parse(localStorage.getItem("token"));

    if (user && user.token) {
        return { Authorization: "Bearer " + user.token };
    } else {
        return {};
    }
}

