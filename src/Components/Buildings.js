import React from 'react';
import {BaseList} from "../Base/BaseList";
import {BaseItem, BaseItemView} from "../Base/BaseItem";
import {RoutingConstants} from "../constants/RoutingConstants";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction/BottomNavigationAction";
import BottomNavigation from "@material-ui/core/BottomNavigation/BottomNavigation";
import {Link} from "react-router-dom";


import LocationPlanIcon from '@material-ui/icons/AccountBalance';
import {BuildingIcon} from "../icons";

export const BuildingsList = (props) => {
    return <BaseList {...props}/>;
};

const Navigation = ({selectedId}) => <BottomNavigation showLabels>
    <BottomNavigationAction
        to={`/${RoutingConstants.buildings}/`}
        component={Link}
        label="All buildings"
        icon={<BuildingIcon/>}
    />
    <BottomNavigationAction
        to={`/${RoutingConstants.buildings}/${selectedId}/${RoutingConstants.inNetworkPricing}`}
        component={Link}
        label="In-Network Pricing"
        icon={<LocationPlanIcon/>}
    />
</BottomNavigation>;

export const BuildingsItem = (props) => {
    return <BaseItem {...props}>
        {(item, itemProps) => <Navigation selectedId={props.selectedId}/>}

    </BaseItem>
};