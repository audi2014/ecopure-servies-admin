import Button from "@material-ui/core/Button/Button";
import React from "react";
import {CheckCircleOutline, Done, HighlightOff, History} from '@material-ui/icons';
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
    rightIcon: {
        marginLeft: theme.spacing(1),
    },
}));
export const ButtonSave = ({disabled, onClick}) => {
    const classes = useStyles();
    return <Button
        disabled={disabled}
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={onClick}>
        Save
        <Done className={classes.rightIcon}/>
    </Button>
};
export const ButtonCreate = ({disabled, onClick}) => {
    const classes = useStyles();
    return <Button
        disabled={disabled}
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={onClick}>
        Create
        <Done className={classes.rightIcon}/>
    </Button>
};
export const ButtonReset = ({disabled, onClick}) => {
    const classes = useStyles();
    return <Button
        disabled={disabled}
        variant="contained"
        color="default"
        className={classes.button}
        onClick={onClick}
    >
        Reset <History className={classes.rightIcon}/>
    </Button>
};

export const ButtonToggleDisable = ({onClick, isDisabled}) => {
    const classes = useStyles();
    return <Button variant="contained" color="default" className={classes.button}
                   onClick={onClick}>
        {
            isDisabled
                ? 'Enable'
                : 'Disable'
        }
        {
            isDisabled
                ? <HighlightOff className={classes.rightIcon}/>
                : <CheckCircleOutline className={classes.rightIcon}/>
        }
    </Button>
};