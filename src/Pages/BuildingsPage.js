import React from "react";
import {BaseTablePage} from "../Base/BaseTablePage";
import {buildingsLarge_GetAll} from "../api/Api";
import {RoutingConstants} from "../constants/RoutingConstants";
import {buildColumnsFrom, mapColumnsKeyValueDeletedThrough, mapColumnsKeyValueProp} from "./tools";
import Link from "@material-ui/core/Link/Link";
import {Config} from "../constants/Config";


const columns = buildColumnsFrom([
    mapColumnsKeyValueProp('title')({
        location_name: 'Location Name',
        name: 'Building Name',
        address: 'Building Address',
        zipcode: 'Building Zip-Code',
    }),

    mapColumnsKeyValueProp('defaultGroupOrder')({
        location_name: 0,
    }),
    mapColumnsKeyValueDeletedThrough,
]);


export const BuildingsPage = ({match, history, fetchItems = buildingsLarge_GetAll, title = "Buildings"}) => {
    return <BaseTablePage
        title={title}
        fetchItems={fetchItems}
        onRowClick={(event, rowData, togglePanel) => history.push(`/${RoutingConstants.buildings}/${rowData.id}`)}
        columns={columns}

    />
};
