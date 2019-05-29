import React from 'react';
import {BaseItem} from "../../Base/BaseItem";
import FormLabel from "@material-ui/core/FormLabel/FormLabel";
import BottomNavigation from "@material-ui/core/BottomNavigation/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction/BottomNavigationAction";
import {RoutingConstants} from "../../constants/RoutingConstants";
import {Link} from "react-router-dom";
import {BuildingIcon, LocationIcon, PriceIcon} from "../../icons";
import {AddOnTable} from "./AddOnTable";

const defaultItem = {};

const Navigation = ({selectedId}) => <BottomNavigation showLabels>
    <BottomNavigationAction
        to={`/${RoutingConstants.buildings}/`}
        component={Link}
        label="All buildings"
        icon={<BuildingIcon/>}
    />
    <BottomNavigationAction
        to={`/${RoutingConstants.locations}/`}
        component={Link}
        label="All locations"
        icon={<LocationIcon/>}
    />
    <BottomNavigationAction
        to={`/${RoutingConstants.locations}/${selectedId}/${RoutingConstants.outOfNetworkPricing}`}
        component={Link}
        label="Out Of Network Pricing"
        icon={<PriceIcon/>}
    />
</BottomNavigation>;

export const PricingAddOn = (props) => {
    const listItem = (props.items.find(v => +v.id === +props.selectedId) || defaultItem);
    return <BaseItem {...props}>
        {
            (item, itemProps) => <div key={props.selectedId}>
                <FormLabel>Add-On Pricing "{listItem.address}"</FormLabel>
                <AddOnTable item={item} {...itemProps} />
                <Navigation selectedId={props.selectedId}/>
            </div>
        }
    </BaseItem>;
}