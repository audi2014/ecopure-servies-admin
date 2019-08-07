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

export const makeTableActions = ({onAddClick, handleDeleteClick, handleOpen, auth}) => {
    const actions = [
        {
            icon: 'add',
            tooltip: 'Add User',
            isFreeAction: true,
            onClick: onAddClick
        },
        {
            icon: 'view_column',
            tooltip: 'Columns',
            isFreeAction: true,
            onClick: handleOpen
        },
    ];
    if (auth.haveAdminAccess()) {
        actions.push({
            icon: 'delete',
            tooltip: 'Delete selected Users',
            onClick: handleDeleteClick
        })
    }
    return actions;
};


export const makeTableRequest = (request) => query => request({
    filters: (query.filters || []).reduce(function (prev, {column, value}) {
        prev[column.field] = value;
        return prev;
    }, {}),
    orderBy: (query.orderBy && query.orderBy.field) || '',
    orderDirection: query.orderDirection || 'asc',
    search: query.search || '',
    offset: (query.page) * query.pageSize,
    count: query.pageSize,
}).then(result => {
    if (!result) {
        return {
            data: [],
            page: 0,
            totalCount: 0,
        };
    }
    return {
        data: result.items,
        page: Math.ceil((result.offset) / query.pageSize),
        totalCount: result.total,
    }
});