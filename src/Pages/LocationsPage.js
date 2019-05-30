import {BasePage} from "../Base/BasePage";
import React from "react";
import {LocationsItem, LocationsList} from "../Components/Locations";
import {locations_GetById, locations_GetAll} from "../api/Api";
import {RoutingConstants} from "../constants/RoutingConstants";
import {LocationIcon} from "../icons";

export const LocationsPage = (props) => {
    const p = {
        ...props,
        ListComponent: LocationsList,
        ItemComponent: LocationsItem,
        fetchItems: locations_GetAll,
        fetchById: locations_GetById,
        renderListItemTitle: (item)=>item.address,
        selectedId: props.match.params.id,
        renderListItemTo: (id) => `/${RoutingConstants.locations}/` + id,
        itemTitle:"Edit location",
        ListItemIcon:LocationIcon
    };
    return <BasePage{...p} />
};