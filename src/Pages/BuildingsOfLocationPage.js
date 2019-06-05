import React from "react";
import {BaseTablePage} from "../Base/BaseTablePage";
import {buildingsLarge_GetByLocationId, locations_GetById} from "../api/Api";
import {RoutingConstants} from "../constants/RoutingConstants";
import {buildColumnsFrom, mapColumnsKeyValueDeletedThrough, mapColumnsKeyValueProp} from "./tools";


const columns = buildColumnsFrom([
    mapColumnsKeyValueProp('title')({
        location_name: 'Location Name',
        name: 'Building Name',
        address: 'Building Address',
        zipcode: 'Building Zip-Code',
    }),
    mapColumnsKeyValueDeletedThrough,
]);

const useLocationLoading = (location_id) => {
    const [location, setLocation] = React.useState(null);

    async function fetchItemToState(id) {
        const result = await locations_GetById(id);
        if (result) {
            setLocation(result);
        } else {
            setLocation(false);
        }
    }

    React.useEffect(() => {
        fetchItemToState(location_id);
    }, [location_id]);

    return [location, setLocation, fetchItemToState]
};


export const BuildingsOfLocationPage = ({match, history, fetchItems = buildingsLarge_GetByLocationId, title = "Buildings"}) => {
    const location_id = location ? +location.id : match.params.location_id;
    const [location, setLocation, reload] = useLocationLoading(location_id)


    return <BaseTablePage
        title={`${title}${location ? ' of "' + location.name + '"' : ''}`}
        fetchItems={() => fetchItems(location_id)}
        onRowClick={(event, rowData, togglePanel) => history.push(`/${RoutingConstants.buildings}/${rowData.id}`)}
        columns={columns}

    />
};

export const BuildingsOfPreloadedLocation = ({match, history, fetchItems = buildingsLarge_GetByLocationId, location}) => {
    const location_id = +location.id;
    const title = `Buildings of "${location.name || '#' + location.id}"`;

    return <BaseTablePage
        title={title}
        fetchItems={() => fetchItems(location_id)}
        onRowClick={(event, rowData, togglePanel) => history.push(`/${RoutingConstants.buildings}/${rowData.id}`)}
        columns={columns}

    />
};