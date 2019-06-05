import React from 'react';
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import MoneyIcon from '@material-ui/icons/MonetizationOn';
import TextField from "@material-ui/core/TextField/TextField";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import CancelIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton/IconButton";
import SaveIcon from '@material-ui/icons/Save';

const valueOrMin = (value, min = null) => {
    value = String(value).replace(',', '.');
    const lastIsDot = value.lastIndexOf('.') === value.length - 1;
    const parts = value.split('.');
    let float = String(parts[0] || '') + (parts[1] ? '.' : '') + parts.slice(1).join('');
    // float = Number.parseFloat(float);
    if (isNaN(float)) float = Number.parseFloat(float) || 0;
    if (min !== null && float < min) float = min;
    if (lastIsDot && parts.length === 2) float += '.';
    return float;
};

export const MoneyInput = ({label = 'Price', value, setValue, className, min = 0, ...rest}) => <TextField
    {...rest}
    label={label}
    value={value}
    onChange={e => setValue(valueOrMin(e.target.value, min))}
    className={className}
    InputLabelProps={{
        shrink: true,
    }}
    InputProps={{
        startAdornment: (<InputAdornment position="start"><MoneyIcon/></InputAdornment>),
    }}
    inputProps={{
        min: min,
    }}
    margin="normal"
/>;

export const FloatInput = ({label, value, setValue, className, min = 0, ...rest}) => <TextField
    {...rest}
    label={label}
    value={value}
    onChange={e => setValue(valueOrMin(e.target.value, min))}
    type="number"
    className={className}
    InputLabelProps={{
        shrink: true,
    }}

    margin="normal"
/>;

export const Select = ({
                           className,
                           menuClassName,
                           value, setValue,
                           keyValue = {},
                           errorValue = '',
                           errorTitle = 'N/A',
                           label = 'Label',
                           variant="outlined",
                           ...rest
                       }) => <TextField
    {...rest}
    variant={variant}
    select
    label={label}
    className={className}
    value={value}
    onChange={e => setValue(e.target.value)}
    SelectProps={{
        MenuProps: {
            className: menuClassName,
        },
    }}
    margin="normal"
>
    <MenuItem disabled value={errorValue}>
        {errorTitle}
    </MenuItem>
    {Object.keys(keyValue)
        .map(type =>
            <MenuItem key={type}
                      value={type}>
                {keyValue[type]}
            </MenuItem>
        )
    }
</TextField>;

export const CancelButton = ({onClick}) => <IconButton onClick={onClick} color="secondary" aria-label="Cancel">
    <CancelIcon/>
</IconButton>;
export const SubmitButton = ({type = 'submit', color = 'primary', label = 'Save', ...props}) => <IconButton
    type={type}
    color={color}
    aria-label={label}
    {...props}
>
    <SaveIcon/>
</IconButton>;