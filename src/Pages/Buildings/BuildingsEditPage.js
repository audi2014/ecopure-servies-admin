import {
    buildings_UpdateById, buildingsLarge_GetById, locations_GetAll, locations_GetById,
} from "../../api/Api";
import {BuildingsItemNavigation} from "./BuildingsItemNavigation";
import {BaseItemUpdationPage} from "../../Base/BaseItemUpdationPage";
import React from "react";
import {Select} from "../../Base/BaseInput";
import {getBuildingNameByLocationsArray} from "./../tools";
import {makeUsingLoadingById} from "../tools";


export const makeBuildingsEditableTemplate = (locations) => [
    {
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

export const BuildingsEditPage = ({
                                      match,
                                      history,
                                      onChange = null,
                                      fetchById = buildingsLarge_GetById,
                                      selectedId = null,
                                      title = 'Building'
                                  }) => {
    const [locations, ] = use_load_locations_GetAll();
    if (!selectedId) selectedId = match.params.id;

    return <BaseItemUpdationPage
        editableTemplate={makeBuildingsEditableTemplate(locations)}
        renderTitle={b => getBuildingNameByLocationsArray(b, locations, title)}
        fetchById={fetchById}
        updateById={(id, data) => buildings_UpdateById(id, data).then(r => {
            if (onChange) onChange(selectedId)
        })}
        selectedId={match.params.id}
    >
        {
            (item, itemProps) => <>
                <BuildingsItemNavigation selectedId={selectedId}/>
            </>
        }
    </BaseItemUpdationPage>
};