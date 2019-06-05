import React from "react";

import {BaseItemUpdationPage} from "../Base/BaseItemUpdationPage";
import {locations_GetById, locations_UpdateById} from "../api/Api";
import {ZipCodes} from "../Components/Locations/ZipCodes";
import Typography from "@material-ui/core/Typography/Typography";
import Link from "@material-ui/core/Link/Link";
import {Navigation} from "../Components/Locations/Navigation";

export const EditLocationPage = ({match, history, onChange = null, fetchById=locations_GetById}) => {
    const selectedId = match.params.id;
    return <BaseItemUpdationPage
        title={'Edit Location'}
        fetchById={fetchById}
        updateById={(id, data) => locations_UpdateById(id, data).then(r => {
            if (onChange) onChange(selectedId)
            // if (r && r.id) {
            //     history.push(`/${RoutingConstants.locations}/${r.id}`)
            // }
        })}
        selectedId={match.params.id}
    >
        {
            (item, itemProps) => <>
                <ZipCodes location_id={selectedId}/>
                <Typography style={{margin: 20}} variant="h6">
                    <Link
                        href='https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder'>How
                        to get Google place id?</Link>
                </Typography>
                <Navigation selectedId={selectedId}/>
            </>
        }
    </BaseItemUpdationPage>
};