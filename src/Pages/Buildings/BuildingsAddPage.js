import {
    locations_GetById, buildings_InsertByData, locations_GetAll,
} from "../../api/Api";

import React from "react";

import {BaseItemCreationPage} from "../../Base/BaseItemCreationPage";
import {RoutingConstants} from "../../constants/RoutingConstants";
import {makeBuildingsEditableTemplate} from "./BuildingsEditPage";
import {makeUsingLoadingById} from "../tools";


const use_load_locations_GetAll = makeUsingLoadingById(locations_GetAll);

export const BuildingsAddPage = ({match, history, onChange = null, fetchById = locations_GetById}) => {
    const [locations] = use_load_locations_GetAll();
    return <BaseItemCreationPage
        editableTemplate={makeBuildingsEditableTemplate(locations)}
        renderTitle={() => 'Create Building'}
        fetchById={fetchById}
        insertByData={(data) => buildings_InsertByData(data).then(r => {
            if (onChange) onChange();
            if (r && r.id) {
                history.push(`/${RoutingConstants.buildings}/${r.id}/edit`)
            }
        })}
    >
    </BaseItemCreationPage>
};