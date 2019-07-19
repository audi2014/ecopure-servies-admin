import Cookies from 'js-cookie'
import {Config} from "../constants/Config";

const EXPIRES_IN_LONG = 60 * 30; //refresh session every 30 min
const EXPIRES_IN_SHORT = 60 * 5; //refresh session every 5 min

const DELETE_IN_LONG = 60 * 60 * 24 * 30; // need relogin if no request after 30 days
const DELETE_IN_SHORT = 60 * 35; // need relogin if no request after 35 min

// const TIME_MARGIN_SEC = 60;
const TIME_MARGIN_SEC = EXPIRES_IN_LONG;
const state = {
    jwt_token: null,
    refresh_token: null,
    created_at: null,
    expires_in: null,
    delete_in: null,
    location_ids: null,
};
const makeSessionConfig = (remember) => ({
    version: Config.VERSION,
    platform: 'web',
    push_token: null,
    expires_in: remember  // refresh session every
        ? EXPIRES_IN_LONG
        : EXPIRES_IN_SHORT
    ,
    delete_in: remember // need relogin if no request after
        ? DELETE_IN_LONG
        : DELETE_IN_SHORT
});

const isSessionValid = (data) => Object.keys(data).reduce((prev, k) => {
    return !!prev && !!data[k]
}, true);

const makeExpAt = ({created_at, expires_in}) => ((+created_at) + (+expires_in) - TIME_MARGIN_SEC) * 1000;
const makeDeleteAt = ({created_at, delete_in}) => ((+created_at) + (+delete_in) - TIME_MARGIN_SEC) * 1000;

Object.keys(state).map(k => {
    state[k] = Cookies.get(k) || null;
});

const saveSession = (data) => {
    if (isSessionValid(data)) {
        const expires = makeExpAt(data);
        Object.keys(state).map(k => {
            state[k] = data[k];
            Cookies.set(k, data[k], {expires})
        });
    }
};

const clearSession = () => {
    Object.keys(state).forEach(function (k) {
        Cookies.remove(k);
    });
};

const isRequireRefresh = () => {
    console.log('refresh after sec:', (makeExpAt(state) / 1000 - (new Date()).getTime() / 1000));
    return !isSessionValid(state) || makeExpAt(state) <= (new Date()).getTime();
};
const isRequireRelogin = () => {
    return !isSessionValid(state) || makeDeleteAt(state) <= (new Date()).getTime();
};

export const AuthController = {
    getSessionConfig: () => ({
        expires_in: state.expires_in,
        delete_in: state.delete_in,
        version: Config.VERSION,
        platform: 'web',
        push_token: null
    }),
    getToken: () => state.jwt_token,
    getRefreshToken: () => state.refresh_token,
    isRequireRefresh,
    isRequireRelogin,
    saveSession,
    clearSession,
    makeSessionConfig,
};