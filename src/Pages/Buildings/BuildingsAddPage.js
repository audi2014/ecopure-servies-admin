import {
    locations_GetById, buildings_InsertByData, locations_GetAll, inNetworkModel_GetAll,
} from "../../api/Api";

import React from "react";

import {BaseItemCreationPage} from "../../Base/BaseItemCreationPage";
import {RoutingConstants} from "../../constants/RoutingConstants";
import {makeBuildingsEditableTemplate} from "./BuildingsEditPage";
import {makeUsingLoadingById} from "../tools";


const use_load_locations_GetAll = makeUsingLoadingById(locations_GetAll);
const use_load_inNetworkPrices_GetAll = makeUsingLoadingById(inNetworkModel_GetAll);

export const BuildingsAddPage = ({match, history, onChange = null, fetchById = locations_GetById}) => {
    const [locations] = use_load_locations_GetAll();
    const [pricingInNetwork] = use_load_inNetworkPrices_GetAll();
    return <BaseItemCreationPage
        editableTemplate={makeBuildingsEditableTemplate(locations, pricingInNetwork)}
        renderTitle={() => 'Create Building'}
        fetchById={fetchById}
        insertByData={(data) => {

            const location_id = data.location_id;
            const custom_pricing_model_id = data.custom_pricing_model_id;
            if (!location_id) {
                return new Promise((ok, reject) => reject('empty Location of Building'))
            } else if (
                !pricingInNetwork.find(item => +item.id === +custom_pricing_model_id && +item.location_id === +location_id)
            ) {
                return new Promise((ok, reject) => reject('please select Pricing Model of Building'))
            } else {
                return buildings_InsertByData(data)
                    .then(r => {


                        if (onChange) onChange();
                        if (r && r.id) {
                            history.push(`/${RoutingConstants.buildings}/${r.id}/edit`)
                        }
                    });
            }


        }}
            >
            </BaseItemCreationPage>
        };