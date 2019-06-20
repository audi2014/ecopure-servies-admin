import React from "react";

import {Spinner} from "../../icons";
import {FootageTable} from "./Footage";
import {StairsTable} from "./Stairs";
import {ButtonGoToPricingModelsTable} from "../../Base/Buttons";
import {makeEditPreferencesProp} from "../../Base/EditModelName";
import {apiContexts} from "../../api/ContextApi";


const EditRegularModelName = makeEditPreferencesProp('regularPricingModelName');

const handleSave = (location_id, setEdition, insert, reload,) => data => {
    setEdition({...data, loading: true});
    return insert(data)
        .then(r => reload(location_id))
        .then(r => {
            setEdition({});
            return r;
        })
};


export const PricingOutOfNetworkPage = ({match, history}) => {
    const location_id = +match.params.id;

    const {outOfNetworkFootage_GetByLocationId, outOfNetworkFootage_InsertByData} = React.useContext(apiContexts.outOfNetworkFootage);
    const {outOfNetworkStairs_GetByLocationId, outOfNetworkStairs_InsertByData} = React.useContext(apiContexts.outOfNetworkStairs);

    React.useEffect(() => {
        outOfNetworkFootage_GetByLocationId.request(location_id);
        outOfNetworkStairs_GetByLocationId.request(location_id);
    }, [location_id]);

    const footage = outOfNetworkFootage_GetByLocationId.state || [];
    const stairs = outOfNetworkStairs_GetByLocationId.state || [];


    const [editionFootage, setEditionFootage] = React.useState({});
    const [editionStairs, setEditionStairs] = React.useState({});



    return <div>
        <ButtonGoToPricingModelsTable location_id={location_id}/>
        <EditRegularModelName/>
        <FootageTable
            edition={editionFootage}
            setEdition={setEditionFootage}
            onSave={handleSave(
                location_id,
                setEditionFootage,
                outOfNetworkFootage_InsertByData.request,
                outOfNetworkFootage_GetByLocationId.request,
            )}
            location_id={location_id}
            footage={footage}
        />
        <StairsTable
            edition={editionStairs}
            setEdition={setEditionStairs}
            onSave={handleSave(
                location_id,
                setEditionStairs,
                outOfNetworkStairs_InsertByData.request,
                outOfNetworkStairs_GetByLocationId.request,
            )}
            location_id={location_id}
            stairs={stairs}
        />

    </div>;
};