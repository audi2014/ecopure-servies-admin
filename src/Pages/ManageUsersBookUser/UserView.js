import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import React from "react";
import {TABLE_COLUMNS_USER} from "../ManageUsers/columns";
import {apiContexts} from "../../api/ContextApi";

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

const VIEW_COLUMNS_USER_SHORT  = TABLE_COLUMNS_USER.filter(col=>!HIDDEN_FIELDS.includes(col.field));


export const UserView = ({isShort, ...props}) => {
    // const {users_cardGetById} = React.useContext(apiContexts.users);
    // React.useEffect(() => {
    //     users_cardGetById.request(props.id);
    // }, [props.id]);


    // return JSON.stringify(users_cardGetById.state)
    return <Table>
        <TableHead>
            <TableRow>
                <TableCell>Field</TableCell>
                <TableCell align="right">Value</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {(isShort ? VIEW_COLUMNS_USER_SHORT : TABLE_COLUMNS_USER).map(({field,title}) => (
                <TableRow key={field}>
                    <TableCell component="th" scope="row">
                        {title || '~~' + field}
                    </TableCell>
                    <TableCell align="right">{"" + props[field]}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>;
};
