// import React from 'react';
// import {LocationsList} from "../Components/Locations";
// import {
//     locations_GetAll,
//     outOfNetworkFootage_GetByLocationId, outOfNetworkStairs_GetByLocationId
// } from "../api/Api";
// import {RoutingConstants} from "../constants/RoutingConstants";
// import {BasePage} from "../Base/BasePage";
// import {PricingOutOfNetwork} from "../Components/PricingOutOfNetwork/index";
// import {LocationIcon} from "../icons";
//
// export const PricingOutOfNetworkPage = (props) => {
//     const p = {
//         ...props,
//         ListComponent: LocationsList,
//         ItemComponent: PricingOutOfNetwork,
//         fetchItems: locations_GetAll,
//         fetchById: (id) => Promise.all([
//             outOfNetworkFootage_GetByLocationId(id),
//             outOfNetworkStairs_GetByLocationId(id),
//         ]).then(array => {
//             return {
//                 footage: array[0],
//                 stairs: array[1],
//             }
//         }),
//         renderListItemTitle: (item) => item.address,
//         selectedId: props.match.params.id,
//         renderListItemTo: (id) => `/${RoutingConstants.locations}/${id}/${RoutingConstants.outOfNetworkPricing}`,
//         itemTitle: "Edit Out Of Network pricing",
//         ListItemIcon:LocationIcon
//     };
//     return <BasePage{...p} />
// };