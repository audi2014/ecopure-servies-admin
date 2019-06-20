import {BaseItemUpdationPage} from "../../Base/BaseItemUpdationPage";
import React from "react";
import {getBuildingNameByLocationsArray} from "./../tools";
import {apiContexts} from "../../api/ContextApi";
import {makeBuildingsEditableTemplate} from "./makeBuildingsEditableTemplate";


export const BuildingsEditPage = ({
                                      match,
                                      history,
                                  }) => {
    const title = 'Building';
    const building_id = +match.params.id;

    const {pushError} = React.useContext(apiContexts.error);
    const {buildingsLarge_GetById, buildings_UpdateById} = React.useContext(apiContexts.buildings);
    const {locations_GetAll} = React.useContext(apiContexts.locations);
    const {inNetworkModel_GetAll} = React.useContext(apiContexts.inNetworkModel);

    const locations = locations_GetAll.state || [];
    const models = inNetworkModel_GetAll.state || [];

    console.log(buildingsLarge_GetById.state);

    React.useEffect(() => {
        buildingsLarge_GetById.request(building_id);
        locations_GetAll.request();
        inNetworkModel_GetAll.request();
    }, [building_id]);
    return <BaseItemUpdationPage
        reload={() => buildingsLarge_GetById.request(building_id)}
        editableTemplate={makeBuildingsEditableTemplate(locations, models)}
        renderTitle={b => <span style={{textDecoration: b.deleted_at ? 'line-through' : undefined}}>
            {getBuildingNameByLocationsArray(b, models, title)}
            </span>
        }
        data={buildingsLarge_GetById.state}
        onSave={
            (data) => {
                const location_id = data.location_id || buildingsLarge_GetById.state.location_id;
                const custom_pricing_model_id = data.custom_pricing_model_id || buildingsLarge_GetById.state.custom_pricing_model_id;
                if (!location_id) {
                    pushError('empty Location of Building', 'buildings_UpdateById',)
                } else if (
                    !models.find(model => +model.id === +custom_pricing_model_id && +model.location_id === +location_id)
                ) {
                    pushError('please select Pricing Model of Building', 'buildings_UpdateById',)
                } else {
                    return buildings_UpdateById.request(building_id, data)
                        .then(r => buildingsLarge_GetById.setState(r))
                }
            }
        }
    >
    </BaseItemUpdationPage>
};