import {
    buildings_UpdateById, buildingsLarge_GetById,
} from "../api/Api";
import {Navigation} from "../Components/Buildings/Navigation";
import {BaseItemUpdationPage} from "../Base/BaseItemUpdationPage";
import React from "react";
//
//
//
//
// export const BuildingsPage = ({match, history, fetchById=buildingsLarge_GetById, onChange = null}) => {
//     const selectedId = match.params.id;
//     return <BaseItemUpdationPage
//         title={'Edit Building'}
//         fetchById={fetchById}
//         updateById={(id, data) => buildings_UpdateById(id, data).then(r => {
//             if (onChange) onChange(selectedId)
//         })}
//         selectedId={match.params.id}
//     >
//         {
//             (item, itemProps) => <>
//                 <Navigation selectedId={selectedId}/>
//             </>
//         }
//     </BaseItemUpdationPage>
// };


export const EditBuildingPage = ({match, history, onChange = null, fetchById = buildingsLarge_GetById}) => {
    const selectedId = match.params.id;
    return <BaseItemUpdationPage
        title={'Edit Building'}
        fetchById={fetchById}
        updateById={(id, data) => buildings_UpdateById(id, data).then(r => {
            if (onChange) onChange(selectedId)
            // if (r && r.id) {
            //     history.push(`/${RoutingConstants.locations}/${r.id}`)
            // }
        })}
        selectedId={match.params.id}
    >
        {
            (item, itemProps) => <>
                <Navigation selectedId={selectedId}/>
            </>
        }
    </BaseItemUpdationPage>
};