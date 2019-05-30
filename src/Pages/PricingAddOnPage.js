import React from 'react';
import {LocationsList} from "../Components/Locations";
import {
    locations_GetAll, addOn_GetByLocationId,
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
        fetchItems: locations_GetAll,
        fetchById: (id) => addOn_GetByLocationId(id),
        renderListItemTitle: (item) => item.address,
        selectedId: props.match.params.id,
        renderListItemTo: (id) => `/${RoutingConstants.locations}/${id}/${RoutingConstants.addonPricing}`,
        itemTitle: "Edit Add-On pricing",
        ListItemIcon:LocationIcon
    };
    return <BasePage{...p} />
};