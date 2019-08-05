import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import React from "react";
import {FIELD_TITLE, FIELDS_DB_USER} from "./constants";

const HIDDEN_FIELDS = [
    'validation_status',
    'email_counter',
    'last_adm_message_id',
    'active_message_to_adm',
    'email_notification',
    'daily_tuning',
    'building_flag',
    'zip_flag',
    'pa_flag',
    'home_clng_prof_flag',
    'phone',
    'frequency',
    'pet_type',
    'home_condition',
    'home_access',
    'special',
    'promo_code',
    'resource',
    'token',
];


const FIELDS_DB_USER_SHORT = FIELDS_DB_USER.filter(field => !HIDDEN_FIELDS.includes(field));


export const UserView = ({isShort, ...props}) => {
    if (!props.id) return null;
    return <Table>
        <TableHead>
            <TableRow>
                <TableCell>Field</TableCell>
                <TableCell align="right">Value</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {(isShort ? FIELDS_DB_USER_SHORT : FIELDS_DB_USER).map(field => (
                <TableRow key={field}>
                    <TableCell component="th" scope="row">
                        {FIELD_TITLE[field] || '~~' + field}
                    </TableCell>
                    <TableCell align="right">{"" + props[field]}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>;
};
