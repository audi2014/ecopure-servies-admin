import React from "react";
import Typography from "@material-ui/core/Typography/Typography";
import FormControl from "@material-ui/core/FormControl/FormControl";
import {Link as RouterLink} from "react-router-dom";
import Link from "@material-ui/core/Link/Link";
import {RoutingConstants} from "../../constants/RoutingConstants";

export const SuccessfullyBooked = ({user_id}) => {


    return <FormControl>
        <Typography style={{margin: 20}} variant="h6">
            Successfully Booked!
        </Typography>

        <Link component={RouterLink}
              to={`/${RoutingConstants.manageUsers}/add`}
              href='#'
              variant="body2">
            Add new User
        </Link>
        <br/>
        <Link component={RouterLink}
              to={`/${RoutingConstants.manageUsers}/${user_id}/edit`}
              href='#'
              variant="body2">
            Edit User
        </Link>
        <br/>
        <Link component={RouterLink}
              to={`/${RoutingConstants.manageUsers}`}
              href='#'
              variant="body2">
            All Users
        </Link>
        <br/>

    </FormControl>
};