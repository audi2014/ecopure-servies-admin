import BottomNavigation from "@material-ui/core/BottomNavigation/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction/BottomNavigationAction";
import {Link} from "react-router-dom";
import React from "react";
import {RoutingConstants} from "../../constants/RoutingConstants";
import {AddOnIcon, BuildingIcon, PriceIcon} from "../../icons";

export const LocationsNavigation = ({selectedId}) => <BottomNavigation showLabels>
    <BottomNavigationAction
        to={`/${RoutingConstants.locations}/${selectedId}/${RoutingConstants.buildings}`}
        component={Link}
        label="buildings in location"
        icon={<BuildingIcon/>}
    />
    <BottomNavigationAction
        to={`/${RoutingConstants.locations}/${selectedId}/${RoutingConstants.outOfNetworkPricing}`}
        component={Link}
        label="Out Of Network Pricing"
        icon={<PriceIcon/>}
    />
    <BottomNavigationAction
        to={`/${RoutingConstants.locations}/${selectedId}/${RoutingConstants.addonPricing}`}
        component={Link}
        label="Add-On's/Extra"
        icon={<AddOnIcon/>}
    />
</BottomNavigation>;