import React from "react";
import {BaseTablePage} from "../../Base/BaseTablePage";
// import {buildingsLarge_GetByLocationId, locations_GetById} from "../../api/Api";
import {RoutingConstants} from "../../constants/RoutingConstants";
import {
    buildColumnsFrom,
    getBuildingsTableNameByLocation,
    mapColumnsKeyValueDeletedThrough,
    mapColumnsKeyValueProp
} from "./../tools";
import {apiContexts} from "../../api/ContextApi";
import {predicateHideDeleted} from "../../Base/hideDeactivated";


const columns = buildColumnsFrom([
    mapColumnsKeyValueProp('title')({
        name: 'Building Name',
        address: 'Building Address',
        location_name: 'Location Name',
    }),
    mapColumnsKeyValueDeletedThrough,
]);


// const use_load_locations_GetById = makeUsingLoadingById(locations_GetById);


export const BuildingsOfLocationTablePage = ({match, history, location}) => {
    const title = 'Buildings';
    const location_id = location ? +location.id : +match.params.location_id;
    const {buildingsLarge_GetByLocationId} = React.useContext(apiContexts.buildings);
    const state_buildings = buildingsLarge_GetByLocationId.state || [];

    React.useEffect(() => {
        buildingsLarge_GetByLocationId.request(location_id);
    }, []);

    return <BaseTablePage
        isLoading={!!buildingsLarge_GetByLocationId.pending}
        renderTitle={() => getBuildingsTableNameByLocation(location, title)}
        onAddClick={() => history.push(`/${RoutingConstants.buildings}/add`)}
        staticData={state_buildings.filter(predicateHideDeleted)}
        onRowClick={(event, rowData, togglePanel) => history.push(`/${RoutingConstants.buildings}/${rowData.id}/edit`)}
        columns={columns}

    />
};

// export const BuildingsOfPreloadedLocationTablePage = ({match, history, location}) => {
//     const title = 'Buildings';
//     const location_id = +location.id;
//     const {buildingsLarge_GetByLocationId} = React.useContext(apiContexts.buildings);
//     const state_buildings = buildingsLarge_GetByLocationId.state || [];
//
//     return <BaseTablePage
//         renderTitle={() => getBuildingsTableNameByLocation(location, title)}
//         onAddClick={() => history.push(`/${RoutingConstants.buildings}/add`)}
//
//         fetchItems={() => fetchItems(location_id)}
//         onRowClick={(event, rowData, togglePanel) => history.push(`/${RoutingConstants.buildings}/${rowData.id}/edit`)}
//         columns={columns}
//
//     />
// };