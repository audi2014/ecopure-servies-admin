import React from 'react';
import {LocationsList} from "../Components/Locations";
import {
    getLocations, getPricing_AddOn_byLocationId,
} from "../api/Api";
import {RoutingConstants} from "../constants/RoutingConstants";
import {BasePage} from "../Base/BasePage";
import {LocationIcon} from "../icons";
import {PricingAddOn} from "../Components/PricingAddOn";

export const PricingAddOnPage = (props) => {
    const p = {
        ...props,
        ListComponent: LocationsList,
        ItemComponent: PricingAddOn,
        fetchItems: getLocations,
        fetchById: (id) => getPricing_AddOn_byLocationId(id),
        renderListItemTitle: (item) => item.address,
        selectedId: props.match.params.id,
        renderListItemTo: (id) => `/${RoutingConstants.locations}/${id}/${RoutingConstants.addonPricing}`,
        itemTitle: "Edit Add-On pricing",
        ListItemIcon:LocationIcon
    };
    return <BasePage{...p} />
};