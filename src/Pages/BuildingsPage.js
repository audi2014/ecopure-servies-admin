import {BasePage} from "../Base/BasePage";
import React from "react";
import {BuildingsItem, BuildingsList} from "../Components/Buildings";
import {buildings_GetById, buildings_GetAll, buildings_UpdateById} from "../api/Api";
import {RoutingConstants} from "../constants/RoutingConstants";
import {BuildingIcon} from "../icons";


export const BuildingsPage = (props) => {
    const p = {
        ...props,
        ListComponent: BuildingsList,
        ItemComponent: BuildingsItem,
        fetchItems: buildings_GetAll,
        fetchById: buildings_GetById,
        updateById: buildings_UpdateById,

        renderListItemTitle: (item) => item.address,
        selectedId: props.match.params.id,
        renderListItemTo: (id) => `/${RoutingConstants.buildings}/${id}`,
        itemTitle: "Edit building",
        ListItemIcon: BuildingIcon
    };
    return <BasePage{...p} />
};