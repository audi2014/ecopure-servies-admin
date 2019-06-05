import React from "react";

import {
    locations_GetById,
    addOn_GetByLocationId,
} from "../../api/Api";
import {Spinner} from "../../icons";
import {makeUsingLoadingById} from "../tools";
import {ExtraFootageTable} from "./ExtraFootageTable";
import {AddOnTable} from "./AddOnTable";
import {PricingAddOnNavigation} from "./PricingAddOnNavigation";

const use_load_addOn_GetByLocationId = makeUsingLoadingById(addOn_GetByLocationId);
const use_load_locations_GetById = makeUsingLoadingById(locations_GetById);


export const PricingAddOnPage = ({match, history, onChange = null, location_id = null}) => {
    if (!location_id) location_id = match.params.id;

    const [addons, _, reloadAddons] = use_load_addOn_GetByLocationId(location_id);
    const [location,] = use_load_locations_GetById(location_id);

    if (addons === false || location === false) return 'error.';
    if (!addons || !location) return <Spinner/>;

    return <div>
        <AddOnTable
            reload={reloadAddons}
            location_id={location_id}
            addons={addons}
        />
        <ExtraFootageTable location_id={location_id}/>
        <PricingAddOnNavigation location_id={location_id}/>

    </div>;
};