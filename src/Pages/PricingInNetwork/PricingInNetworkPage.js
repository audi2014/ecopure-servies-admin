import React from "react";
import {
    inNetworkModel_GetById, inNetworkModel_InsertByData, inNetworkModel_UpdateById,
} from "../../api/Api";
import {RoomTypePlanTable} from "./RoomTypePlanTable";
import {Spinner} from "../../icons";
import {makeUsingLoadingById} from "../tools";
import {RoutingConstants} from "../../constants/RoutingConstants";
import {EditModelName, EditModelView} from "../../Base/EditModelName";
import {ButtonGoToPricingModelsTable} from "../../Base/Buttons";
import {ModelNameOrDefault} from "../../Base/tools";

const use_load_inNetworkModel_GetById = makeUsingLoadingById(inNetworkModel_GetById);


const CreateModel = ({location_id, initialName, history}) => {
    const [name, setName] = React.useState(ModelNameOrDefault(initialName));
    const [isLoading, setLoading] = React.useState(false);

    const handleCancelClick = () => history.push(`/${RoutingConstants.locations}/${location_id}/${RoutingConstants.editPricingOfLocation}`);
    const handleInsertClick = () => {
        setLoading(true);
        inNetworkModel_InsertByData({name, location_id})
            .then(r => {
                if (r) history.push(
                    `/${RoutingConstants.locations}/${location_id}/${RoutingConstants.inNetworkPricing}/${r.id}/edit`
                );
            })
    };
    return <EditModelView
        onSave={handleInsertClick}
        onCancel={handleCancelClick}
        isLoading={isLoading}
        setName={setName}
        name={name}
    />
};

const EditInNetworkModelName = ({custom_pricing_model_id}) => {
    const [model] = use_load_inNetworkModel_GetById(custom_pricing_model_id);
    if (model === false) return 'error.';
    if (!model) return <Spinner/>;
    const handleUpdateName = (name) => inNetworkModel_UpdateById(custom_pricing_model_id, {name});

    return <EditModelName
        id={custom_pricing_model_id}
        initialName={model.name}
        updateNamePromise={handleUpdateName}
    />
};

export const PricingInNetworkPage = ({match, history}) => {
    const custom_pricing_model_id = match.params.id;
    const location_id = match.params.location_id;
    if (!location_id) return 'empty param `location_id` in route';


    return <div>

        <ButtonGoToPricingModelsTable location_id={location_id}/>
        {
            custom_pricing_model_id
                ? <EditInNetworkModelName
                    custom_pricing_model_id={custom_pricing_model_id}
                />
                : <CreateModel
                    location_id={location_id}
                    history={history}
                />
        }
        {
            custom_pricing_model_id
                ? <RoomTypePlanTable
                    location_id={location_id}
                    custom_pricing_model_id={custom_pricing_model_id}
                />
                : null
        }
    </div>;
};