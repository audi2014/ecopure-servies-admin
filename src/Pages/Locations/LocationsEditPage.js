import React from "react";

import {BaseItemUpdationPage} from "../../Base/BaseItemUpdationPage";
import {locations_GetById, locations_UpdateById} from "../../api/Api";
import {LocationsZipCodes} from "./LocationsZipCodes";
import Typography from "@material-ui/core/Typography/Typography";
import Link from "@material-ui/core/Link/Link";
import {LocationsNavigation} from "./LocationsNavigation";
import {locationsEditableTemplate} from "./LocationsAddPage";

export const LocationsEditPage = ({match, history, onChange = null, fetchById=locations_GetById}) => {
    const selectedId = match.params.id;
    return <BaseItemUpdationPage
        editableTemplate={locationsEditableTemplate}
        renderTitle={() => 'Location'}
        fetchById={fetchById}
        updateById={(id, data) => locations_UpdateById(id, data).then(r => {
            if (onChange) onChange(selectedId);
        })}
        selectedId={match.params.id}
    >
        {
            (item, itemProps) => <>
                <LocationsZipCodes location_id={selectedId}/>
                <Typography style={{margin: 20}} variant="h6">
                    <Link
                        href='https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder'>How
                        to get Google place id?</Link>
                </Typography>
                <LocationsNavigation location_id={selectedId}/>
            </>
        }
    </BaseItemUpdationPage>
};