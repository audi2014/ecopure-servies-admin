import React from "react";
import {BaseTablePage} from "../../Base/BaseTablePage";
import {buildingsLarge_GetByLocationId, locations_GetById} from "../../api/Api";
import {RoutingConstants} from "../../constants/RoutingConstants";
import {
    buildColumnsFrom,
    getBuildingsTableNameByLocation, makeUsingLoadingById,
    mapColumnsKeyValueDeletedThrough,
    mapColumnsKeyValueProp
} from "./../tools";


const columns = buildColumnsFrom([
    mapColumnsKeyValueProp('title')({
        name: 'Building Name',
        address: 'Building Address',
        location_name: 'Location Name',
        // zipcode: 'Building Zip-Code',
    }),
    mapColumnsKeyValueDeletedThrough,
]);


const use_load_locations_GetById = makeUsingLoadingById(locations_GetById);


export const BuildingsOfLocationTablePage = ({match, history, fetchItems = buildingsLarge_GetByLocationId, title = "Buildings"}) => {
    const location_id = location ? +location.id : match.params.location_id;
    const [location] = use_load_locations_GetById(location_id)


    return <BaseTablePage
        renderTitle={() => getBuildingsTableNameByLocation(location, title)}
        onAddClick={() => history.push(`/${RoutingConstants.buildings}/add`)}
        fetchItems={() => fetchItems(location_id)}
        onRowClick={(event, rowData, togglePanel) => history.push(`/${RoutingConstants.buildings}/${rowData.id}/edit`)}
        columns={columns}

    />
};

export const BuildingsOfPreloadedLocationTablePage = ({match, history, fetchItems = buildingsLarge_GetByLocationId, location, title = "Buildings"}) => {
    const location_id = +location.id;

    return <BaseTablePage
        renderTitle={() => getBuildingsTableNameByLocation(location, title)}
        onAddClick={() => history.push(`/${RoutingConstants.buildings}/add`)}

        fetchItems={() => fetchItems(location_id)}
        onRowClick={(event, rowData, togglePanel) => history.push(`/${RoutingConstants.buildings}/${rowData.id}/edit`)}
        columns={columns}

    />
};