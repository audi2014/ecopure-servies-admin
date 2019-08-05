import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import React from "react";
import Dialog from "@material-ui/core/Dialog/Dialog";
import {Spinner} from "../../icons";

export const DialogLoading = ({title, open}) => <Dialog aria-labelledby="simple-dialog-title" open={open}>
    <DialogTitle id="simple-dialog-title">{title}<Spinner/></DialogTitle>

</Dialog>;