import {BasePage} from "../Base/BasePage";
import React from "react";
import {buildings_InsertByData, buildings_UpdateById, buildings_GetById, buildings_GetByLocationId} from "../api/Api";
import {BuildingsItem, BuildingsList} from "../Components/Buildings";
import {RoutingConstants} from "../constants/RoutingConstants";
import {BuildingIcon} from "../icons";


export const BuildingsOfLocationPage = (props) => {
    const location_id = props.match.params.location_id;
    const selectedId = props.match.params.id;
    const p = {
        ...props,
        ListComponent: BuildingsList,
        ItemComponent: BuildingsItem,
        fetchItems: () => buildings_GetByLocationId(location_id),
        fetchById: buildings_GetById,
        renderListItemTitle: (item) => item.address,
        selectedId: selectedId,
        renderListItemTo: (id) => `/${RoutingConstants.locations}/${location_id}/${RoutingConstants.buildings}/${id}`,
        renderListItemCreate: () => `/${RoutingConstants.locations}/${location_id}/${RoutingConstants.buildings}/add`,
        isAdd: selectedId === 'add',
        creationTemplate: {
            "location_id": location_id,
            "name": "",
            "address": "",
            "zipcode": "",
        },
        updateById: buildings_UpdateById,
        insertByData: buildings_InsertByData,
        onDidInsert: (item) => props.history.push(`/${RoutingConstants.locations}/${location_id}/${RoutingConstants.buildings}/${item.id}`),
        itemTitle: "Edit building",
        ListItemIcon: BuildingIcon
    };
    return <BasePage{...p} />
};