import React from "react";
import {
    buildingsLarge_GetById, buildingsLarge_GetByLocationId,
    inNetwork_GetByBuildingId,
} from "../../api/Api";
import {RoomTypePlanTable} from "./RoomTypePlanTable";
import {Spinner} from "../../icons";
import Typography from "@material-ui/core/Typography/Typography";
import {PricingInNetworkNavigation} from "./PricingInNetworkNavigation";
import {makeUsingLoadingById} from "../tools";
import {ImportInnetwork} from "./ImportInnetwork";


const use_load_buildingsLarge_GetById = makeUsingLoadingById(buildingsLarge_GetById);
const use_load_inNetwork_GetByBuildingId = makeUsingLoadingById(inNetwork_GetByBuildingId);

export const PricingInNetworkPage = ({match, history, onChange = null, building_id = null}) => {
    if (!building_id) building_id = match.params.id;

    const [building,] = use_load_buildingsLarge_GetById(building_id);
    const [pricingInNetwork, _, reloadPricingInNetwork] = use_load_inNetwork_GetByBuildingId(building_id);

    if (building === false || pricingInNetwork === false) return 'error.';
    if (!building || !pricingInNetwork) return <Spinner/>;

    return <div>
        <Typography style={{margin: 20}} variant="h6">In-network Pricing of Building "{building.name}"</Typography>
        <RoomTypePlanTable
            pricingInNetwork={pricingInNetwork}
            reload={reloadPricingInNetwork}
            selectedId={building_id}
        />
        <ImportInnetwork building_id={+building.id} reload={reloadPricingInNetwork} location_id={+building.location_id}/>
        <PricingInNetworkNavigation building_id={building_id} location_id={building.location_id}/>
    </div>;
};