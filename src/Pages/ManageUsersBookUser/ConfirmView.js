import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import React from "react";
import {Field_Title} from "./columns";
import {makeRequestData} from "./tools";

export const ConfirmView = (props) => {
    const {
        token,
        num_adults,
        num_pets,
        daily_tuning,
        ...body
    } = makeRequestData(props);
    return <Table>
        <TableHead>
            <TableRow>
                <TableCell>Field</TableCell>
                <TableCell align="right">Value</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {Object.keys(body).map(key => (
                <TableRow key={key}>
                    <TableCell component="th" scope="row">
                        {Field_Title[key] || '~~' + key}
                    </TableCell>
                    <TableCell align="right">{body[key] || '[EMPTY]'}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>;
};
