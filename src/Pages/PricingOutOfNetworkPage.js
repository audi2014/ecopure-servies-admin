import React from 'react';
import {LocationsList} from "../Components/Locations";
import {
    getLocations,
    getPricing_OutOfNetwork_Footage_byLocationId, getPricing_OutOfNetwork_Stairs_byLocationId
} from "../api/Api";
import {RoutingConstants} from "../constants/RoutingConstants";
import {BasePage} from "../Base/BasePage";
import {PricingOutOfNetwork} from "../Components/PricingOutOfNetwork/index";
import {LocationIcon} from "../icons";

export const PricingOutOfNetworkPage = (props) => {
    const p = {
        ...props,
        ListComponent: LocationsList,
        ItemComponent: PricingOutOfNetwork,
        fetchItems: getLocations,
        fetchById: (id) => Promise.all([
            getPricing_OutOfNetwork_Footage_byLocationId(id),
            getPricing_OutOfNetwork_Stairs_byLocationId(id),
        ]).then(array => {
            return {
                footage: array[0],
                stairs: array[1],
            }
        }),
        renderListItemTitle: (item) => item.address,
        selectedId: props.match.params.id,
        renderListItemTo: (id) => `/${RoutingConstants.locations}/${id}/${RoutingConstants.outOfNetworkPricing}`,
        itemTitle: "Edit Out Of Network pricing",
        ListItemIcon:LocationIcon
    };
    return <BasePage{...p} />
};