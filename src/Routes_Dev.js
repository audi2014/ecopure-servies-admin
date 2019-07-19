import React from "react";
import {Route} from "react-router-dom";
import {LocationsTablePage} from "./Pages/Locations/LocationsTablePage";
import {Login} from "./Pages/Auth/Login";
import {AuthRoute, PrivateRoute} from "./Auth/PrivateRoute";
import {RoutingConstants} from "./constants/RoutingConstants";
import {LocationsEditPage} from "./Pages/Locations/LocationsEditPage";


export const AppRoutes = () => <React.Fragment>
    <AuthRoute
        exact
        path="/login"
        component={Login}
    />
    <PrivateRoute
        exact
        path="/"
        component={LocationsTablePage}
    />
    <PrivateRoute
        exact
        path={`/${RoutingConstants.locations}/:id/edit`}
        component={LocationsEditPage}
    />
</React.Fragment>;
