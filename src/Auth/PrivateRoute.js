import React from 'react'
import {Redirect, Route} from "react-router-dom";
import {AuthController} from "./AuthController";

export const PrivateRoute = ({component: Component, redirectTo = '/login', ...rest}) => {
    return (
        <Route {...rest} render={(props) => (
            AuthController.isRequireRelogin()
                ? <Redirect to={redirectTo}/>
                : <Component {...props} />
        )}/>
    )
};

export const AuthRoute = ({component: Component, redirectTo = '/', ...rest}) => {
    return (
        <Route {...rest} render={(props) => (
            AuthController.isRequireRelogin()
                ? <Component {...props} />
                : <Redirect to={redirectTo}/>
        )}/>
    )
};