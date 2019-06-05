import React from "react";

import {
    locations_GetById,
    outOfNetworkFootage_GetByLocationId, outOfNetworkStairs_GetByLocationId
} from "../../api/Api";
import {Spinner} from "../../icons";
import Typography from "@material-ui/core/Typography/Typography";
import {makeUsingLoadingById} from "../tools";
import {FootageTable} from "./Footage";
import {StairsTable} from "./Stairs";
import {PricingOutOfNetworkNavigation} from "./PricingOutOfNetworkNavigation";

const use_load_outOfNetworkFootage_GetByLocationId = makeUsingLoadingById(outOfNetworkFootage_GetByLocationId);
const use_load_outOfNetworkStairs_GetByLocationId = makeUsingLoadingById(outOfNetworkStairs_GetByLocationId);
const use_load_locations_GetById = makeUsingLoadingById(locations_GetById);


export const PricingOutOfNetworkPage = ({match, history, onChange = null, location_id = null}) => {
    if (!location_id) location_id = match.params.id;

    const [footage, _sf, reloadFootage] = use_load_outOfNetworkFootage_GetByLocationId(location_id);
    const [stairs, _ss, reloadStairs] = use_load_outOfNetworkStairs_GetByLocationId(location_id);
    const [location,] = use_load_locations_GetById(location_id);

    if (footage === false || stairs === false || location === false) return 'error.';
    if (!footage || !stairs || !location) return <Spinner/>;

    return <div>
        <Typography style={{margin: 20}} variant="h6">
            Out-of-network Pricing of Location "{location.name || 'N/A'}"
        </Typography>
        <FootageTable reload={reloadFootage} location_id={location_id} footage={footage}/>
        <StairsTable reload={reloadStairs} location_id={location_id} stairs={stairs}/>
        <PricingOutOfNetworkNavigation location_id={location_id}/>

    </div>;
};