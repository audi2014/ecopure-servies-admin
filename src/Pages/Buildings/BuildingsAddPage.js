import React from "react";

import {BaseItemCreationPage} from "../../Base/BaseItemCreationPage";
import {RoutingConstants} from "../../constants/RoutingConstants";
import {apiContexts} from "../../api/ContextApi";
import {makeBuildingsEditableTemplate} from "./makeBuildingsEditableTemplate";


export const BuildingsAddPage = ({match, history}) => {

    const {pushError} = React.useContext(apiContexts.error);

    const {buildings_InsertByData} = React.useContext(apiContexts.buildings);

    const {locations_GetAll} = React.useContext(apiContexts.locations);
    const state_locations = locations_GetAll.state || [];

    const {inNetworkModel_GetAll} = React.useContext(apiContexts.inNetworkModel);
    const models = inNetworkModel_GetAll.state || [];


    React.useEffect(() => {
        locations_GetAll.request();
        inNetworkModel_GetAll.request();
    }, []);


    return <BaseItemCreationPage
        editableTemplate={makeBuildingsEditableTemplate(state_locations, models)}
        renderTitle={() => 'Create Building'}
        insertByData={(data) => {
            const location_id = data.location_id;
            const custom_pricing_model_id = data.custom_pricing_model_id;
            if (!location_id) {
                pushError('buildings_InsertByData', 'empty Location of Building');
            } else if (
                !models.find(model => +model.id === +custom_pricing_model_id && +model.location_id === +location_id)
            ) {
                pushError('buildings_InsertByData', 'please select Pricing Model of Building');
            } else {
                return buildings_InsertByData.request(data)
                    .then(r => {
                        if (r && r.id) {
                            history.push(`/${RoutingConstants.buildings}/${r.id}/edit`)
                        }
                    });
            }
        }}
    >
    </BaseItemCreationPage>
};