import React from "react";

import {BaseItemCreationPage} from "../../Base/BaseItemCreationPage";
import {RoutingConstants} from "../../constants/RoutingConstants";
import {apiContexts} from "../../api/ContextApi";
import {makeBuildingsEditableTemplate} from "./makeBuildingsEditableTemplate";
import {AuthController} from "../../Auth/AuthController";
import {useLocations_GetByAccess} from "../tools_effect";


export const BuildingsAddPage = ({match, history}) => {

    const {pushError} = React.useContext(apiContexts.error);
    const {buildings_InsertByData} = React.useContext(apiContexts.buildings);
    const [locations_state, locations_request] = useLocations_GetByAccess();
    const {inNetworkModel_GetAll} = React.useContext(apiContexts.inNetworkModel);
    const models = inNetworkModel_GetAll.state || [];

    React.useEffect(() => {
        locations_request();
        inNetworkModel_GetAll.request();
    }, []);


    return <BaseItemCreationPage
        editableTemplate={makeBuildingsEditableTemplate(locations_state, models)}
        renderTitle={() => 'Create Building'}
        insertByData={(data) => {
            const location_id = data.location_id;
            const custom_pricing_model_id = data.custom_pricing_model_id;
            if (!location_id) {
                pushError('empty Location of Building', 'buildings_InsertByData',);
            } else if (
                !models.find(model => +model.id === +custom_pricing_model_id && +model.location_id === +location_id)
            ) {
                pushError('please select Pricing Model of Building', 'buildings_InsertByData',);
            } else {
                return buildings_InsertByData.request(data)
                    .then(r => {
                        if (r && r.id) {
                            history.push(`/${RoutingConstants.buildings}/${r.id}/edit`)
                        }
                    });
            }
        }}
    />
};