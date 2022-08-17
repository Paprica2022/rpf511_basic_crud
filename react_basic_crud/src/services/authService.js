import axios from "axios";

import { API_URL } from "../_variablesURL";

const postJoin = (name,username, email, password,passwordCheck,location) => {
    return axios.post(API_URL + "/join", {
        name,
        username, 
        email, 
        password,
        passwordCheck,
        location
    });
};

const postLogin = async (username, password) => {
    const response = await axios.post(API_URL + "/login", {
        username,
        password,
    });
    console.log(response);
    if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
        
    }
    return response;
    
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const getCurrentToken = () => {
    return JSON.parse(localStorage.getItem("user")).accessToken;
}

const AuthService = {
    postJoin,
    postLogin,
    logout,
    getCurrentUser,
    getCurrentToken
};

export default AuthService;
