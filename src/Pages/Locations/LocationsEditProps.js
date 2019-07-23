import React from "react";
import {apiContexts} from "../../api/ContextApi";
import {BaseItemUpdationPage} from "../../Base/BaseItemUpdationPage";
import {makeLocationEditableTemplate} from "./makeLocationEditableTemplate";
import Typography from "@material-ui/core/Typography/Typography";
import Link from "@material-ui/core/Link/Link";

const handleSave = (location_id, request, setState) => data => {
    return request(location_id, data)
        .then(r => r ? setState(r) : null)
};

export const LocationsEditProps = ({location_id, children}) => {
    const title = 'Location';
    const {locations_GetById, locations_UpdateById} = React.useContext(apiContexts.locations);

    React.useEffect(() => {
        locations_GetById.request(location_id);
    }, [location_id]);

    return <BaseItemUpdationPage
        data={locations_GetById.state}
        editableTemplate={makeLocationEditableTemplate()}
        renderTitle={() => title}
        onSave={handleSave(location_id, locations_UpdateById.request, locations_GetById.setState)}
    >
        {
            () => <React.Fragment><GooglePlaceIdHelp/>{children}</React.Fragment>
        }
    </BaseItemUpdationPage>
};

const GooglePlaceIdHelp = () => <Typography style={{margin: 20}} variant="h6">
    <Link
        href='https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder'>How
        to get Google place id?</Link>
</Typography>;