import {Config} from "../../constants/Config";
import {AuthController} from "../../Auth/AuthController";

const buffer = {
    pendingRequestWithRefreshRefresh: null,
    pendingRequestsData: [],
};

export const _auth = (path, data) => fetch(
    Config.LOCATIONS_API_URL + path,
    {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(saveAuthorizationResponse);

const fetchWithRefreshSession = (url, cfg) => _auth(
    '/auth/refresh',
    {
        ...AuthController.getSessionConfig(),
        token: AuthController.getRefreshToken()
    })
    .then(() => Promise.all(buffer.pendingRequestsData.map(args => {
        return fetch(args[0], mapAuthorizedFetchCfg(args[1])).then(r => {
            console.log('after refresh', args[0]);
            return args[2](r);
        });
    })))
    .then(() => {
        buffer.pendingRequestsData = [];
        buffer.pendingRequestWithRefreshRefresh = null;
        return fetch(url, mapAuthorizedFetchCfg(cfg))
    }).catch(e => {
        // AuthController.clearSession();
        // alert('Failed to reload session. Try relogin');
        // window.location.reload();
        throw new Error("Failed to reload session. Try relogin")
    });


const mapAuthorizedResponse = res => {
    if (res.ok) {
        return res.json().then(json => {
            if (json.error && json.errorCode === 401) {
                AuthController.clearSession();
                const authError = new Error(json.errorMsg);
                authError.code = json.errorCode;
                throw authError;
            }
            if (json.error) {
                throw new Error(json.errorMsg)
            }
            return json.data;
        });

    } else {
        throw new Error(res.statusText)
    }
};

const saveAuthorizationResponse = res => {
    if (res.status < 500) {
        return res.json().then(
            json => {
                if (res.ok) {
                    AuthController.saveSession(json);
                    return json;
                } else {
                    const authError = new Error(json.message);
                    authError.code = json.code;
                    throw authError;
                }

            })
    } else {
        throw new Error(res.statusText)
    }
};

const mapAuthorizedFetchCfg = cfg => {
    if (!cfg) cfg = {};
    if (!cfg.headers) cfg.headers = {};
    cfg.headers['Authorization'] = `Bearer ${AuthController.getToken()}`;
    // console.log('AuthorizationToken: Bearer ', AuthController.getToken());
    return cfg;
};


const fetchAuthRequest = (url, cfg) => {
    if (AuthController.isRequireRelogin()) {
        AuthController.clearSession();
        const authError = new Error("Please relogin");
        authError.code = 401;
        throw authError;
    } else if (AuthController.isRequireRefresh()) {
        if (!buffer.pendingRequestWithRefreshRefresh) {
            buffer.pendingRequestWithRefreshRefresh = fetchWithRefreshSession(url, cfg);
            return buffer.pendingRequestWithRefreshRefresh;
        } else {
            return new Promise(resolve => {
                buffer.pendingRequestsData.push([url, cfg, resolve])
            });
        }
    } else {
        return fetch(url, mapAuthorizedFetchCfg(cfg));
    }
};


export const _get = path => fetch(Config.LOCATIONS_API_URL + path)
    .then(mapAuthorizedResponse)
    .then(data => {
        if (data === null) {
            throw new Error(`Resource "${path}" not found`);
        }
        return data;
    });

export const _delete = path => fetchAuthRequest(
    Config.LOCATIONS_API_URL + path,
    {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
        },
    })
    .then(mapAuthorizedResponse);


export const _post = (path, data) => fetchAuthRequest(
    Config.LOCATIONS_API_URL + path,
    {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(mapAuthorizedResponse);

export const _put = (path, data) => fetchAuthRequest(
    Config.LOCATIONS_API_URL + path,
    {
        method: 'put',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: Object.keys(data)
            .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&')
    })
    .then(mapAuthorizedResponse);




