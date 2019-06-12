import React from 'react';
import BottomNavigation from "@material-ui/core/BottomNavigation/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction/BottomNavigationAction";
import {RoutingConstants} from "../../constants/RoutingConstants";
import {Link} from "react-router-dom";
import {BuildingIcon, PriceIcon} from "../../icons";

export const PricingAddOnNavigation = ({location_id}) => <BottomNavigation showLabels>
    <BottomNavigationAction
        to={`/${RoutingConstants.locations}/${location_id}/${RoutingConstants.buildings}`}
        component={Link}
        label="Buildings in location"
        icon={<BuildingIcon/>}
    />
    <BottomNavigationAction
        to={`/${RoutingConstants.locations}/${location_id}/${RoutingConstants.outOfNetworkPricing}`}
        component={Link}
        label="Out Of Network Pricing"
        icon={<PriceIcon/>}
    />
</BottomNavigation>;