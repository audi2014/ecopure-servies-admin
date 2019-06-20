import {Config} from "../../constants/Config";
const mapResponse = r => r.json()
    .then(r => {
        if (r.error) {
            throw new Error(r.errorMsg)
        }
        return r.data;
    });

export const _get = path => fetch(Config.apiBaseUrl + path)
    .then(mapResponse);

export const _delete = path => fetch(
    Config.apiBaseUrl + path,
    {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
        },
    })
    .then(mapResponse);


export const _post = (path, data) => fetch(
    Config.apiBaseUrl + path,
    {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(mapResponse);

export const _put = (path, data) => fetch(
    Config.apiBaseUrl + path,
    {
        method: 'put',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: Object.keys(data)
            .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&')
    })
    .then(mapResponse);




