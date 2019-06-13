import React, {Fragment} from "react";
import {
    inNetworkModel_GetById, inNetworkModel_UpdateById, inNetworkPrices_GetByModelId,
} from "../../api/Api";
import {RoomTypePlanTable} from "./RoomTypePlanTable";
import {AddIcon, CancelIcon, EditIcon, SaveIcon, Spinner} from "../../icons";
import Typography from "@material-ui/core/Typography/Typography";
import {PricingInNetworkNavigation} from "./PricingInNetworkNavigation";
import {makeUsingLoadingById} from "../tools";
import {ImportInnetwork} from "./ImportInnetwork";
import {Link} from "react-router-dom";
import {RoutingConstants} from "../../constants/RoutingConstants";
import Fab from "@material-ui/core/Fab/Fab";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import {CancelButton} from "../../Base/BaseInput";


const use_load_inNetworkModel_GetById = makeUsingLoadingById(inNetworkModel_GetById);
const use_load_inNetworkPrices_GetByModelId = makeUsingLoadingById(inNetworkPrices_GetByModelId);

// inNetworkModel_UpdateById

const EditModelName = ({model, loading}) => {
    const initialName = model.name || "";
    const [name, setName] = React.useState(initialName);
    const [isEdit, setEdit] = React.useState(false);
    const [isLoading, setLoading] = React.useState(false);
    const handleSave = () => {
        setLoading(true);
        inNetworkModel_UpdateById(model.id, {name})
            .then(r => {
                setName(r.name);
                setEdit(false);
                setLoading(false);
            })
    };
    return isEdit ? <Fragment>
        <TextField
            label={"Model Name"}
            value={name}
            onChange={e => setName(e.target.value)}
            margin="normal"
            variant="outlined"
            InputProps={{
                endAdornment: <InputAdornment position="end">
                    {
                        isLoading
                            ? <Spinner/>
                            : <Fab size="small" color="primary" aria-label="Cancel" onClick={handleSave}>
                                <SaveIcon/>
                            </Fab>

                    }
                    {
                        isLoading
                            ? null
                            : <Fab size="small" aria-label="Cancel"
                                   onClick={() => setEdit(false) || setName(initialName)}>
                                <CancelIcon/>
                            </Fab>
                    }

                </InputAdornment>
            }}
        />
    </Fragment> : <Fab
        onClick={() => setEdit(true)}
        variant="extended"
        style={{margin: 10}}
        size="small"
        color="primary"
        aria-label="Create">
        Custom Pricing Model "{name}"&nbsp;<EditIcon/>
    </Fab>
}

export const PricingInNetworkPage = ({match, history, onChange = null}) => {
    const custom_pricing_model_id = match.params.id;
    const location_id = match.params.location_id;
    if (!custom_pricing_model_id) return 'empty param `id` in route';
    if (!location_id) return 'empty param `location_id` in route';

    const [model,] = use_load_inNetworkModel_GetById(custom_pricing_model_id);
    const [pricingInNetwork, _, reloadPricingInNetwork] = use_load_inNetworkPrices_GetByModelId(custom_pricing_model_id);

    if (model === false || pricingInNetwork === false) return 'error.';
    if (!model || !pricingInNetwork) return <Spinner/>;

    return <div>
        <Typography style={{margin: 20}} variant="h6">
            <EditModelName model={model}/>
        </Typography>
        <RoomTypePlanTable
            pricingInNetwork={pricingInNetwork}
            reload={reloadPricingInNetwork}
            location_id={location_id}
            custom_pricing_model_id={custom_pricing_model_id}
        />
        {/*<ImportInnetwork pricingInNetwork={pricingInNetwork}*/}
        {/*building_id={+building.id}*/}
        {/*reload={reloadPricingInNetwork}*/}
        {/*location_id={+building.location_id}*/}
        {/*/>*/}
        {/*<PricingInNetworkNavigation building_id={building_id} location_id={building.location_id}/>*/}
    </div>;
};