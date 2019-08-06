import Cookies from "js-cookie";
import {COOKIE_KEY_USER_COLUMNS} from "../../constants/Enum";
import {FIELD_TITLE, FIELDS_DB_USER} from "../BaseManageUsers/constants";
import {ActionsMenu} from "./ActionsMenu";
import React from "react";

export const initialVisibleFields = Cookies.getJSON(COOKIE_KEY_USER_COLUMNS) || [
    'email',
    'first_name',
    'last_name',
    'building_name',
    'address',
    'apt_num',
    'zip_code',
];

export const TABLE_COLUMNS_USER = FIELDS_DB_USER.map(field => {
    return {
        title: FIELD_TITLE[field] || '~~' + field,
        field,
        render: ((row) => {
            if (row[field] === true) return '1';
            else if (row[field] === false) return '0';
            else return '' + row[field];
        })
    }
});

export const USER_FIELD_TITLE = FIELDS_DB_USER.reduce((prev, field) => {
    prev[field] = FIELD_TITLE[field] || '~~' + field;
    return prev;
}, {});