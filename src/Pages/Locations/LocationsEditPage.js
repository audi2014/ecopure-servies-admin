import React from "react";

import {TabBar} from "../../Base/TabBar";
import {LocationsEditModels} from "./LocationsEditModels";
import {RoutingConstants} from "../../constants/RoutingConstants";
import {LocationsEditProps} from "./LocationsEditProps";
import {LocationsEditZipCodes} from "./LocationsEditZipCodes";


export const LocationsEditPage = ({match, history, location}) => {
    const location_id = match.params.id;
    return <TabBar
        history={history}
        location={location}
        items={[
            {
                label: 'Location',
                render: () => <LocationsEditProps
                    location_id={location_id}
                    match={match}
                    history={history}
                >
                    <LocationsEditZipCodes location_id={location_id}/>
                </LocationsEditProps>,
                href: `/${RoutingConstants.locations}/${location_id}/edit`
            },
            {
                label: 'Pricing',
                render: () => <LocationsEditModels
                    location_id={location_id}
                    match={match}
                    history={history}
                />,
                href: `/${RoutingConstants.locations}/${location_id}/${RoutingConstants.editPricingOfLocation}`
            }
        ]}
    />;
};