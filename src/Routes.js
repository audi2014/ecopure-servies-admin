import React from "react";
import {Route} from "react-router-dom";
import {HomePage} from "./Pages/HomePage";
import {RoutingConstants} from "./constants/RoutingConstants";
import {LocationsTablePage} from "./Pages/Locations/LocationsTablePage";
import {LocationsEditPage} from "./Pages/Locations/LocationsEditPage";
import {LocationsAddPage} from "./Pages/Locations/LocationsAddPage";
import {BuildingsTablePage} from "./Pages/Buildings/BuildingsTablePage";
import {BuildingsOfLocationTablePage} from "./Pages/Buildings/BuildingsOfLocationTablePage";
import {BuildingsEditPage} from "./Pages/Buildings/BuildingsEditPage";
import {BuildingsAddPage} from "./Pages/Buildings/BuildingsAddPage";
import {PricingInNetworkPage} from "./Pages/PricingInNetwork/PricingInNetworkPage";
import {PricingOutOfNetworkPage} from "./Pages/PricingOutOfNetwork/PricingOutOfNetworkPage";
import {PricingAddOnPage} from "./Pages/PricingAddOn/PricingAddOnPage";

export const AppRoutes = () => <React.Fragment>
    <Route
        exact
        path="/"
        component={HomePage}
    />
    <Route
        exact
        path={`/${RoutingConstants.locations}`}
        component={LocationsTablePage}
    />
    <Route
        exact
        path={`/${RoutingConstants.locations}/:id/edit`}
        component={LocationsEditPage}
    />
    <Route
        exact
        path={`/${RoutingConstants.locations}/add`}
        component={LocationsAddPage}
    />
    <Route
        exact
        path={`/${RoutingConstants.buildings}`}
        component={BuildingsTablePage}
    />
    <Route
        exact
        path={`/${RoutingConstants.buildings}/add`}
        component={BuildingsAddPage}
    />
    <Route
        exact
        path={`/${RoutingConstants.locations}/:location_id/${RoutingConstants.buildings}`}
        component={BuildingsOfLocationTablePage}
    />
    <Route
        exact
        path={`/${RoutingConstants.buildings}/:id/edit`}
        component={BuildingsEditPage}
    />
    <Route
        exact
        path={`/${RoutingConstants.buildings}/:id/${RoutingConstants.inNetworkPricing}`}
        component={PricingInNetworkPage}
    />
    <Route
        exact
        path={`/${RoutingConstants.locations}/:id/${RoutingConstants.outOfNetworkPricing}`}
        component={PricingOutOfNetworkPage}
    />
    <Route
        exact
        path={`/${RoutingConstants.locations}/:id/${RoutingConstants.addonPricing}`}
        component={PricingAddOnPage}
    />
    {/*<Route*/}
    {/*exact*/}
    {/*path={`/${RoutingConstants.locations}/:location_id/${RoutingConstants.buildings}/:id`}*/}
    {/*component={BuildingsOfLocationPage}*/}
    {/*/>*/}

    {/*<Route*/}
    {/*exact*/}
    {/*path={`/${RoutingConstants.buildings}/:id`}*/}
    {/*component={BuildingsTablePage}/>*/}

</React.Fragment>;