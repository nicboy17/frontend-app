import { put, takeLatest, call, select } from 'redux-saga/effects';
import {
    FETCH_TOKEN,
    TOKEN,
    TOKEN_FAILED,
    SET_USER_ID,
    LOGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    REFERRAL_TOKEN,
    REFERRAL_TOKEN_SUCCESS, REFERRAL_TOKEN_ERROR, LOGOUT, CHECK_TOKEN
} from '../actions/types';
import {loginUser, logoutUser, getReferralCode, setToken, timeRemaining} from "../services/userService";
import {timer as observableTimer} from "rxjs";
const getUserStore = (state) => state.UserStore;

function* newToken(action) {
    try {
        const token = yield call(setToken, action.payload);
        yield put({ type: TOKEN, token });
    }
    catch(error) {
        console.error(error);
        yield put({ type: TOKEN_FAILED, error });
    }
}

export function* setTokenSaga() {
    yield takeLatest(FETCH_TOKEN, newToken)
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

function* logout(request) {
    yield call(logoutUser, request);
}

export function* logoutSaga() {
    yield takeLatest(LOGOUT, logout)
}

function* referralToken() {
    let UserStore = yield select(getUserStore);
    try{
        const ref_code = yield call(getReferralCode, UserStore.user.username);
        yield put({ type: REFERRAL_TOKEN_SUCCESS, ref_code });
    } catch(error) {
        yield put({ type: REFERRAL_TOKEN_ERROR, error })
    }
}

export function* referralTokenSaga() {
    yield takeLatest(REFERRAL_TOKEN, referralToken);
}

function* checkToken() {
    let UserStore = yield select(getUserStore);
    const time = yield call(timeRemaining, UserStore.token);
    if(time > 0) {
        let timer = observableTimer(time*1000);
        timer.subscribe(i => {
            logoutUser();
        });
    }
}

export function* checkTokenSaga() {
    yield takeLatest(CHECK_TOKEN, checkToken)
}
