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


export const LocationsEditZipCodes = ({location_id}) => {

    const {
        locationsZipcode_GetByLocationId,
        locationsZipcode_InsertByData,
        locationsZipcode_DeleteById
    } = React.useContext(apiContexts.locationsZipcode);
    const items = locationsZipcode_GetByLocationId.state || [];

    React.useEffect(() => {
        locationsZipcode_GetByLocationId.request(location_id);
    }, [location_id]);


    const insertByZipCode = (zipcode) => locationsZipcode_InsertByData.request({location_id, zipcode})
        .then(r => {
            locationsZipcode_GetByLocationId.request(location_id);
        });
    const deleteById = (id) => locationsZipcode_DeleteById.request(id)
        .then(r => {
            locationsZipcode_GetByLocationId.request(location_id);
        });

    if (
        !!locationsZipcode_GetByLocationId.pending
        || !!locationsZipcode_InsertByData.pending
        || !!locationsZipcode_DeleteById.pending
    ) return <Spinner/>;
    return <View
        items={items}
        location_id={location_id}
        deleteById={deleteById}
        insertByZipCode={insertByZipCode}
    />
};
const View = ({items, insertByZipCode, deleteById}) => {
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
                onDelete={() => deleteById(item.id)}
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
                        endAdornment: (<InputAdornment position="end">
                            <SubmitButton
                                type={'button'}
                                onClick={() => insertByZipCode(newZipCode).then(r => setNewZipCode(''))}
                            />
                        </InputAdornment>),
                    }}
                />
            </FormControl>
        </div>
    </div>
};