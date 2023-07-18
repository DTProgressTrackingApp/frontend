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
    return axios
        .post(API_URL + "logout", null, authHeader())
        .then((response) => {
            return response;
        }, (error) => {
            throw error;
        });
}

export const authToken = () => {
    return axios
        .get(API_URL + "health", authHeader())
        .then((response) => {
            if (response.status != 200) {
                return false;
            }
            return true;
        }, (error) => {
            console.log("Error auth token: " + JSON.stringify(error));
            alert("Error auth token");
            return false;
        });
}

const authHeader = () => {
    const token = localStorage.getItem("token");

    if (token) {
        return  {
            headers: {
                Authorization: "Bearer " + token
            }
        };
    } else {
        return {};
    }
}

