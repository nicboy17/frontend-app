import axios from "axios";
const url = "http://165.227.42.25";

export const loginUser = (request) => {
    const LOGIN_API_ENDPOINT = url + '/frontend/login';

     return axios.post(LOGIN_API_ENDPOINT, request).then(res =>{
         return res;
    });
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