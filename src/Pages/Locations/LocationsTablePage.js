import React from "react";
import {
    locations_GetAll,
} from "../../api/Api";
import {RoutingConstants} from "../../constants/RoutingConstants";
import {BaseTablePage} from "../../Base/BaseTablePage";
import Link from "@material-ui/core/Link/Link";
import {Config} from "../../constants/Config";
import {buildColumnsFrom, mapColumnsKeyValueDeletedThrough, mapColumnsKeyValueProp} from "./../tools";
import {BuildingsOfPreloadedLocationTablePage} from "./../Buildings/BuildingsOfLocationTablePage";


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


export const LocationsTablePage = ({match, history, fetchItems = locations_GetAll, title = "Locations"}) => {
    return <BaseTablePage
        onAddClick={()=>history.push(`/${RoutingConstants.locations}/add`)}
        renderTitle={() => title}
        fetchItems={fetchItems}
        onRowClick={(event, rowData, togglePanel) => history.push(`/${RoutingConstants.locations}/${rowData.id}/edit`)}
        detailPanel={rowData => {
            return <div style={{margin: 10}}>
                <BuildingsOfPreloadedLocationTablePage
                    match={match}
                    history={history}
                    location={rowData}
                />
            </div>
        }}
        columns={columns}
    />
};
