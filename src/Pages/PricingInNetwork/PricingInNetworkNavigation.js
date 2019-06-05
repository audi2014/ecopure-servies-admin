import React from 'react';
import BottomNavigation from "@material-ui/core/BottomNavigation/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction/BottomNavigationAction";
import {RoutingConstants} from "../../constants/RoutingConstants";
import {Link} from "react-router-dom";
import {AddOnIcon, BuildingIcon, LocationIcon, PriceIcon} from "../../icons";

export const PricingInNetworkNavigation = ({location_id, building_id}) => <BottomNavigation showLabels>
    <BottomNavigationAction
        to={`/${RoutingConstants.buildings}/${building_id}/edit`}
        component={Link}
        label="Edit building"
        icon={<BuildingIcon/>}
    />
    <BottomNavigationAction
        to={`/${RoutingConstants.locations}/${location_id}/${RoutingConstants.outOfNetworkPricing}`}
        component={Link}
        label="Out Of Network Pricing"
        icon={<PriceIcon/>}
    />
    <BottomNavigationAction
        to={`/${RoutingConstants.locations}/${location_id}/${RoutingConstants.addonPricing}`}
        component={Link}
        label="Add-On's/Extra"
        icon={<AddOnIcon/>}
    />
</BottomNavigation>;