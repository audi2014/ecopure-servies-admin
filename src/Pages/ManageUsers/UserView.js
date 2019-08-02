import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import React from "react";
import {TABLE_COLUMNS_USER} from "./columns";
import {apiContexts} from "../../api/ContextApi";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import {Spinner} from "../../icons/index";

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

const CARD_FIELD_TITLE = {
    'cc_number': 'cc number',
    'exp_date': 'exp date',
    'cvv': 'cvv',
    'cc_zip': 'cc zip',
};

const VIEW_COLUMNS_USER_SHORT = TABLE_COLUMNS_USER.filter(col => !HIDDEN_FIELDS.includes(col.field));


const ModalCard = ({id}) => {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    const {users_cardGetById} = React.useContext(apiContexts.users);
    React.useEffect(() => {
        users_cardGetById.request(id);
    }, [id]);

    const card = users_cardGetById.state;
    const pending = users_cardGetById.pending;

    return (
        <React.Fragment>
            <Button
                onClick={handleOpen}
                color="secondary"
            >
                Card
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle id="alert-dialog-title">
                    Card Information {pending ? <Spinner/> : null}
                </DialogTitle>
                {
                    card && !pending
                        ? <CardContent {...card}/>
                        : null
                }
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

const CardContent = (props) => <DialogContent>
    <Table>
        <TableBody>
            {
                Object.keys(CARD_FIELD_TITLE).map(field => (
                    <TableRow key={field}>
                        <TableCell component="th" scope="row">
                            {CARD_FIELD_TITLE[field] || field}
                        </TableCell>
                        <TableCell align="right">{'' + props[field]}</TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
    </Table>
</DialogContent>;

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
            {(isShort ? VIEW_COLUMNS_USER_SHORT : TABLE_COLUMNS_USER).map(({field, title}) => (
                <TableRow key={field}>
                    <TableCell component="th" scope="row">
                        {title || '~~' + field}
                    </TableCell>
                    <TableCell align="right">{"" + props[field]}</TableCell>
                </TableRow>
            ))}
        </TableBody>
        <ModalCard id={props.id}/>
    </Table>;
};
