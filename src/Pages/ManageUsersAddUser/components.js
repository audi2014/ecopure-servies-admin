import TextField from "@material-ui/core/TextField/TextField";
import {Select} from "../../Base/BaseInput";
import React from "react";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup/FormGroup";
import FormLabel from "@material-ui/core/FormLabel/FormLabel";
import FormControl from "@material-ui/core/FormControl/FormControl";

export const ProfileText = ({title, field, value, onChange, keyValue, ...rest}) => <TextField
    onChange={e => {
        let v = e.currentTarget.value;
        if(rest.maxLength) {
            v = v.substring(0,rest.maxLength)
        }
        if(rest.pattern) {
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

export const ProfileSelect = ({title, field, value, onChange, keyValue = {}, ...rest}) => <Select
    {...rest}
    label={title}
    setValue={value => onChange(field, value)}
    value={value || ''}
    keyValue={keyValue}
/>;

export const SplitStringCheckbox = ({title, field, value=[], items=[], onChange}) => {
    value = value.filter((v, i, a) => a.indexOf(v) === i && items.includes(v));
    const handleChange = e => {
        if (e.currentTarget.checked) {
            value = [...value, e.currentTarget.value];
        } else {
            value = value.filter(v => v !== e.currentTarget.value);
        }
        onChange(field, value)
    };
    return <React.Fragment>
        <FormLabel component="legend">{title}</FormLabel>
        <FormGroup>
            {items.map(v => <FormControlLabel key={v}
                                              control={<Checkbox
                                                  value={v}
                                                  checked={value.includes(v)}
                                                  color="primary"
                                                  onChange={handleChange}
                                              />}
                                              label={v}
            />)}
        </FormGroup>
    </React.Fragment>
};