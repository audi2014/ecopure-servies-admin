import {FIELDS_DB_USER} from "../BaseManageUsers/constants";
import {FIELDS_PROPS_ALL} from "../BaseManageUsers/fields";
import {sqlStringToHtmlDate, sqlStringToHtmlDateTime} from "../BaseManageUsers/tools";

const FIELDS_PROPS_EDIT_USER = [
    ...FIELDS_DB_USER.slice(0, 4),
    'location_id',
    ...FIELDS_DB_USER.slice(4,5),
    'building_id',
    ...FIELDS_DB_USER.slice(5),
]//[0, 1, 2, 3, "location_id", 4, "building_id", 5, 6, 7, 8, 9]
    .map((key) => FIELDS_PROPS_ALL.find(({field}) => field === key))
    .filter(v => !!v);

export const TAB_TITLE_PROPS = {
    'info': FIELDS_PROPS_EDIT_USER.slice(0,10),
    'booking': FIELDS_PROPS_EDIT_USER.slice(10,18),
    'home': FIELDS_PROPS_EDIT_USER.slice(18,27),
    'extra': FIELDS_PROPS_EDIT_USER.slice(27),
};


const dateKeys = [
    'start_clean_date'
];
const dateTimeKeys = [
    'registration_date',
    'meeting_point_start',
    'meeting_point_end',
    'date_last_email',
];

export const makeGetStateDiff =(initialState)=> (state) => {
    const changes = {};
    FIELDS_DB_USER.forEach(field=>{
        if(initialState[field] !== state[field]) {
            changes[field] = state[field];
        }
    });
    return changes;
};


export const propsToState = ({zipcodes, buildings, locations, user}) => {
    const location_id = (zipcodes.find(item => item.zipcode === user.zip_code) || {location_id: null}).location_id;
    const zip_code = (zipcodes.find(item => item.zipcode === user.zip_code) || {zipcode: null}).zipcode;
    const building = buildings.find(item => item.name === user.building_name && location_id === item.location_id);
    return {
        ...user,
        ...dateTimeKeys.reduce((prev, key) => {
            prev[key] = sqlStringToHtmlDateTime(user[key]);
            return prev;
        }, {}),
        ...dateKeys.reduce((prev, key) => {
            prev[key] = sqlStringToHtmlDate(user[key]);
            return prev;
        }, {}),
        location_id,
        zip_code,
        building_id: building ? building.id : 'other',
        building_name: building ? building.name : user.building_name,
        address: building ? building.address : user.address,
    };
};