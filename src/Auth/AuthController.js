import Cookies from 'js-cookie'
import {Config} from "../constants/Config";
import React from "react";

const EXPIRES_IN_LONG = 60 * 30; //refresh session every 30 min
const EXPIRES_IN_SHORT = 60 * 5; //refresh session every 5 min

const DELETE_IN_LONG = 60 * 60 * 24 * 30; // need relogin if no request after 30 days
const DELETE_IN_SHORT = 60 * 35; // need relogin if no request after 35 min

const TIME_MARGIN_SEC = 60;
// const TIME_MARGIN_SEC = EXPIRES_IN_LONG;

const subscribers = {
    array: []
};

//


const state = {
    jwt_token: null,
    refresh_token: null,
    created_at: null,
    expires_in: null,
    delete_in: null,
    location_ids: null,
    access_type: null,
    email_invite: null,
    manager_id: null,
};
const reqiredKeys = [
    'jwt_token',
    'refresh_token',
    'created_at',
    'expires_in',
    'delete_in',
    'manager_id',
];
const jsonKeys = [
    'location_ids',
];
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

const isSessionValid = (data) => reqiredKeys.reduce((prev, k) => {
    return !!prev && !!data[k]
}, true);

const makeExpAt = ({created_at, expires_in}) => ((+created_at) + (+expires_in) - TIME_MARGIN_SEC) * 1000;
const makeDeleteAt = ({created_at, delete_in}) => ((+created_at) + (+delete_in) - TIME_MARGIN_SEC) * 1000;

Object.keys(state).map(k => {
    if (jsonKeys.includes(k)) {
        state[k] = Cookies.getJSON(k) || null;
    } else {
        state[k] = Cookies.get(k) || null;
    }
});

const saveSession = (data) => {
    if (isSessionValid(data)) {
        const expires = makeExpAt(data);
        Object.keys(state).map(k => {
            state[k] = data[k];
            Cookies.set(k, data[k], {expires, path: Config.COOKIE_PATH})
        });

        subscribers.array.forEach(cb => {
            cb(state);
        })
    }
};

const clearSession = () => {
    Object.keys(state).forEach(function (k) {
        Cookies.remove(k, {path: Config.COOKIE_PATH});
        state[k] = null;
    });
    subscribers.array.forEach(cb => {
        cb(state);
    })
};

// const useAuthController =

const isRequireRefresh = () => {
    return !isSessionValid(state) || makeExpAt(state) <= (new Date()).getTime();
};
const isRequireRelogin = () => {
    return !isSessionValid(state) || makeDeleteAt(state) <= (new Date()).getTime();
};

export const AuthController = {
    popLoginRedirectUrl: () => {
        const url = Cookies.get('LOGIN_REDIRECT_URL');
        Cookies.remove('LOGIN_REDIRECT_URL');
        return url ? url : '/'
    },
    setLoginRedirectUrl: (url) => {
        if (url === '/manager-access') {
            url = '/'
        }
        Cookies.set('LOGIN_REDIRECT_URL', url, {path: Config.COOKIE_PATH});
    },
    getSessionConfig: () => ({
        expires_in: state.expires_in,
        delete_in: state.delete_in,
        version: Config.VERSION,
        platform: 'web',
        push_token: null
    }),
    getLocationAccessIds: () => {
        return Array.isArray(state.location_ids) ? state.location_ids : [];
    },
    haveLocationAccess: (id) =>
        state.access_type === 'admin'
        || (
            Array.isArray(state.location_ids)
            && state.location_ids.includes(+id)
        ),
    haveAdminAccess: () => state.access_type === 'admin',
    getToken: () => state.jwt_token,
    getRefreshToken: () => state.refresh_token,
    getEmail: () => state.email_invite,
    getManagerId: () => state.manager_id,
    isRequireRefresh,
    isRequireRelogin,
    saveSession,
    clearSession,
    makeSessionConfig,
};
/**
 *
 * @return AuthController
 */
export const useAuthEffect = () => {
    const [auth, setAuth] = React.useState(AuthController);
    React.useEffect(() => {
        function handleChange(data) {
            setAuth({...AuthController});
        }

        subscribers.array.push(handleChange);
        return function cleanup() {
            subscribers.array = subscribers.array.filter(cb => cb !== handleChange);
            console.log('cleanup', [...subscribers.array]);
        };
    }, []);
    return auth;
};

