import React from 'react';
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction/BottomNavigationAction";
import BottomNavigation from "@material-ui/core/BottomNavigation/BottomNavigation";

import {BaseList} from "../Base/BaseList";
import {BaseItem, BaseItemView} from "../Base/BaseItem";
import {Link} from "react-router-dom";
import {RoutingConstants} from "../constants/RoutingConstants";
import {AddOnIcon, BuildingIcon, LocationIcon, PriceIcon} from "../icons";

export const LocationsList = (props) => {
    return <BaseList {...props}/>;
};


const Navigation = ({selectedId}) => <BottomNavigation showLabels>
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

export const LocationsItem = (props) => {
    return <BaseItem {...props}>
        {(item, itemProps) => <Navigation selectedId={props.selectedId}/>}
    </BaseItem>
};
