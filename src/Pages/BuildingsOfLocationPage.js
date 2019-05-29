import {BasePage} from "../Base/BasePage";
import React from "react";
import {getBuildingById, getBuildingsOfLocation} from "../api/Api";
import {BuildingsItem, BuildingsList} from "../Components/Buildings";
import {RoutingConstants} from "../constants/RoutingConstants";
import {BuildingIcon} from "../icons";

// const pageProps = {
//     ListComponent: BuildingsList,
//     ItemComponent: BuildingsItem,
//     fetchItems: getLocations,
//     fetchById: getLocationById,
//     renderListItemTitle: (item)=>item.address,
// };
// export const BuildingsOfLocationPage = (props) => <BasePage {...{...pageProps, ...props}}/>


export const BuildingsOfLocationPage = (props) => {
    const p = {
        ...props,
        ListComponent: BuildingsList,
        ItemComponent: BuildingsItem,
        fetchItems: () => getBuildingsOfLocation(props.match.params.location_id),
        fetchById: getBuildingById,
        renderListItemTitle: (item) => item.address,
        selectedId: props.match.params.id,
        renderListItemTo: (id) => `/${RoutingConstants.buildings}/` + id,
        itemTitle:"Edit building",
        ListItemIcon:BuildingIcon
    };
    return <BasePage{...p} />
};