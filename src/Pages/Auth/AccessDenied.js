import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button/Button";
import React from "react";

export const AccessDenied = ({history, redirectTo = '/'}) => {

    function handleClose() {
        history.replace(redirectTo);
    }

    return (
        <Dialog
            open={true}
            onClose={handleClose}
            aria-labelledby="Forbidden"
            aria-describedby="Access denied for this page"
        >
            <DialogTitle id="alert-dialog-title">{"403"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Access Not Granted
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
};