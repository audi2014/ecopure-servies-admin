import React from 'react';
import {Select} from "../../Base/BaseInput";
import {Done} from "@material-ui/icons";
import Button from "@material-ui/core/Button/Button";
import {buildingsLarge_GetByLocationId, inNetwork_GetByBuildingId, inNetwork_InsertByData} from "../../api/Api";
import {makeUsingLoadingById} from "../tools";
import Grid from "@material-ui/core/Grid/Grid";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";


const use_load_buildingsLarge_GetByLocationId = makeUsingLoadingById(buildingsLarge_GetByLocationId);


export const ImportInnetwork = ({location_id, building_id, reload}) => {
    const [buildings,] = use_load_buildingsLarge_GetByLocationId(location_id);
    const [selected_building_id, setSelectedId] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const LBuildingId_Name = (buildings || [])
        .filter(b => +b.id !== +building_id)
        .reduce((prev, curr) => {
            prev[curr.id] = curr.name || 'Building #' + curr.id;
            return prev;
        }, {});

    const onClick = () => {
        setIsLoading(true)
        inNetwork_GetByBuildingId(selected_building_id).then(r => {
            if (r) {
                return Promise.all(r.map(item => {
                    const {id, created_at, updated_at, deleted_at, ...body} = item
                    return inNetwork_InsertByData({...body, building_id})
                }))
            } else {
                return false;
            }
        }).then(r => {
            setIsLoading(false);
            reload()
        })
    };

    return <FormControl fullWidth>
        <Select
            disabled={isLoading}
            label={'Copy Pricing from Building'}
            keyValue={LBuildingId_Name}
            value={selected_building_id}
            setValue={setSelectedId}
            InputProps={{
                endAdornment: <InputAdornment position="end"><Button
                    disabled={!selected_building_id || isLoading}
                    variant="contained"
                    color="primary"
                    onClick={onClick}>
                    Copy
                </Button></InputAdornment>
            }}
        />
    </FormControl>
};