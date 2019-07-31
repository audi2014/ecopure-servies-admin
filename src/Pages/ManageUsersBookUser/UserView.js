import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import React from "react";
import {TABLE_COLUMNS_USER} from "../ManageUsers/columns";



export const UserView = (props) => {
    return <Table>
        <TableHead>
            <TableRow>
                <TableCell>Field</TableCell>
                <TableCell align="right">Value</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {TABLE_COLUMNS_USER.map(({field,title}) => (
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
