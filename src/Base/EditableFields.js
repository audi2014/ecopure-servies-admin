import FormControl from "@material-ui/core/FormControl/FormControl";
import TextField from "@material-ui/core/TextField/TextField";
import React from "react";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({

    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
}));


export const EditableFields = ({data, onKeyValueChange}) => {
    const classes = useStyles();
    return Object.keys(data)
        .map(key => (
            <FormControl fullWidth key={key}>
                <TextField
                    key={key}
                    id={key}
                    label={key.replace(/_/g, ' ')}
                    className={classes.textField}
                    value={data[key] || ''}
                    onChange={e => onKeyValueChange(key, e.target.value)}
                    margin="normal"
                    variant="outlined"
                />
            </FormControl>
        ));
};