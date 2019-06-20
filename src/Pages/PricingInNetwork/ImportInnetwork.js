import React from 'react';
import {Select} from "../../Base/BaseInput";
import Button from "@material-ui/core/Button/Button";
// import {
//     inNetworkModel_GetByLocationId,
//     inNetworkPrices_DeleteById, inNetworkPrices_GetByModelId,
//     inNetworkPrices_InsertByData
// } from "../../api/Api";
// import {makeUsingLoadingById} from "../tools";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import {Spinner} from "../../icons";
import {PromiseAllWithProgress} from "../../Base/tools";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";


// const use_load_inNetworkModel_GetByLocationId = makeUsingLoadingById(inNetworkModel_GetByLocationId);


export const ImportInnetwork = ({
                                    reload,
                                    models,
                                    inNetworkPrices_GetByModelId,
                                    inNetworkPrices_DeleteById,
                                    inNetworkPrices_InsertByData,

                                    location_id,
                                    custom_pricing_model_id,
                                    pricingInNetwork = []
                                }) => {
    // const [models] = use_load_inNetworkModel_GetByLocationId(location_id);
    const [selected_id, setSelectedId] = React.useState('');
    const [progress, setProgress] = React.useState(false);
    const ModelId_Name = (models || [])
        .filter(b => +b.id !== +custom_pricing_model_id)
        .sort((a, b) => a.name.localeCompare(b.name))
        .reduce((prev, b) => {
            prev[b.id] = b.name ? `Model "${b.name}"` : `Model #${b.id}`
            return prev;
        }, {});

    const onClick = () => {
        setProgress(-1);
        inNetworkPrices_GetByModelId(selected_id).then(copyItems => {
            return PromiseAllWithProgress(
                pricingInNetwork.map(p => inNetworkPrices_DeleteById(p.id)),
                v => setProgress(v ? -v : -1)
            ).then(
                r => PromiseAllWithProgress(
                    copyItems.map(item => {
                        const {id, created_at, updated_at, deleted_at, ...body} = item
                        return inNetworkPrices_InsertByData({...body, custom_pricing_model_id})
                    }),
                    v => setProgress(v ? v : 1)
                )
            )


        }).then(r => {
            setProgress(false);
            reload()
        })
    };

    return <FormControl fullWidth>
        <Select
            disabled={progress !== false}
            label={'Copy Pricing from Model'}
            keyValue={ModelId_Name}
            value={selected_id}
            setValue={setSelectedId}
            InputProps={{
                endAdornment: <InputAdornment position="end">
                    {progress !== false ? <Spinner/> : <Button
                        disabled={!selected_id}
                        variant="contained"
                        color="primary"
                        onClick={onClick}>
                        Copy
                    </Button>}

                </InputAdornment>
            }}
        />
        {progress && progress >= 0 ?
            <span>copying...<LinearProgress variant="determinate" value={progress}/></span> : null}
        {progress && progress < 0 ?
            <span>cleansing...<LinearProgress color="secondary" variant="determinate" value={-progress}/></span> : null}

    </FormControl>
};