import {useAuthEffect} from "./AuthController";
import Link from "@material-ui/core/Link/Link";
import React from "react";

export const ManageAccessLink = ({children, ...props}) => {

    const auth = useAuthEffect();

    if (!auth.isRequireRelogin() && auth.haveAdminAccess()) {
        return <Link {...props}>
            {children}
        </Link>
    } else {
        return null;
    }


};