import React from "react";

import {
    locations_GetById,
    outOfNetworkFootage_GetByLocationId, outOfNetworkStairs_GetByLocationId
} from "../../api/Api";
import {Spinner} from "../../icons";
import {makeUsingLoadingById} from "../tools";
import {FootageTable} from "./Footage";
import {StairsTable} from "./Stairs";
import {EditModelName} from "../../Base/EditModelName";
import {ManagerPreferencesContext} from "../../ManagerPreferencesContext";
import {ButtonGoToPricingModelsTable} from "../../Base/Buttons";

const use_load_outOfNetworkFootage_GetByLocationId = makeUsingLoadingById(outOfNetworkFootage_GetByLocationId);
const use_load_outOfNetworkStairs_GetByLocationId = makeUsingLoadingById(outOfNetworkStairs_GetByLocationId);
const use_load_locations_GetById = makeUsingLoadingById(locations_GetById);

const EditRegularModelName = () => {
    const {
        preferences,
        updatePreferences
    } = React.useContext(ManagerPreferencesContext);
    const handleUpdateName = (regularPricingModelName) => updatePreferences({...preferences, regularPricingModelName})

    return <EditModelName
        initialName={preferences.regularPricingModelName}
        updateNamePromise={handleUpdateName}
    />
};


export const PricingOutOfNetworkPage = ({match, history, onChange = null, location_id = null}) => {
    if (!location_id) location_id = match.params.id;

    const [footage, reloadFootage] = use_load_outOfNetworkFootage_GetByLocationId(location_id);
    const [stairs, reloadStairs] = use_load_outOfNetworkStairs_GetByLocationId(location_id);
    const [location] = use_load_locations_GetById(location_id);

    if (footage === false || stairs === false || location === false) return 'error.';
    if (!footage || !stairs || !location) return <Spinner/>;

    return <div>
        <ButtonGoToPricingModelsTable location_id={location_id}/>
        <EditRegularModelName/>
        <FootageTable reload={reloadFootage} location_id={location_id} footage={footage}/>
        <StairsTable reload={reloadStairs} location_id={location_id} stairs={stairs}/>

    </div>;
};