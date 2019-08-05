import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import React from "react";
import IconButton from "@material-ui/core/IconButton/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import Typography from "@material-ui/core/Typography/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {MUInputCheckboxes} from "../BaseManageUsers/components";
import {If} from "../../Base/If";

const useStyles = makeStyles(theme => ({

    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
}));

export const VisibleColumnsDialog = ({title = 'Columns', item_title={}, items = [], value = [], setValue, open, onClose}) => {
    const classes = useStyles();
    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle disableTypography>
                <If value={title}>
                    <Typography variant="h6">{title}</Typography>
                </If>
                <IconButton aria-label="close" onClick={onClose} className={classes.closeButton}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <MUInputCheckboxes
                item_title={item_title}
                field={title}
                value={value}
                items={items}
                onChange={(f, v) => setValue(v)}/>
        </Dialog>
    );

};