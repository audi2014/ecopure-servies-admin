import React from "react";
import {apiContexts} from "../../api/ContextApi";
import {BaseItemUpdationPage} from "../../Base/BaseItemUpdationPage";
import {makeLocationEditableTemplate} from "./makeLocationEditableTemplate";
import Typography from "@material-ui/core/Typography/Typography";
import Link from "@material-ui/core/Link/Link";
import {LocationsEditZipCodes} from "./LocationsEditZipCodes";

const handleSave = (location_id, request, setState) => data => {
    return request(location_id, data)
        .then(r => r ? setState(r) : null)
};

export const LocationsEditProps = ({location_id}) => {
    const title = 'Location';
    const {locations_GetById, locations_UpdateById} = React.useContext(apiContexts.locations);

    React.useEffect(() => {
        locations_GetById.request(location_id);
    }, [location_id]);

    return <React.Fragment>
        <BaseItemUpdationPage
            data={locations_GetById.state}
            editableTemplate={makeLocationEditableTemplate()}
            renderTitle={() => title}
            onSave={handleSave(location_id, locations_UpdateById.request, locations_GetById.setState)}
        />
        <LocationsEditZipCodes location_id={location_id}/>
    </React.Fragment>
};

