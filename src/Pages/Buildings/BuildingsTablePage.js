import React from "react";
import {BaseTablePage} from "../../Base/BaseTablePage";
import {buildingsLarge_GetAll, locations_GetAll} from "../../api/Api";
import {RoutingConstants} from "../../constants/RoutingConstants";
import {
    buildColumnsFrom,
    makeUsingLoadingById,
    mapColumnsKeyValueDeletedThrough,
    mapColumnsKeyValueProp
} from "./../tools";
import {Select} from "../../Base/BaseInput";


const columns = buildColumnsFrom([
    mapColumnsKeyValueProp('title')({
        location_name: 'Location Name',
        name: 'Building Name',
        address: 'Building Address',
        zipcode: 'Building Zip-Code',
    }),
    mapColumnsKeyValueProp('render')({
        location_name: (rowData) => rowData.location_name || 'Location #' + rowData.location_id,
    }),
    mapColumnsKeyValueProp('customFilterAndSearch')({
        location_name: (rowData) => rowData.location_name || 'Location #' + rowData.location_id,
    }),
    mapColumnsKeyValueDeletedThrough,
]);


const use_load_buildingsLarge_GetAll = makeUsingLoadingById(buildingsLarge_GetAll);
const use_load_locations_GetAll = makeUsingLoadingById(locations_GetAll);

export const BuildingsTablePage = ({match, history, fetchItems = buildingsLarge_GetAll, title = "Buildings"}) => {
    const [locations] = use_load_locations_GetAll();
    const [buildings, _, reload] = use_load_buildingsLarge_GetAll();
    const [filtered_location_id, setLocationId] = React.useState('all');
    const LocationsId_Name = (locations || []).reduce((prev, curr) => {
        prev[curr.id] = curr.name || 'Location #' + curr.id;
        return prev;
    }, {'all': 'All Locations'});

    const staticData = filtered_location_id === 'all'
        ? (buildings || [])
        : (buildings || []).filter(b => +b.location_id === +filtered_location_id);
    return <BaseTablePage
        onAddClick={() => history.push(`/${RoutingConstants.buildings}/add`)}
        renderTitle={() => <React.Fragment>
            {title}
            <Select
                errorValue={false}
                keyValue={LocationsId_Name} label={'Locations'}
                value={filtered_location_id}
                setValue={setLocationId}
                style={{width: 200, marginLeft: 10}}/>
        </React.Fragment>}
        staticData={staticData}
        isLoading={buildings === null}
        onRowClick={(event, rowData, togglePanel) => history.push(`/${RoutingConstants.buildings}/${rowData.id}/edit`)}
        columns={columns}

    />
};
