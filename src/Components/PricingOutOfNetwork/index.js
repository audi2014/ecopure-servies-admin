import React from 'react';
import {BaseItem} from "../../Base/BaseItem";
import {FootageTable} from "./Footage";
import {StairsTable} from "./Stairs";
import FormLabel from "@material-ui/core/FormLabel/FormLabel";
import BottomNavigation from "@material-ui/core/BottomNavigation/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction/BottomNavigationAction";
import {RoutingConstants} from "../../constants/RoutingConstants";
import {Link} from "react-router-dom";
import {AddOnIcon, BuildingIcon, LocationIcon, PriceIcon} from "../../icons";

const Navigation = ({selectedId}) => <BottomNavigation showLabels>
    <BottomNavigationAction
        to={`/${RoutingConstants.locations}/`}
        component={Link}
        label="All locations"
        icon={<LocationIcon/>}
    />
    <BottomNavigationAction
        to={`/${RoutingConstants.buildings}/`}
        component={Link}
        label="All buildings"
        icon={<BuildingIcon/>}
    />
    <BottomNavigationAction
        to={`/${RoutingConstants.locations}/${selectedId}/${RoutingConstants.addonPricing}`}
        component={Link}
        label="Add-On's/Extra"
        icon={<AddOnIcon/>}
    />
</BottomNavigation>;

export const PricingOutOfNetwork = (props) => {
    return <BaseItem {...props}>
        {
            (item, itemProps) => <div key={itemProps.selectedId}>
                <FormLabel>Out-of-network Pricing
                    "{(props.items.find(v => +v.id === +props.selectedId) || {}).address}"</FormLabel>,
                <FootageTable item={item} {...itemProps} />
                <StairsTable item={item} {...itemProps} />
                <Navigation selectedId={props.selectedId}/>
            </div>
        }
    </BaseItem>;
}