import React from 'react';
import {BaseItem} from "../../Base/BaseItem";
import FormLabel from "@material-ui/core/FormLabel/FormLabel";
import {RoomTypePlanTable} from "./RoomTypePlanTable";
import {Over1100} from "./Over1100";
import BottomNavigation from "@material-ui/core/BottomNavigation/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction/BottomNavigationAction";
import {RoutingConstants} from "../../constants/RoutingConstants";
import {Link} from "react-router-dom";
import {AddOnIcon, BuildingIcon, LocationIcon, PriceIcon} from "../../icons";

const defaultItem = {};

const Navigation = ({location_id}) => <BottomNavigation showLabels>
    <BottomNavigationAction
        to={`/${RoutingConstants.locations}/${location_id}/${RoutingConstants.buildings}`}
        component={Link}
        label="buildings in location"
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
        label="Add-On Pricing"
        icon={<AddOnIcon/>}
    />
</BottomNavigation>;

export const PricingInNetwork = (props) => {
    const listItem = (props.items.find(v => +v.id === +props.selectedId) || defaultItem);
    return <BaseItem {...props}>
        {
            (item, itemProps) => <div key={props.selectedId}>
                <FormLabel>In-network Pricing "{listItem.address}"</FormLabel>
                <RoomTypePlanTable item={item} {...itemProps} />
                <Over1100 key={listItem.id+'-'+listItem.updated_at} listItem={listItem} item={item} {...itemProps}/>
                <Navigation location_id={listItem.location_id}/>
            </div>
        }
    </BaseItem>;
}