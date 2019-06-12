import BottomNavigation from "@material-ui/core/BottomNavigation/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction/BottomNavigationAction";
import {Link} from "react-router-dom";
import React from "react";
import {RoutingConstants} from "../../constants/RoutingConstants";

import LocationPlanIcon from '@material-ui/icons/AccountBalance';
import {BuildingIcon} from "../../icons";

export const  BuildingsItemNavigation = ({building_id}) => <BottomNavigation showLabels>
    <BottomNavigationAction
        to={`/${RoutingConstants.buildings}/`}
        component={Link}
        label="All buildings"
        icon={<BuildingIcon/>}
    />
    <BottomNavigationAction
        to={`/${RoutingConstants.buildings}/${building_id}/${RoutingConstants.inNetworkPricing}`}
        component={Link}
        label="In-Network Pricing"
        icon={<LocationPlanIcon/>}
    />
</BottomNavigation>;