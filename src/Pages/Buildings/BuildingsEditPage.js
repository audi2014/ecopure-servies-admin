import {BaseItemUpdationPage} from "../../Base/BaseItemUpdationPage";
import React from "react";
import {getBuildingNameByLocationsArray} from "./../tools";
import {apiContexts} from "../../api/ContextApi";
import {makeBuildingsEditableTemplate} from "./makeBuildingsEditableTemplate";
import {AuthController} from "../../Auth/AuthController";
import {useLocations_GetByAccess} from "../tools_effect";
import {AccessDenied} from "../Auth/AccessDenied";
import {RoutingConstants} from "../../constants/RoutingConstants";
import {DeleteManagerDialog} from "../Managers/DeleteManagerDialog";


export const BuildingsEditPage = ({
                                      match,
                                      history,
                                  }) => {
    const title = 'Building';
    const building_id = +match.params.id;
    const [locations_state, locations_request] = useLocations_GetByAccess();
    const {pushError} = React.useContext(apiContexts.error);
    const {buildingsLarge_GetById, buildings_UpdateById, buildings_DeleteForeverById} = React.useContext(apiContexts.buildings);
    const {inNetworkModel_GetAll} = React.useContext(apiContexts.inNetworkModel);
    const models = inNetworkModel_GetAll.state || [];


    React.useEffect(() => {
        buildingsLarge_GetById.request(building_id);
        locations_request();
        inNetworkModel_GetAll.request();
    }, [building_id]);

    const [deleteId, setDeleteId] = React.useState(false);
    const building_handleOpenDeleteConfirmation = () => {
        setDeleteId(building_id);
    };
    const building_handleCancelDelete = () => {
        setDeleteId(null);
    };

    const building_handleSubmitDelete = () => {
        return buildings_DeleteForeverById.request(building_id)
            .then(r => r ? history.push(`/${RoutingConstants.buildings}`) : null)
        ;
    };

    //ACCESS
    if (buildingsLarge_GetById.state && !AuthController.haveLocationAccess(buildingsLarge_GetById.state.location_id)) {
        return <AccessDenied history={history}/>
    }
    return <React.Fragment>
        <DeleteManagerDialog
            title={'Confirm permanently delete'}
            fullWidth
            maxWidth={'sm'}
            onSubmit={building_handleSubmitDelete}
            operationDescription={`Delete building ${buildingsLarge_GetById.state ? buildingsLarge_GetById.state.name : 'Error'} FOREVER?`}
            confirmationWord={'DELETE'}
            deleteId={deleteId}
            onCancel={building_handleCancelDelete}
        />
        <BaseItemUpdationPage
        reload={() => buildingsLarge_GetById.request(building_id)}
        editableTemplate={makeBuildingsEditableTemplate(locations_state, models)}
        renderTitle={b => <span style={{textDecoration: b.deleted_at ? 'line-through' : undefined}}>
            {getBuildingNameByLocationsArray(b, models, title)}
            </span>
        }
        onDelete={building_handleOpenDeleteConfirmation}
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
                        .then(r => {
                            if (r) {
                                buildingsLarge_GetById.setState(r)
                            }
                        })
                }
            }
        }
    />
    </React.Fragment>
};