import {useState} from "react";
import Typography from "@material-ui/core/Typography/Typography";
import {EditableFields} from "./EditableFields";
import Grid from "@material-ui/core/Grid/Grid";
import {ButtonCreate, ButtonReset, ButtonSave, ButtonToggleDisable} from "./Buttons";
import React from "react";
import {makeStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper/Paper";

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    dense: {
        marginTop: theme.spacing(2),
    },
}));

const getDiff = (source, state) => {
    let count = 0;
    const v = Object.keys(source).reduce((prev, key) => {
        if (state[key] !== source[key]) {
            prev[key] = state[key];
            count++;
        }
        return prev;
    }, {});
    return count > 0 ? v : null;
};

export const BaseItem = ({editableData, title, isDisabled, children, onToggleDisabled, onSave, isAdd}) => {
    const classes = useStyles();
    const [state, setState] = useState({...editableData});
    const handleKeyValueChange = (key, value) => {
        setState({...state, [key]: value});
    };
    const diff = getDiff(editableData, state);
    const handleReset = () => setState({...editableData});
    const handleSave = () => onSave(isAdd ? state : diff);
    return <form className={classes.container} noValidate autoComplete="off">
        {
            title ? <Typography style={{margin: 20}} variant="h6">{title}</Typography> : null
        }
        <EditableFields onKeyValueChange={handleKeyValueChange} data={state}/>

        <Grid
            container
            spacing={2}
            justify="center"
            alignItems="center"
            direction="row"
        >
            {
                onToggleDisabled
                    ? <ButtonToggleDisable onClick={onToggleDisabled} isDisabled={isDisabled}/>
                    : null
            }
            {
                !isAdd
                    ? <ButtonReset disabled={!diff} onClick={handleReset}/>
                    : null
            }
            {
                isAdd
                    ? <ButtonCreate disabled={false} onClick={handleSave}/>
                    : <ButtonSave disabled={!diff} onClick={handleSave}/>
            }
        </Grid>
        {
            children ? <Grid container spacing={2} className={classes.dense}>
                <Grid item xs={12}>
                    {children}
                </Grid>
            </Grid> : null
        }
    </form>
};