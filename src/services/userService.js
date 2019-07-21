import axios from "axios";
import * as jwt from "jsonwebtoken";
const url = "http://165.227.42.25";

export const loginUser = (request) => {
    const LOGIN_API_ENDPOINT = url + '/frontend/login';

     return axios.post(LOGIN_API_ENDPOINT, request).then(res =>{
         return res;
    });
};

export const logoutUser = () => {
    //localStorage.removeItem('userId');
    alert('Session has ended.');
    localStorage.removeItem('token');
    window.location.reload();
};

export const registerUser = (request) => {
    const REGISTER_API_ENDPOINT = url + '/frontend/signup';

    return axios.post(REGISTER_API_ENDPOINT, request).then(res => {
        return res;
    });
};

export const resetPassword = (request) => {
    const RESET_PASSWORD_API_ENDPOINT = url + '/frontend/reset_password';

    return axios.post(RESET_PASSWORD_API_ENDPOINT, request).then(res => {
        return res;
    });
};

export const getReferralCode = (username) => {
    const REFERRAL_CODE_PASSWORD_API_ENDPOINT = url + '/frontend/user_data/'+ username;

    return axios.get(REFERRAL_CODE_PASSWORD_API_ENDPOINT).then(res => {
        return res.data.ref_code;
    });
};

export const setToken = (user) => {
    //test with - { expiresIn: 5 }
    const token = jwt.sign({ user }, 'secretkey', { expiresIn: '1 hr' });
    localStorage.setItem('token', token);
    return token;
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const timeRemaining = (token='') => {
    if(!token) {
        token = getToken();
    }

    if(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        const expireTime = JSON.parse(atob(base64));
        const timeStamp = Math.floor(Date.now() / 1000);
        return expireTime.exp - timeStamp;
    }

    return 0;
};