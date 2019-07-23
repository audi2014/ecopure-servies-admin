import React from "react";
import {RoutingConstants} from "../../constants/RoutingConstants";
import {BaseTablePage} from "../../Base/BaseTablePage";
import Link from "@material-ui/core/Link/Link";
import {Config} from "../../constants/Config";
import {buildColumnsFrom, mapColumnsKeyValueDeletedThrough, mapColumnsKeyValueProp} from "./../tools";
import {apiContexts} from "../../api/ContextApi";
import {BuildingsOfLocationTablePage} from "../Buildings/BuildingsOfLocationTablePage";
import {AuthController} from "../../Auth/AuthController";
import {useLocations_GetByAccess} from "../tools_effect";


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
                href={`${Config.WORDPRESS_BASE_URL}/${rowData.page}`}>
                {rowData.page}
            </Link>
        ),
    }),
    mapColumnsKeyValueDeletedThrough,
]);


export const LocationsTablePage = ({match, history}) => {
    const title = "Locations";


    const [locations_state, locations_request, locations_pending] = useLocations_GetByAccess();

    React.useEffect(() => {
        locations_request();
    }, []);
    return <BaseTablePage
        isLoading={!!locations_pending}
        onAddClick={AuthController.haveAdminAccess() ? () => history.push(`/${RoutingConstants.locations}/add`) : null}
        renderTitle={() => title}
        staticData={locations_state}
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
