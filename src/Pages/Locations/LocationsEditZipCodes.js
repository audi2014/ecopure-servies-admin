import React, {useState} from "react";
import Chip from "@material-ui/core/Chip/Chip";
import Typography from "@material-ui/core/Typography/Typography";
import TextField from "@material-ui/core/TextField/TextField";
import FormControl from "@material-ui/core/FormControl/FormControl";
import {SubmitButton} from "../../Base/BaseInput";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import {makeStyles} from "@material-ui/core";
import {apiContexts} from "../../api/ContextApi";
import {Spinner} from "../../icons";

const useStyles = makeStyles(theme => ({
    spacingLR: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
}));

export const LocationsEditZipCodes = ({items, insertByZipCode, deleteById, disabled}) => {
    const [newZipCode, setNewZipCode] = useState('');
    const classes = useStyles();

    const handleNewZipCodeChange = (e) => setNewZipCode(String(e.target.value).replace(/\D/g, ''));
    return <div>
        <Typography style={{margin: 20}} variant="h6">Zip Codes</Typography>
        <div
            className={classes.spacingLR}>
            {items.map(item => <Chip
                key={item.zipcode}
                color="primary"
                onDelete={disabled ? null : () => deleteById(item.id)}
                variant="outlined"
                label={item.zipcode}
            />)}
        </div>
        <div>
            <FormControl>
                <TextField
                    className={classes.spacingLR}
                    label="Add new Zip"
                    value={newZipCode || ''}
                    onChange={handleNewZipCodeChange}
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SubmitButton
                                    disabled={disabled}
                                    type={'button'}
                                    onClick={() => insertByZipCode(newZipCode).then(r => setNewZipCode(''))}
                                />
                            </InputAdornment>
                        ),
                    }}
                />
            </FormControl>
        </div>
    </div>
};