import {
    TOKEN,
    LOGOUT,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    REFERRAL_TOKEN_SUCCESS
} from '../actions/types';

const initialState = {
    authenticated: false,
};

export default function userReducer (state = initialState, action) {
    let newState = state;

    switch (action.type) {
        case TOKEN:
            newState = Object.assign({}, state, {authenticated: true});
            return newState;
        case LOGOUT:
            localStorage.removeItem('userId');
            localStorage.removeItem('token');
            return state;
        case LOGIN_USER_SUCCESS:
            return { ...state, response: action.response.data, user: action.request };
        case LOGIN_USER_ERROR:
            return { ...state, response: action.response.data };
        case REFERRAL_TOKEN_SUCCESS:
            return { ...state, ref_code: action.ref_code };
        default:
            return state;
    }
}
