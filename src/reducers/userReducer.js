import {
    TOKEN,
    LOGOUT,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR
} from '../actions/types';

const initialState = {
    authenticated: false,
};

export default function userReducer (state = initialState, action) {
    let newState = state;
    let response = action.response;

    switch (action.type) {
        case TOKEN:
            newState = Object.assign({}, state, {authenticated: true});
            return newState;
        case LOGOUT:
            localStorage.removeItem('userId');
            localStorage.removeItem('token');
            return state;
        case LOGIN_USER_SUCCESS:
            return { ...state, response };
        case LOGIN_USER_ERROR:
            return { ...state, response };
        default:
            return state;
    }
}
