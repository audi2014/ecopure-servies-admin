import React from "react";

import {BaseItemCreationPage} from "../../Base/BaseItemCreationPage";
import {locations_GetById, locations_InsertByData} from "../../api/Api";
import Link from "@material-ui/core/Link/Link";
import {RoutingConstants} from "../../constants/RoutingConstants";
import TextField from "@material-ui/core/TextField/TextField";

export const locationsEditableTemplate = [
    {
        field: 'page',
        title: "Location Wordpress Page",
    },
    {
        field: 'name',
        title: "Location Name",
    },
    {
        field: 'address',
        title: "Location Address",
    },
    {
        field: 'tel',
        title: "Location Phone Number",
    },
    {
        field: 'email',
        title: "Location Email",
    },
    {
        field: 'google_place_id',
        title: "Google Place Id",
        Input: ({value, setValue, className, fieldData}) => <React.Fragment><TextField
            label={fieldData.title}
            className={className}
            value={value}
            onChange={e => setValue(e.target.value)}
            margin="normal"
            variant="outlined"
        />
            <Link
                target="_blank"
                rel="noreferrer"
                href='https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder'>How
                to get Google place id?</Link>
        </React.Fragment>
    },
];

export const LocationsAddPage = ({match, history, onChange = null, fetchById = locations_GetById}) => {
    return <BaseItemCreationPage
        editableTemplate={locationsEditableTemplate}
        renderTitle={() => 'Create Location'}
        fetchById={fetchById}
        insertByData={(data) => locations_InsertByData(data).then(r => {
            if (onChange) onChange()
            if (r && r.id) {
                history.push(`/${RoutingConstants.locations}/${r.id}/edit`)
            }
        })}
    >
    </BaseItemCreationPage>
};