import React from "react";
import {
    buildings_GetByLocationId, buildingsLarge_GetByLocationId,
    locations_GetAll,
} from "../api/Api";
import {RoutingConstants} from "../constants/RoutingConstants";
import {BaseTablePage} from "../Base/BaseTablePage";
import Link from "@material-ui/core/Link/Link";
import {Config} from "../constants/Config";
import {buildColumnsFrom, mapColumnsKeyValueDeletedThrough, mapColumnsKeyValueProp} from "./tools";
import {BuildingsPage} from "./BuildingsPage";
import {BuildingsOfPreloadedLocation} from "./BuildingsOfLocationPage";


const columns = buildColumnsFrom([
    mapColumnsKeyValueProp('title')({
        name: 'Location Name',
        address: 'Location Address',
        page: 'Location Page',
    }),
    mapColumnsKeyValueProp('render')({
        page: rowData => (
            <Link
                target='_blank'
                href={`${Config.wordpressBaseUrl}/${rowData.page}`}>
                {rowData.page}
            </Link>
        ),
    }),
    mapColumnsKeyValueDeletedThrough,
]);


export const LocationsPage = ({match, history, fetchItems = locations_GetAll, title = "Locations"}) => {
    return <BaseTablePage
        title={title}
        fetchItems={fetchItems}
        onRowClick={(event, rowData, togglePanel) => history.push(`/${RoutingConstants.locations}/${rowData.id}`)}
        detailPanel={rowData => {
            return <div style={{margin: 10}}>
                <BuildingsOfPreloadedLocation
                    match={match}
                    history={history}
                    location={rowData}
                />
            </div>
        }}
        columns={columns}
    />
};
