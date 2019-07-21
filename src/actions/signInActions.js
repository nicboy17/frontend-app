import  {  FETCH_TOKEN, LOGOUT, RESET, LOGIN, REFERRAL_TOKEN } from '../actions/types';

export const fetchToken  = (payload) => ({
      type: FETCH_TOKEN,
      payload
});

export const logoutUser = () => ({
    type: LOGOUT
});

export const clearStore = () => ({
    type: RESET
});

export const loginUser = (user) => ({
   type: LOGIN,
    user
});

export const getReferralToken = (username) => ({
   type: REFERRAL_TOKEN,
    username
});
