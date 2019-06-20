import {Select} from "../../Base/BaseInput";
import {ModelNameOrDefault} from "../../Base/tools";
import React from "react";

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
                    prev[+curr.id] = ModelNameOrDefault(curr.name, curr.id);
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