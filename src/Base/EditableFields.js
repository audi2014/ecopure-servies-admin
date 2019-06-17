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


export const EditableFields = ({data, onKeyValueChange, editableTemplate = null}) => {
    const classes = useStyles();
    if (editableTemplate) {
        return editableTemplate
            .map(item => <FormControl fullWidth key={item.field}>
                    {
                        item.Input
                            ? <item.Input
                                key={item.field}
                                className={classes.textField}
                                fieldData={item}
                                value={data[item.field] || ''}
                                data={data}
                                setValue={value => onKeyValueChange(item.field, value)}
                            />
                            : <TextField
                                key={item.field}
                                id={item.field}
                                label={item.title || item.field.replace(/_/g, ' ')}
                                className={classes.textField}
                                value={data[item.field] || ''}
                                onChange={e => onKeyValueChange(item.field, e.target.value)}
                                margin="normal"
                                variant="outlined"
                            />
                    }
                </FormControl>
            )
    } else {
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
    }

};