import React from "react";
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
import {Login} from "./Pages/Auth/Login";
import {AuthRoute, PrivateRoute} from "./Auth/PrivateRoute";
import {ManagerAccessPage} from "./Pages/Managers/ManagerAccessPage";
import {SignUp} from "./Pages/Auth/SignUp";
import {SendResetPasswordEmail} from "./Pages/Auth/SendResetPasswordEmail";
import {LoginWithNewPassword} from "./Pages/Auth/LoginWithNewPassword";
import {ManageUsersPage} from "./Pages/ManageUsers/ManageUsersPage";


export const AppRoutes = () => <React.Fragment>
    <AuthRoute
        exact
        path="/login"
        component={Login}
    />
    <AuthRoute
        exact
        path="/signup"
        component={SignUp}
    />
    <AuthRoute
        exact
        path="/send-password-reset"
        component={SendResetPasswordEmail}
    />
    <AuthRoute
        exact
        path="/reset-password"
        component={LoginWithNewPassword}
    />


    <PrivateRoute
        exact
        path="/"
        component={LocationsTablePage}
    />
    <PrivateRoute
        exact
        path={`/${RoutingConstants.locations}`}
        component={LocationsTablePage}
    />
    <PrivateRoute
        exact
        requireAdminAccess={true}
        path={`/${RoutingConstants.locations}/add`}
        component={LocationsAddPage}
    />
    <PrivateRoute
        exact
        locationIdAccessKey={'id'}
        path={`/${RoutingConstants.locations}/:id/edit`}
        component={LocationsEditPage}
    />
    <PrivateRoute
        exact
        locationIdAccessKey={'id'}
        path={`/${RoutingConstants.locations}/:id/${RoutingConstants.editPricingOfLocation}`}
        component={LocationsEditPage}
    />
    <PrivateRoute
        exact
        path={`/${RoutingConstants.buildings}/add`}
        component={BuildingsAddPage}
    />
    <PrivateRoute
        exact
        path={`/${RoutingConstants.buildings}`}
        component={BuildingsTablePage}
    />
    <PrivateRoute
        exact
        path={`/${RoutingConstants.buildings}/:id/edit`}
        component={BuildingsEditPage}
    />
    <PrivateRoute
        exact
        locationIdAccessKey={'id'}
        path={`/${RoutingConstants.locations}/:id/${RoutingConstants.addonPricing}`}
        component={PricingAddOnPage}
    />
    <PrivateRoute
        exact
        locationIdAccessKey={'id'}
        path={`/${RoutingConstants.locations}/:id/${RoutingConstants.outOfNetworkPricing}`}
        component={PricingOutOfNetworkPage}
    />
    <PrivateRoute
        exact
        locationIdAccessKey={'location_id'}
        path={`/${RoutingConstants.locations}/:location_id/${RoutingConstants.inNetworkPricing}/add`}
        component={PricingInNetworkAddPage}
    />
    <PrivateRoute
        exact
        locationIdAccessKey={'location_id'}
        path={`/${RoutingConstants.locations}/:location_id/${RoutingConstants.inNetworkPricing}/:id/edit`}
        component={PricingInNetworkPage}
    />
    <PrivateRoute
        exact
        requireAdminAccess={true}
        path={`/${RoutingConstants.manageAccess}`}
        component={ManagerAccessPage}
    />
    <PrivateRoute
        exact
        path={`/${RoutingConstants.manageUsers}`}
        component={ManageUsersPage}
    />




</React.Fragment>;
