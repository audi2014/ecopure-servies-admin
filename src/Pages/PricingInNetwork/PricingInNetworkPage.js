import React from "react";
import {RoomTypePlanTable} from "./RoomTypePlanTable";
import {Spinner} from "../../icons";
import {ButtonGoToPricingModelsTable} from "../../Base/Buttons";
import {ModelNameOrDefault} from "../../Base/tools";
import {apiContexts} from "../../api/ContextApi";
import {ImportInnetwork} from "./ImportInnetwork";
import {EditModelName} from "../../Base/EditModelName";

const handleSave = (custom_pricing_model_id, setEdition, insert, reload,) => data => {
    setEdition({...data, loading: true});
    return insert(data)
        .then(r => reload(custom_pricing_model_id))
        .then(r => {
            setEdition({});
            return r;
        })
};


export const PricingInNetworkPage = ({match, history}) => {
    const custom_pricing_model_id = +match.params.id;
    const location_id = +match.params.location_id;

    const {
        inNetworkModel_UpdateById,
        inNetworkModel_GetById,
        inNetworkModel_GetByLocationId
    } = React.useContext(apiContexts.inNetworkModel);

    const {
        inNetworkPrices_GetByModelId,
        inNetworkPrices_InsertByData,
        inNetworkPrices_DeleteById,
    } = React.useContext(apiContexts.inNetworkPrices);

    const inNetworkPrices = inNetworkPrices_GetByModelId.state || [];
    const models = inNetworkModel_GetByLocationId.state || [];
    const [edition, setEdition] = React.useState({});

    React.useEffect(() => {
        inNetworkPrices_GetByModelId.request(custom_pricing_model_id);
        inNetworkModel_GetById.request(custom_pricing_model_id);
        inNetworkModel_GetByLocationId.request(location_id);
    }, [location_id, custom_pricing_model_id]);

    if (!location_id || !custom_pricing_model_id) return 'empty param `location_id` or `custom_pricing_model_id` in route';

    // console.log(inNetworkModel_GetById)
    return <div>
        <ButtonGoToPricingModelsTable location_id={location_id}/>
        <EditInNetworkModelName
            onSave={inNetworkModel_UpdateById.request}
            model={inNetworkModel_GetById.state}
            custom_pricing_model_id={custom_pricing_model_id}
        />
        <RoomTypePlanTable
            pricingInNetwork={inNetworkPrices}
            edition={edition}
            setEdition={setEdition}
            onSave={handleSave(
                custom_pricing_model_id,
                setEdition,
                inNetworkPrices_InsertByData.request,
                inNetworkPrices_GetByModelId.request,
            )}

            location_id={location_id}
            custom_pricing_model_id={custom_pricing_model_id}
        />
        <ImportInnetwork

            inNetworkPrices_GetByModelId={inNetworkPrices_GetByModelId.request}
            inNetworkPrices_DeleteById={inNetworkPrices_DeleteById.request}
            inNetworkPrices_InsertByData={inNetworkPrices_InsertByData.request}

            models={models}
            pricingInNetwork={inNetworkPrices}
            custom_pricing_model_id={custom_pricing_model_id}
            reload={() => inNetworkPrices_InsertByData.request(custom_pricing_model_id)}
            location_id={location_id}
        />
    </div>;
};

const EditInNetworkModelName = ({custom_pricing_model_id, model, onSave}) => {
    if (!model) return <Spinner/>;
    const handleUpdateName = (name) => onSave(custom_pricing_model_id, {name});

    return <EditModelName
        id={custom_pricing_model_id}
        initialName={ModelNameOrDefault(model.name)}
        updateNamePromise={handleUpdateName}
    />
};