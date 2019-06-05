import React from 'react';
import BottomNavigation from "@material-ui/core/BottomNavigation/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction/BottomNavigationAction";
import {RoutingConstants} from "../../constants/RoutingConstants";
import {Link} from "react-router-dom";
import {AddOnIcon, BuildingIcon} from "../../icons";
export const PricingOutOfNetworkNavigation = ({location_id}) => <BottomNavigation showLabels>
    <BottomNavigationAction
        to={`/${RoutingConstants.locations}/${location_id}/${RoutingConstants.buildings}`}
        component={Link}
        label="buildings in location"
        icon={<BuildingIcon/>}
    />
    <BottomNavigationAction
        to={`/${RoutingConstants.locations}/${location_id}/${RoutingConstants.addonPricing}`}
        component={Link}
        label="Add-On's/Extra"
        icon={<AddOnIcon/>}
    />
</BottomNavigation>;