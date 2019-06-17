import {
    buildings_UpdateById,
    buildingsLarge_GetById, inNetworkModel_GetAll,
    locations_GetAll,
} from "../../api/Api";
import {BaseItemUpdationPage} from "../../Base/BaseItemUpdationPage";
import React from "react";
import {Select} from "../../Base/BaseInput";
import {getBuildingNameByLocationsArray} from "./../tools";
import {makeUsingLoadingById} from "../tools";


export const makeBuildingsEditableTemplate = (locations, pricingInNetwork) => [
    {
        //todo: hide it if access !== global
        field: 'location_id',
        title: "Location of Building",
        Input: ({value, setValue, className, fieldData}) => <Select
            label={fieldData.title}
            className={className}
            setValue={v => setValue(+v)}
            value={value}
            keyValue={(locations || []).reduce((prev, curr) => {
                prev[+curr.id] = curr.name || 'Location #' + curr.id
                return prev;
            }, {})}
        />
    },
    {
        field: 'custom_pricing_model_id',
        title: "Pricing Model of Building",
        Input: ({value, setValue, className, fieldData, data}) => <Select
            label={fieldData.title}
            className={className}
            setValue={v => setValue(+v)}
            value={value}
            keyValue={(pricingInNetwork || [])
                .filter(item => item.deleted_at === null)
                .filter(item => +item.location_id === +data.location_id)
                .reduce((prev, curr) => {
                    prev[+curr.id] = curr.name || 'Model #' + curr.id;
                    return prev;
                }, {})}
        />
    },
    {
        field: 'name',
        title: "Building Name",
    },
    {
        field: 'address',
        title: "Building Address",
    },
    {
        field: 'zipcode',
        title: "Building Zip",
    },
];
const use_load_locations_GetAll = makeUsingLoadingById(locations_GetAll);
const use_load_inNetworkPrices_GetAll = makeUsingLoadingById(inNetworkModel_GetAll);

export const BuildingsEditPage = ({
                                      match,
                                      history,
                                      onChange = null,
                                      fetchById = buildingsLarge_GetById,
                                      selectedId = null,
                                      title = 'Building'
                                  }) => {
    const [locations,] = use_load_locations_GetAll();
    const [pricingInNetwork,] = use_load_inNetworkPrices_GetAll();
    if (!selectedId) selectedId = match.params.id;

    return <BaseItemUpdationPage
        editableTemplate={makeBuildingsEditableTemplate(locations, pricingInNetwork)}
        renderTitle={b => getBuildingNameByLocationsArray(b, locations, title)}
        fetchById={fetchById}
        updateById={
            (id, data, item) => {
                const location_id = data.location_id || item.location_id;
                const custom_pricing_model_id = data.custom_pricing_model_id || item.custom_pricing_model_id;
                if (!location_id) {
                    return new Promise((ok,reject)=>reject('empty Location of Building'))
                } else if (
                    !pricingInNetwork.find(item => +item.id === +custom_pricing_model_id && +item.location_id === +location_id)
                ) {
                    return new Promise((ok,reject)=>reject('please select Pricing Model of Building'))
                } else {
                    return buildings_UpdateById(id, data).then(r => {
                        if (onChange) onChange(selectedId)
                    });
                }
            }
        }
        selectedId={match.params.id}
    >
    </BaseItemUpdationPage>
};