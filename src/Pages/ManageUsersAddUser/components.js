import TextField from "@material-ui/core/TextField/TextField";
import {Select} from "../../Base/BaseInput";
import React from "react";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup/FormGroup";
import FormLabel from "@material-ui/core/FormLabel/FormLabel";
import Dialog from "@material-ui/core/Dialog/Dialog";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";

export const MUInputText = ({title, field, value, onChange, keyValue, ...rest}) => <TextField
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

export const MUInputCheckboxes = ({title, field, value = [], items = [], onChange}) => {
    value = value.filter((v, i, a) => a.indexOf(v) === i && items.includes(v));
    const handleChange = item => {
        if (value.includes(item)) {
            onChange(field, value.filter(v => v !== item))
        } else {
            onChange(field, [...value, item])
        }
    };
    return <React.Fragment>
        <FormLabel component="legend">{title}</FormLabel>

        <List>
            {items.map(item => (
                <ListItem button onClick={() => handleChange(item)} key={item}>
                    <ListItemIcon>
                        {value.includes(item) ? <RadioButtonChecked/> : <RadioButtonUnchecked/>}
                    </ListItemIcon>
                    <ListItemText primary={item}/>
                </ListItem>
            ))}
        </List>


        {/*<FormGroup>*/}
        {/*{items.map(v => <FormControlLabel key={v}*/}
        {/*control={<Checkbox*/}
        {/*value={v}*/}
        {/*checked={value.includes(v)}*/}
        {/*color="primary"*/}
        {/*onChange={handleChange}*/}
        {/*/>}*/}
        {/*label={v}*/}
        {/*/>)}*/}
        {/*</FormGroup>*/}
    </React.Fragment>
};