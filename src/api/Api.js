import {Config} from "../constants/Config";
// const mapResponse = p => p;
const mapResponse = r => r.json()
    .then(r => {
        if (r.error) {
            throw new Error(r.errorMsg)
        }
        return r.data;
    }).catch(e => alert(e));

const _get = path => fetch(Config.apiBaseUrl + path)
    .then(mapResponse);

const _delete = path => fetch(
    Config.apiBaseUrl + path,
    {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
        },
    })
    .then(mapResponse);


const _post = (path, data) => fetch(
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

const _put = (path, data) => fetch(
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

export const locations_GetAll = () => _get(`/locations?is_deleted=null`);
export const locations_GetById = (id) => _get(`/locations/${id}`);
export const locations_UpdateById = (id, data) => _put(`/locations/${id}`, data);
export const locations_InsertByData = (data) => _post(`/locations`, data);

export const locationsZipcode_GetByLocationId = (location_id) => _get(`/locations-zipcode?location_id=${location_id}`);
export const locationsZipcode_DeleteById = (id) => _delete(`/locations-zipcode/${id}`);
export const locationsZipcode_InsertByData = (data) => _post(`/locations-zipcode`, data);


export const buildingsLarge_GetAll = () => _get(`/buildings-large?is_deleted=null`);
export const buildingsLarge_GetById = (id) => _get(`/buildings-large/${id}`);
export const buildingsLarge_GetByLocationId = (location_id) => _get(`/buildings-large?location_id=${location_id}&is_deleted=null`);
export const buildings_UpdateById = (id, data) => _put(`/buildings/${id}`, data);
export const buildings_InsertByData = (data) => _post(`/buildings`, data);

export const outOfNetworkFootage_GetByLocationId = (location_id) => _get('/pricing/out-of-network/footage?location_id=' + location_id);
export const outOfNetworkFootage_InsertByData = (data) => _post('/pricing/out-of-network/footage', data);
export const outOfNetworkStairs_GetByLocationId = (location_id) => _get('/pricing/out-of-network/stairs?location_id=' + location_id);
export const outOfNetworkStairs_InsertByData = (data) => _post('/pricing/out-of-network/stairs', data);


export const inNetwork_GetByBuildingId = (building_id) => _get('/pricing/in-network?building_id=' + building_id);
export const inNetwork_InsertByData = (data) => _post('/pricing/in-network', data);
export const inNetwork_DeleteById = (id) => _delete('/pricing/in-network/'+id);


export const inNetworkExtraFootage_GetByLocationId = (location_id) => _get('/pricing/in-network-extra-footage?location_id=' + location_id);
export const inNetworkExtraFootage_InsertByData = (data) => _post('/pricing/in-network-extra-footage', data);
export const inNetworkExtraFootage_UpdateById = (id, data) => _put('/pricing/in-network-extra-footage/' + id, data);
export const inNetworkExtraFootage_DeleteById = (id) => _delete('/pricing/in-network-extra-footage/' + id);


export const addOn_GetByLocationId = (location_id) => _get('/pricing/add-on?location_id=' + location_id);
export const addOn_InserByData = (data) => _post('/pricing/add-on', data);


