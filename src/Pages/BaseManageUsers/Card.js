import React from "react";
import Button from "@material-ui/core/Button/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import IconButton from "@material-ui/core/IconButton/IconButton";
import {EditIcon} from "../../icons";
import {If} from "../../Base/If";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Table from "@material-ui/core/Table/Table";
import TableBody from "@material-ui/core/TableBody/TableBody";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import {FIELD_TITLE, FIELDS_CARD} from "./constants";
import {FIELDS_PROPS_CARD} from "./fields";

export const ModalCard = ({onSubmit, pending, ...card}) => {
    const [open, setOpen] = React.useState(false);
    const [readOnly, setReadOnly] = React.useState(true);
    const [state, setState] = React.useState({...card});
    React.useEffect(() => {
        setReadOnly(true);
    }, [pending]);
    const handleClose = () => {
        setOpen(false);
        setState({...card});
    };
    const handleOpen = () => setOpen(true);
    const handleChange = (key, val) => {
        setState({...state, [key]: val});
    };
    const handleToggleReadOnly = () => {
        if (!readOnly) {
            setState({...card});
        }
        setReadOnly(!readOnly);
    };
    const handleSubmit = () => {
        onSubmit(state);
    };
    return (
        <React.Fragment>
            <Button
                onClick={handleOpen}
                color="secondary"
            >
                Card
            </Button>
            <Dialog
                fullWidth
                maxWidth={'sm'}
                open={open}
                onClose={handleClose}
            >
                <DialogTitle id="alert-dialog-title">
                    Card Information
                    <IconButton aria-label="close" onClick={handleToggleReadOnly}>
                        <EditIcon/>
                    </IconButton>
                </DialogTitle>
                <If value={readOnly}>
                    <CardContent {...card}  />
                    <CardEdit {...state} onChange={handleChange} pending={pending}/>
                </If>
                <DialogActions>
                    <If value={!readOnly}>
                        <Button disabled={pending} onClick={handleSubmit} color="primary" autoFocus>
                            Save
                        </Button>
                    </If>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};
const CardContent = ({...card}) => {
    return <DialogContent>
        <Table>
            <TableBody>
                {
                    FIELDS_CARD.map(field => (
                        <TableRow key={field}>
                            <TableCell component="th" scope="row">
                                {FIELD_TITLE[field] || '~~' + field}
                            </TableCell>
                            <TableCell align="right">{'' + card[field]}</TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    </DialogContent>
};
const CardEdit = ({onChange, pending, ...card}) => {
    return <DialogContent>
        {
            FIELDS_PROPS_CARD.map(({field, Component, ...props}) => (
                <Component
                    disabled={pending}
                    key={field}
                    fullWidth
                    title={FIELD_TITLE[field] || field}
                    value={'' + card[field]}
                    onChange={onChange}
                    field={field}
                    {...props}
                />

            ))
        }
    </DialogContent>
};