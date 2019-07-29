import React from 'react'
import {Redirect, Route} from "react-router-dom";
import {AuthController} from "./AuthController";
import {AccessDenied} from "../Pages/Auth/AccessDenied";

export const PrivateRoute = ({
                                 component: Component,
                                 redirectTo = '/login',
                                 requireAdminAccess = false,
                                 requireLocationAccess = true,
                                 locationIdAccessKey = null,
                                 ...rest
                             }) => {

    return (
        <Route {...rest} render={(props) => {
            if (AuthController.isRequireRelogin()) {
                AuthController.setLoginRedirectUrl(props.location.pathname)
                return <Redirect to={redirectTo}/>;
            } else if (
                !AuthController.haveAdminAccess()
                &&
                (
                    (requireAdminAccess)
                    ||
                    (locationIdAccessKey && !AuthController.haveLocationAccess(+props.match.params[locationIdAccessKey]))
                    ||
                    (requireLocationAccess && !AuthController.getLocationAccessIds().length)
                )
            ) {
                return <AccessDenied {...props}/>

            } else {
                return <Component {...props} />;
            }
        }}/>
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