// import React from 'react';
// import {
//     buildings_GetAll,
//     inNetwork_GetByBuildingId,
// } from "../api/Api";
// import {RoutingConstants} from "../constants/RoutingConstants";
// import {BasePage} from "../Base/BasePage";
// import {BuildingsList} from "../Components/Buildings/index";
// import {PricingInNetwork} from "../Components/PricingInNetwork";
// import {BuildingIcon} from "../icons";
//
// export const PricingInNetworkPage = (props) => {
//     const p = {
//         ...props,
//         ListComponent: BuildingsList,
//         ItemComponent: PricingInNetwork,
//         fetchItems: () => buildings_GetAll(props.match.params.location_id),
//         fetchById: (id) => Promise.all([
//             inNetwork_GetByBuildingId(id),
//         ]).then(array => {
//             return {
//                 main: array[0],
//                 // stairs: array[1],
//             }
//         }),
//         renderListItemTitle: (item) => item.address,
//         selectedId: props.match.params.id,
//         renderListItemTo: (id) => `/${RoutingConstants.buildings}/${id}/${RoutingConstants.inNetworkPricing}`,
//         itemTitle: "Edit In-Network pricing",
//         ListItemIcon:BuildingIcon
//     };
//     return <BasePage{...p} />
// };
//
