import Button from "@material-ui/core/Button/Button";
import React from "react";
import { Done, HighlightOff, History} from '@material-ui/icons';
import {makeStyles} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";
import {RoutingConstants} from "../constants/RoutingConstants";
import {DeleteIcon, DisableIcon, EnableIcon, GoBack} from "../icons";
import Fab from "@material-ui/core/Fab/Fab";

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
export const ButtonDeleteForewer = ({disabled,onClick}) => {
    const classes = useStyles();
    return <Button
        disabled={disabled}
        className={classes.button}
        variant="contained"
        color="default"
        onClick={onClick}>
        Delete forever
        <DeleteIcon color="secondary"/>
    </Button>;
}
export const ButtonReset = ({disabled, onClick, }) => {
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

export const ButtonToggleDisable = ({onClick, isDisabled, disabled}) => {
    const classes = useStyles();
    return <Button variant="contained" color="default" className={classes.button}
                   disabled={disabled}
                   onClick={onClick}>
        {
            isDisabled
                ? 'Reactivate'
                : 'Deactivate'
        }
        {
            isDisabled
                ? <EnableIcon className={classes.rightIcon}/>
                : <DisableIcon color="secondary" className={classes.rightIcon}/>
        }
    </Button>
};

export const ButtonGoToPricingModelsTable = ({location_id}) => <Fab
    component={RouterLink}
    to={`/${RoutingConstants.locations}/${location_id}/${RoutingConstants.editPricingOfLocation}`}
    style={{
        marginTop: 20,
        marginBottom: 20,
        marginRight: 20,
    }}
    size="small"
    color="primary"
    aria-label="Back"><GoBack/>
</Fab>;