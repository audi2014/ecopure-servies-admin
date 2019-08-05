import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import React from "react";
import {makeRequestData} from "./tools";
import {getRequestStateKeys} from "./tools_component";
import {FIELD_TITLE} from "../BaseManageUsers/constants";



export const ConfirmView = (props) => {
    const body = makeRequestData(props);
    const bookingPreviewKeys = getRequestStateKeys(props.isInitialBooking);
    return <Table>
        <TableHead>
            <TableRow>
                <TableCell>Field</TableCell>
                <TableCell align="right">Value</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {Object.keys(body)
                .filter(key => bookingPreviewKeys.includes(key))
                .map(key => (
                    <TableRow key={key}>
                        <TableCell component="th" scope="row">
                            {FIELD_TITLE[key] || '~~' + key}
                        </TableCell>
                        <TableCell align="right">{body[key] || '[EMPTY]'}</TableCell>
                    </TableRow>
                ))}
        </TableBody>
    </Table>;
};
