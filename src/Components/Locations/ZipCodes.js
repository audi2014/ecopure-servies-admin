import React, {useEffect, useState} from "react";
import {
    locationsZipcode_DeleteById,
    locationsZipcode_GetByLocationId,
    locationsZipcode_InsertByData
} from "../../api/Api";
import Chip from "@material-ui/core/Chip/Chip";
import Typography from "@material-ui/core/Typography/Typography";
import TextField from "@material-ui/core/TextField/TextField";
import FormControl from "@material-ui/core/FormControl/FormControl";
import {SubmitButton} from "../../Base/BaseInput";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({

    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
}));

const View = ({items, insertByZipCode, deleteById, ...props}) => {
    const [newZipCode, setNewZipCode] = useState('');
    const classes = useStyles();

    const handleNewZipCodeChange = (e) => setNewZipCode(Number.parseInt(e.target.value) || '');
    return <div>
        <Typography style={{margin: 20}} variant="h6">Zip Codes</Typography>
        {items.map(item => <Chip
            key={item.zipcode}
            color="primary"
            onDelete={() => deleteById(item.id)}
            variant="outlined"
            label={item.zipcode}
        />)}
        <div>
            <FormControl>
                <TextField
                    className={classes.textField}
                    label="Add new Zip"
                    value={newZipCode || ''}
                    onChange={handleNewZipCodeChange}
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                        endAdornment: (<InputAdornment position="end">
                            <SubmitButton
                                type={'button'}
                                onClick={() => insertByZipCode(newZipCode).then(r=>setNewZipCode(''))}
                            />
                        </InputAdornment>),
                    }}
                />
            </FormControl>
        </div>
    </div>
};

export const ZipCodes = ({location_id}) => {
    const [items, setItems] = useState(null);

    async function fetchItemToState() {
        const result = await locationsZipcode_GetByLocationId(location_id);
        if (result) {
            setItems(result);
        } else {
            setItems(false);
        }
    }

    useEffect(() => {
        fetchItemToState(location_id);
    }, [location_id]);
    if (items === null) return 'loading...';
    if (items === false) return 'error.';

    const insertByZipCode = (zipcode) => locationsZipcode_InsertByData({location_id, zipcode})
        .then(r => {
            fetchItemToState();
        });
    const deleteById = (id) => locationsZipcode_DeleteById(id)
        .then(r => {
            fetchItemToState();
        });

    return <View
        items={items}
        location_id={location_id}
        deleteById={deleteById}
        insertByZipCode={insertByZipCode}
    />
}