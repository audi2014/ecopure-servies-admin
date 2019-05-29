import {Config} from "../constants/Config";


const get = path => fetch(Config.apiBaseUrl + path)
    .then(r => r.json())
    .then(r => {
        if (r.error) {
            throw new Error(r.errorMsg)
        }
        return r.data;
    }).catch(e => alert(e));

const post = (path, data) => fetch(
    Config.apiBaseUrl + path,
    {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(r => r.json())
    .then(r => {
        if (r.error) {
            throw new Error(r.errorMsg)
        }
        return r.data;
    }).catch(e => alert(e));
const put = (path, data) => {
    const searchParams = Object.keys(data).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
    }).join('&');
    return fetch(
        Config.apiBaseUrl + path,
        {
            method: 'put',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: searchParams
        })
        .then(r => r.json())
        .then(r => {
            if (r.error) {
                throw new Error(r.errorMsg)
            }
            return r.data;
        }).catch(e => alert(e));
};

export const getLocations = () => get('/locations');
export const getLocationById = (id) => get('/locations/' + id);

export const getBuildings = () => get('/buildings');
export const getBuildingsOfLocation = (location_id) => get('/buildings?location_id=' + location_id);
export const getBuildingById = (id) => get('/buildings/' + id);
export const getPricing_OutOfNetwork_Footage_byLocationId = (location_id) => get('/pricing/out-of-network/footage?location_id=' + location_id);
export const getPricing_OutOfNetwork_Stairs_byLocationId = (location_id) => get('/pricing/out-of-network/stairs?location_id=' + location_id);
export const insertPricing_OutOfNetwork_Footage = (data) => post('/pricing/out-of-network/footage', data);
export const insertPricing_OutOfNetwork_Stairs = (data) => post('/pricing/out-of-network/stairs', data);


export const getPricing_InNetwork_Stairs_byBuildingId = (building_id) => get('/pricing/in-network?building_id=' + building_id);
export const insertPricing_InNetwork = (data) => post('/pricing/in-network', data);
export const updateBuildingById = (id, data) => put('/buildings/' + id, data);


export const getPricing_AddOn_byLocationId = (location_id) => get('/pricing/add-on?location_id=' + location_id);
export const insertPricing_AddOn = (data) => post('/pricing/add-on', data);


