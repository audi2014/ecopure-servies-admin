import React from "react";
import {BaseTablePage} from "../../Base/BaseTablePage";
import {buildingsLarge_GetAll} from "../../api/Api";
import {RoutingConstants} from "../../constants/RoutingConstants";
import {buildColumnsFrom, mapColumnsKeyValueDeletedThrough, mapColumnsKeyValueProp} from "./../tools";


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


export const BuildingsTablePage = ({match, history, fetchItems = buildingsLarge_GetAll, title = "Buildings"}) => {
    return <BaseTablePage
        onAddClick={()=>history.push(`/${RoutingConstants.buildings}/add`)}
        renderTitle={()=>title}
        fetchItems={fetchItems}
        onRowClick={(event, rowData, togglePanel) => history.push(`/${RoutingConstants.buildings}/${rowData.id}/edit`)}
        columns={columns}

    />
};
