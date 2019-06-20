import React from "react";
import {Route} from "react-router-dom";
import {RoutingConstants} from "./constants/RoutingConstants";
import {LocationsTablePage} from "./Pages/Locations/LocationsTablePage";
import {BuildingsTablePage} from "./Pages/Buildings/BuildingsTablePage";
import {BuildingsEditPage} from "./Pages/Buildings/BuildingsEditPage";
import {BuildingsAddPage} from "./Pages/Buildings/BuildingsAddPage";
import {LocationsEditPage} from "./Pages/Locations/LocationsEditPage";
import {LocationsAddPage} from "./Pages/Locations/LocationsAddPage";
import {PricingAddOnPage} from "./Pages/PricingAddOn/PricingAddOnPage";
import {PricingOutOfNetworkPage} from "./Pages/PricingOutOfNetwork/PricingOutOfNetworkPage";
import {PricingInNetworkAddPage} from "./Pages/PricingInNetwork/PricingInNetworkAddPage";
import {PricingInNetworkPage} from "./Pages/PricingInNetwork/PricingInNetworkPage";

export const AppRoutes = () => <React.Fragment>
    <Route
        exact
        path="/"
        component={LocationsTablePage}
    />
    <Route
        exact
        path={`/${RoutingConstants.locations}`}
        component={LocationsTablePage}
    />
    <Route
        exact
        path={`/${RoutingConstants.locations}/add`}
        component={LocationsAddPage}
    />
    <Route
        exact
        path={`/${RoutingConstants.locations}/:id/edit`}
        component={LocationsEditPage}
    />
    <Route
        exact
        path={`/${RoutingConstants.locations}/:id/${RoutingConstants.editPricingOfLocation}`}
        component={LocationsEditPage}
    />

    <Route
        exact
        path={`/${RoutingConstants.buildings}/add`}
        component={BuildingsAddPage}
    />
    <Route
        exact
        path={`/${RoutingConstants.buildings}`}
        component={BuildingsTablePage}
    />
    <Route
        exact
        path={`/${RoutingConstants.buildings}/:id/edit`}
        component={BuildingsEditPage}
    />
    <Route
        exact
        path={`/${RoutingConstants.locations}/:id/${RoutingConstants.addonPricing}`}
        component={PricingAddOnPage}
    />
    <Route
        exact
        path={`/${RoutingConstants.locations}/:id/${RoutingConstants.outOfNetworkPricing}`}
        component={PricingOutOfNetworkPage}
    />
    <Route
        exact
        path={`/${RoutingConstants.locations}/:location_id/${RoutingConstants.inNetworkPricing}/add`}
        component={PricingInNetworkAddPage}
    />
    <Route
        exact
        path={`/${RoutingConstants.locations}/:location_id/${RoutingConstants.inNetworkPricing}/:id/edit`}
        component={PricingInNetworkPage}
    />

</React.Fragment>;
