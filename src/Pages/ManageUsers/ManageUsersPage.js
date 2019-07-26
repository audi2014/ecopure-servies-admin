import React from "react";
import {AuthController} from "../../Auth/AuthController";
import {AccessDenied} from "../Auth/AccessDenied";
import {ManageUsersTable} from "./ManageUsersTable";
import {RoutingConstants} from "../../constants/RoutingConstants";

export const ManageUsersPage = (props) => {
    const location_ids = AuthController.getLocationAccessIds() || [];
    if (!AuthController.haveAdminAccess() && !location_ids.length) {
        return <AccessDenied {...props} />
    } else{
        return <ManageUsersTable onAddClick={() => props.history.push(`/${RoutingConstants.manageUsers}/add`)}/>
    }
};
