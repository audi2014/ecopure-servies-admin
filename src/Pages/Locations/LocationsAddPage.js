import React from "react";

import {BaseItemCreationPage} from "../../Base/BaseItemCreationPage";
import {RoutingConstants} from "../../constants/RoutingConstants";
import {apiContexts} from "../../api/ContextApi";
import {makeLocationEditableTemplate} from "./makeLocationEditableTemplate";

const handleInsert = (request, history) => data => request(data)
    .then(r => {
        if (r && r.id) {
            history.push(`/${RoutingConstants.locations}/${r.id}/edit`)
        }
    });

export const LocationsAddPage = ({match, history}) => {
    const {locations_InsertByData} = React.useContext(apiContexts.locations);

    return <BaseItemCreationPage
        editableTemplate={makeLocationEditableTemplate()}
        renderTitle={() => 'Create Location'}
        insertByData={handleInsert(locations_InsertByData.request, history)}
    />
};