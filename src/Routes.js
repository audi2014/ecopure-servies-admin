import React from "react";
import {HomePage} from "./Pages/HomePage";
import {RoutingConstants} from "./constants/RoutingConstants";
import {LocationsPage} from "./Pages/LocationsPage";
import {EditLocationPage} from "./Pages/EditLocationPage";
import {BuildingsPage} from "./Pages/BuildingsPage";
import {BuildingsOfLocationPage} from "./Pages/BuildingsOfLocationPage";
import {EditBuildingPage} from "./Pages/EditBuildingPage";
import {Route} from "react-router-dom";

export const AppRoutes = () => <React.Fragment>
    <Route
        exact
        path="/"
        component={HomePage}
    />
    <Route
        exact
        path={`/${RoutingConstants.locations}`}
        component={LocationsPage}
    />
    <Route
        exact
        path={`/${RoutingConstants.locations}/:id`}
        component={EditLocationPage}
    />
    <Route
        exact
        path={`/${RoutingConstants.buildings}`}
        component={BuildingsPage}
    />
    <Route
        exact
        path={`/${RoutingConstants.locations}/:location_id/${RoutingConstants.buildings}`}
        component={BuildingsOfLocationPage}
    />
    <Route
        exact
        path={`/${RoutingConstants.buildings}/:id`}
        component={EditBuildingPage}
    />

    {/*<Route*/}
    {/*exact*/}
    {/*path={`/${RoutingConstants.locations}/:id/${RoutingConstants.outOfNetworkPricing}`}*/}
    {/*component={PricingOutOfNetworkPage}*/}
    {/*/>*/}
    {/*<Route*/}
    {/*exact*/}
    {/*path={`/${RoutingConstants.locations}/:id/${RoutingConstants.addonPricing}`}*/}
    {/*component={PricingAddOnPage}*/}
    {/*/>*/}
    {/*<Route*/}
    {/*exact*/}
    {/*path={`/${RoutingConstants.locations}/:location_id/${RoutingConstants.buildings}/:id`}*/}
    {/*component={BuildingsOfLocationPage}*/}
    {/*/>*/}

    {/*<Route*/}
    {/*exact*/}
    {/*path={`/${RoutingConstants.buildings}/:id`}*/}
    {/*component={BuildingsPage}/>*/}
    {/*<Route*/}
    {/*exact*/}
    {/*path={`/${RoutingConstants.buildings}/:id/${RoutingConstants.inNetworkPricing}`}*/}
    {/*component={PricingInNetworkPage}*/}
    {/*/>*/}
</React.Fragment>;