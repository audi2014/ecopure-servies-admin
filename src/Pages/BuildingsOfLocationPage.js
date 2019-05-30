import {BasePage} from "../Base/BasePage";
import React from "react";
import {buildings_GetById, buildings_GetByLocationId} from "../api/Api";
import {BuildingsItem, BuildingsList} from "../Components/Buildings";
import {RoutingConstants} from "../constants/RoutingConstants";
import {BuildingIcon} from "../icons";

// const pageProps = {
//     ListComponent: BuildingsList,
//     ItemComponent: BuildingsItem,
//     fetchItems: locations_GetAll,
//     fetchById: locations_GetById,
//     renderListItemTitle: (item)=>item.address,
// };
// export const BuildingsOfLocationPage = (props) => <BasePage {...{...pageProps, ...props}}/>


export const BuildingsOfLocationPage = (props) => {
    const p = {
        ...props,
        ListComponent: BuildingsList,
        ItemComponent: BuildingsItem,
        fetchItems: () => buildings_GetByLocationId(props.match.params.location_id),
        fetchById: buildings_GetById,
        renderListItemTitle: (item) => item.address,
        selectedId: props.match.params.id,
        renderListItemTo: (id) => `/${RoutingConstants.buildings}/` + id,
        itemTitle:"Edit building",
        ListItemIcon:BuildingIcon
    };
    return <BasePage{...p} />
};