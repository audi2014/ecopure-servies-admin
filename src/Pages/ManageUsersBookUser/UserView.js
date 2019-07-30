import {htmlDateString2Sql, htmlDateTimeString2Sql} from "./tools";
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import React from "react";

const UserField_Title = {
    id: 'id',
    email: 'email',
    first_name: 'first_name',
    last_name: 'last_name',
    building_name: 'building_name',
    address: 'address',

    registration_date: 'registration_date',
    meeting_point_start: 'meeting_point_start',
    meeting_point_end: 'meeting_point_end',
    date_last_email: 'date_last_email',
    start_clean_date: 'start_clean_date',
    validation_status: 'validation_status',
    email_counter: 'email_counter',
    last_adm_message_id: 'last_adm_message_id',
    is830: 'is830',
    status: 'status',
    num_adults: 'num_adults',
    num_kids: 'num_kids',
    num_pets: 'num_pets',
    num_bth: 'num_bth',
    active_message_to_adm: 'active_message_to_adm',
    email_notification: 'email_notification',
    daily_tuning: 'daily_tuning',
    building_flag: 'building_flag',
    zip_flag: 'zip_flag',
    pa_flag: 'pa_flag',
    home_clng_prof_flag: 'home_clng_prof_flag',
    num_br: 'num_br',

    apt_num: 'apt_num',
    phone: 'phone',
    zip_code: 'zip_code',
    frequency: 'frequency',
    pet_type: 'pet_type',
    home_condition: 'home_condition',
    home_access: 'home_access',
    special: 'special',
    promo_code: 'promo_code',
    resource: 'resource',
    flight_stairs: 'flight_stairs',
    token: 'token',
};


export const UserView = (props) => {


    const ordered = {};
    Object.keys(props).sort((a, b) => {
        return Object.keys(UserField_Title).indexOf(a) - Object.keys(UserField_Title).indexOf(b)
    }).forEach(function (key) {
        ordered[key] = props[key];
    });

    return <Table>
        <TableHead>
            <TableRow>
                <TableCell>Field</TableCell>
                <TableCell align="right">Value</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {Object.keys(ordered).map(key => (
                <TableRow key={key}>
                    <TableCell component="th" scope="row">
                        {UserField_Title[key] || '~~' + key}
                    </TableCell>
                    <TableCell align="right">{"" + props[key]}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>;
};
