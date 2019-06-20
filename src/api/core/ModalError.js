import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Dialog from "@material-ui/core/Dialog/Dialog";
import React from "react";
import Button from "@material-ui/core/Button/Button";

export const ModalError = ({closeError, error}) => <Dialog
    open={!!error}
    onClose={closeError}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
>
    <DialogTitle id="alert-dialog-title">{error && error.title ? error.title : "Oops!"}</DialogTitle>
    {
        error
            ? <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {error.message}
                </DialogContentText>
            </DialogContent>
            : null
    }
    <DialogActions>
        <Button onClick={closeError} color="default" autoFocus={true}>
            OK
        </Button>
    </DialogActions>
</Dialog>;