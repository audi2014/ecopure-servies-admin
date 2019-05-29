import {BasePage} from "../Base/BasePage";
import React from "react";
import {LocationsItem, LocationsList} from "../Components/Locations";
import {getLocationById, getLocations} from "../api/Api";
import {RoutingConstants} from "../constants/RoutingConstants";
import {LocationIcon} from "../icons";

export const LocationsPage = (props) => {
    const p = {
        ...props,
        ListComponent: LocationsList,
        ItemComponent: LocationsItem,
        fetchItems: getLocations,
        fetchById: getLocationById,
        renderListItemTitle: (item)=>item.address,
        selectedId: props.match.params.id,
        renderListItemTo: (id) => `/${RoutingConstants.locations}/` + id,
        itemTitle:"Edit location",
        ListItemIcon:LocationIcon
    };
    return <BasePage{...p} />
};