import TextField from "@material-ui/core/TextField/TextField";
import {Select} from "../../Base/BaseInput";
import React from "react";
import FormLabel from "@material-ui/core/FormLabel/FormLabel";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";

export const MUInputText = ({title, field, value, onChange, keyValue, ...rest}) => <TextField
    inputProps={{autoComplete: "hack-" + field}}
    onChange={e => {
        let v = e.currentTarget.value;
        if (rest.maxLength) {
            v = v.substring(0, rest.maxLength)
        }
        if (rest.pattern) {
            v = v.replace(rest.pattern, '')
        }
        onChange(field, v);
    }}
    id={field}
    label={title}
    value={value || ''}
    margin="normal"
    variant="outlined"
    {...rest}
/>;

export const MUInputSelect = ({title, field, value, onChange, keyValue = {}, ...rest}) => <Select
    {...rest}
    label={title}
    setValue={value => onChange(field, value)}
    value={value || ''}
    keyValue={keyValue}
/>;

export const MUInputCheckboxes = ({title, field, value = [], items = [], item_title = {}, onChange}) => {
    value = value.filter((v, i, a) => a.indexOf(v) === i && items.includes(v));
    const handleChange = item => {
        if (value.includes(item)) {
            onChange(field, value.filter(v => v !== item))
        } else {
            onChange(field, [...value, item])
        }
    };
    return <React.Fragment>
        {title ? <FormLabel component="legend">{title}</FormLabel> : null}
        <List>
            {items.map(item => (
                <ListItem button onClick={() => handleChange(item)} key={item}>
                    <ListItemIcon>
                        {value.includes(item) ? <RadioButtonChecked/> : <RadioButtonUnchecked/>}
                    </ListItemIcon>
                    <ListItemText primary={item_title[item] || item}/>
                </ListItem>
            ))}
        </List>
    </React.Fragment>
};