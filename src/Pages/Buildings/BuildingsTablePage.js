import React from "react";
import {BaseTablePage} from "../../Base/BaseTablePage";
import {RoutingConstants} from "../../constants/RoutingConstants";
import {
    buildColumnsFrom,
    mapColumnsKeyValueDeletedThrough,
    mapColumnsKeyValueProp
} from "./../tools";
import {Select} from "../../Base/BaseInput";
import {apiContexts} from "../../api/ContextApi";


const columns = buildColumnsFrom([
    mapColumnsKeyValueProp('title')({
        name: 'Building Name',
        address: 'Building Address',
        // zipcode: 'Building Zip-Code',
        location_name: 'Location Name',
    }),
    mapColumnsKeyValueProp('render')({
        location_name: (rowData) => rowData.location_name || 'Location #' + rowData.location_id,
    }),
    mapColumnsKeyValueProp('customFilterAndSearch')({
        location_name: (rowData) => rowData.location_name || 'Location #' + rowData.location_id,
    }),
    mapColumnsKeyValueDeletedThrough,
]);


export const BuildingsTablePage = ({match, history}) => {
    const title = 'Buildings';

    const {buildingsLarge_GetAll} = React.useContext(apiContexts.buildings);
    const state_buildings = buildingsLarge_GetAll.state || [];

    const {locations_GetAll} = React.useContext(apiContexts.locations);
    const state_locations = locations_GetAll.state || [];


    const [filtered_location_id, setLocationId] = React.useState('all');
    const LocationsId_Name = state_locations.reduce((prev, curr) => {
        prev[curr.id] = curr.name || 'Location #' + curr.id;
        return prev;
    }, {'all': 'All Locations'});
    const staticData = filtered_location_id === 'all'
        ? state_buildings
        : state_buildings.filter(b => +b.location_id === +filtered_location_id);

    React.useEffect(() => {
        buildingsLarge_GetAll.request();
        locations_GetAll.request();
    }, []);

    return <BaseTablePage
        onAddClick={() => history.push(`/${RoutingConstants.buildings}/add`)}
        renderTitle={() => <React.Fragment>
            {title}
            <Select
                label={'Filter Locations'}
                errorValue={false}
                keyValue={LocationsId_Name}
                value={filtered_location_id}
                setValue={setLocationId}
                style={{width: 200, marginLeft: 10}}/>
        </React.Fragment>}
        staticData={staticData}
        isLoading={!!buildingsLarge_GetAll.pending}
        onRowClick={(event, rowData, togglePanel) => history.push(`/${RoutingConstants.buildings}/${rowData.id}/edit`)}
        columns={columns}

    />
};
