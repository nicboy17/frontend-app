import axios from "axios";
const url = "http://165.227.42.25";

export const loginUser = (request) => {
    const LOGIN_API_ENDPOINT = url + '/frontend/login';

     return axios.post(LOGIN_API_ENDPOINT, request).then(res =>{
         return res;
    });
};