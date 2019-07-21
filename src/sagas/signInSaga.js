import { put, takeLatest, call } from 'redux-saga/effects';
import {
    FETCH_TOKEN,
    TOKEN,
    TOKEN_FAILED,
    SET_USER_ID,
    LOGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    REFERRAL_TOKEN,
    REFERRAL_TOKEN_SUCCESS, REFERRAL_TOKEN_ERROR
} from '../actions/types';
import { loginUser, getReferralCode } from "../services/userService";

function getToken(data) {
    //TODO: Add logic to get jwt token using username and password
    return { token: 'fakeToken', userId: 'fakeUserId' };
}

function* setToken(action) {
    console.log('test');
    try {
        // const response = yield call(getToken, action);
        localStorage.setItem("userId", 'fakeUserId');
        localStorage.setItem("token", 'fakeToken');
        // yield put({ type: SET_USER_ID, response.userId });
        // yield put({ type: TOKEN, response.token });
    }
    catch(error) {
        console.error(error);
        yield put({ type: TOKEN_FAILED, error });
    }
}

export function* getTokenSaga() {
    yield takeLatest(FETCH_TOKEN, setToken)
}

function* login(request) {
    try {
        const response = yield call(loginUser, request.user);
        yield put({ type: LOGIN_USER_SUCCESS, response, request: request.user });
    } catch(error) {
        yield put({ type: LOGIN_USER_ERROR, error })
    }
}

export function* loginSaga() {
    yield takeLatest(LOGIN, login);
}

function* referralToken(request) {
    try{
        const ref_code = yield call(getReferralCode, request.username);
        yield put({ type: REFERRAL_TOKEN_SUCCESS, ref_code });
    } catch(error) {
        yield put({ type: REFERRAL_TOKEN_ERROR, error })
    }
}

export function* referralTokenSaga() {
    yield takeLatest(REFERRAL_TOKEN, referralToken);
}
