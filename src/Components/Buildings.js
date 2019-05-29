import React from 'react';
import {BaseList} from "../Base/BaseList";
import {BaseItem, BaseItemView} from "../Base/BaseItem";
import {RoutingConstants} from "../constants/RoutingConstants";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction/BottomNavigationAction";
import BottomNavigation from "@material-ui/core/BottomNavigation/BottomNavigation";
import {Link} from "react-router-dom";


import BackspaceIcon from '@material-ui/icons/Backspace';
import BuildingIcon from '@material-ui/icons/AccountBalance';
import LocationPlanIcon from '@material-ui/icons/AccountBalance';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export const BuildingsList = (props) => {
    return <BaseList {...props}/>;
};

const Navigation = ({selectedId}) => <BottomNavigation showLabels>
    <BottomNavigationAction
        to={`/${RoutingConstants.buildings}/`}
        component={Link}
        label="Back"
        icon={<BackspaceIcon/>}
    />
    <BottomNavigationAction
        to={`/${RoutingConstants.buildings}/${selectedId}/${RoutingConstants.inNetworkPricing}`}
        component={Link}
        label="In-Network Pricing"
        icon={<LocationPlanIcon/>}
    />
    {/*<BottomNavigationAction*/}
    {/*label="Delete"*/}
    {/*icon={<DeleteIcon/>}*/}
    {/*/>*/}
    {/*<BottomNavigationAction*/}
    {/*label="Delete Forever"*/}
    {/*icon={<DeleteForeverIcon/>}*/}
    {/*/>*/}
</BottomNavigation>;

export const BuildingsItem = (props) => {
    return <BaseItem {...props}>
        {(item, itemProps) => <BaseItemView key={item.id} item={item} {...itemProps}>
            <Navigation selectedId={props.selectedId}/>
        </BaseItemView>}

    </BaseItem>
};