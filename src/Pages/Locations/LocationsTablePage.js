import React from "react";
import {RoutingConstants} from "../../constants/RoutingConstants";
import {BaseTablePage} from "../../Base/BaseTablePage";
import Link from "@material-ui/core/Link/Link";
import {Config} from "../../constants/Config";
import {buildColumnsFrom, mapColumnsKeyValueDeletedThrough, mapColumnsKeyValueProp} from "./../tools";
import {apiContexts} from "../../api/ContextApi";
import {BuildingsOfLocationTablePage} from "../Buildings/BuildingsOfLocationTablePage";


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


export const LocationsTablePage = ({match, history}) => {
    const title = "Locations";

    const {locations_GetAll} = React.useContext(apiContexts.locations);
    const locations = locations_GetAll.state || [];
    React.useEffect(() => {
        locations_GetAll.request();
    }, []);

    return <BaseTablePage
        isLoading={!!locations_GetAll.pending}
        onAddClick={() => history.push(`/${RoutingConstants.locations}/add`)}
        renderTitle={() => title}
        staticData={locations}
        onRowClick={(event, rowData, togglePanel) => history.push(`/${RoutingConstants.locations}/${rowData.id}/edit`)}
        detailPanel={rowData => {
            return <div style={{margin: 10}}>
                <BuildingsOfLocationTablePage
                match={match}
                history={history}
                location={rowData}
                />
            </div>
        }}
        columns={columns}
    />
};
