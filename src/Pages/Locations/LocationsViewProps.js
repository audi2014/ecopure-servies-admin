import React from "react";
import {apiContexts} from "../../api/ContextApi";
import {GooglePlaceIdHelp, makeLocationEditableTemplate} from "./makeLocationEditableTemplate";
import {Spinner} from "../../icons";
import TextField from "@material-ui/core/TextField/TextField";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Typography from "@material-ui/core/Typography/Typography";
import Chip from "@material-ui/core/Chip/Chip";

export const LocationsViewProps = ({location_id}) => {
    const title = 'Location';
    const {locations_GetById} = React.useContext(apiContexts.locations);

    const {
        locationsZipcode_GetByLocationId,
    } = React.useContext(apiContexts.locationsZipcode);

    React.useEffect(() => {
        locations_GetById.request(location_id);
        locationsZipcode_GetByLocationId.request(location_id)
    }, [location_id]);

    if (locations_GetById.pending) return <Spinner/>;
    if (!locations_GetById.state) return null;
    const zipcodes = locationsZipcode_GetByLocationId.state || [];

    const template = makeLocationEditableTemplate();

    return <form noValidate autoComplete="off">
        <Typography style={{margin: 20}} variant="h6">{title}</Typography>
        <FormControl fullWidth>{
            template.map(({field, title}, idx) => {
                return <TextField
                    key={field}
                    id={field}
                    label={title}
                    value={locations_GetById.state[field] || ''}
                    InputProps={{
                        readOnly: true,
                    }}
                    margin="normal"
                    variant="outlined"
                />
            })}
            <GooglePlaceIdHelp google_place_id={locations_GetById.state && locations_GetById.state.google_place_id}/>
        </FormControl>
        <Typography style={{margin: 20}} variant="h6">Zip Codes</Typography>
        <div>
            {
                zipcodes.map(item => <Chip
                    key={item.zipcode}
                    color="primary"
                    variant="outlined"
                    label={item.zipcode}
                />)
            }
            {/*<TextField*/}
            {/*label={'Zip Codes'}*/}
            {/*value={zipcodes.map(item => item.zipcode).join(',')}*/}
            {/*InputProps={{*/}
            {/*readOnly: true,*/}
            {/*}}*/}
            {/*margin="normal"*/}
            {/*variant="outlined"*/}
            {/*/>*/}
        </div>
    </form>
};