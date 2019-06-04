import {BasePage} from "../Base/BasePage";
import React from "react";
import {LocationsItem, LocationsList} from "../Components/Locations/index";
import {
    locations_GetById,
    locations_GetAll,
    locations_UpdateById,
    locations_InsertByData
} from "../api/Api";
import {RoutingConstants} from "../constants/RoutingConstants";
import {LocationIcon} from "../icons";

export const LocationsPage = (props) => {
    const selectedId = props.match.params.id;
    const p = {
        ...props,
        ListComponent: LocationsList,
        ItemComponent: LocationsItem,
        fetchItems: locations_GetAll,
        fetchById: locations_GetById,
        renderListItemTitle: (item)=>item.address,
        selectedId,
        renderListItemTo: (id) => `/${RoutingConstants.locations}/` + id,
        itemTitle:"Edit location",
        ListItemIcon:LocationIcon,

        updateById: locations_UpdateById,
        insertByData: locations_InsertByData,
        onDidInsert: (item) => props.history.push(`/${RoutingConstants.locations}/${item.id}`),
        renderListItemCreate: () => `/${RoutingConstants.locations}/add`,
        isAdd: selectedId === 'add',
        creationTemplate: {
            "page": "",
            "address": "",
            "tel": "",
            "google_place_id": "",
        },
    };
    return <BasePage{...p} />
};