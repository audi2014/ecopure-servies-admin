import React, {Fragment} from "react";
import {
    inNetworkModel_GetById, inNetworkModel_InsertByData, inNetworkModel_UpdateById, inNetworkPrices_GetByModelId,
} from "../../api/Api";
import {RoomTypePlanTable} from "./RoomTypePlanTable";
import {AddIcon, CancelIcon, EditIcon, SaveIcon, Spinner} from "../../icons";
import Typography from "@material-ui/core/Typography/Typography";
import {makeUsingLoadingById} from "../tools";
// import {ImportInnetwork} from "./ImportInnetwork";
import Fab from "@material-ui/core/Fab/Fab";
import TextField from "@material-ui/core/TextField/TextField";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import {RoutingConstants} from "../../constants/RoutingConstants";
import {ImportInnetwork} from "./ImportInnetwork";


const use_load_inNetworkModel_GetById = makeUsingLoadingById(inNetworkModel_GetById);
;


const EditModelView = ({isLoading, setName, name, onSave, onCancel}) => <Fragment>
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
                        : <Fab size="small" color="primary" aria-label="Cancel" onClick={onSave}>
                            <SaveIcon/>
                        </Fab>

                }
                {
                    isLoading
                        ? null
                        : <Fab size="small" aria-label="Cancel"
                               onClick={onCancel}>
                            <CancelIcon/>
                        </Fab>
                }

            </InputAdornment>
        }}
    />
</Fragment>;

const EditModelName = ({custom_pricing_model_id, location_id}) => {

    const [model,] = use_load_inNetworkModel_GetById(custom_pricing_model_id);

    const initialName = model ? model.name : '';
    const [name, setName] = React.useState(initialName);
    const [isEdit, setEdit] = React.useState(false);
    const [isLoading, setLoading] = React.useState(false);

    React.useEffect(() => {
        setName(initialName);
    }, [model]);


    if (model === false) return 'error.';
    if (!model) return <Spinner/>;

    const handleUpdateClick = () => {
        setLoading(true);
        inNetworkModel_UpdateById(custom_pricing_model_id, {name})
            .then(r => {
                if (r) {
                    setName(r.name);
                    setEdit(false);
                }
                setLoading(false);
            })
    };
    const handleCancelClick = () => {
        setEdit(false);
        setName(initialName)
    };
    return isEdit ? <EditModelView
        onSave={handleUpdateClick}
        onCancel={handleCancelClick}
        isLoading={isLoading}
        setName={setName}
        name={name}
    /> : <Fab
        onClick={() => setEdit(true)}
        variant="extended"
        style={{margin: 20}}
        size="small"
        color="primary"
        aria-label="Create">
        {name || 'Untitled Model'}&nbsp;<EditIcon/>
    </Fab>
}

const CreateModel = ({location_id, initialName = '', history}) => {
    const [name, setName] = React.useState(initialName);
    const [isLoading, setLoading] = React.useState(false);

    const handleCancelClick = () => history.push(`/${RoutingConstants.locations}/${location_id}/${RoutingConstants.editPricingOfLocation}`);
    const handleInsertClick = () => {
        setLoading(true);
        inNetworkModel_InsertByData({name, location_id})
            .then(r => {
                if (r) history.push(
                    `/${RoutingConstants.locations}/${location_id}/${RoutingConstants.inNetworkPricing}/${r.id}/edit`
                );
            })
    };
    return <EditModelView
        onSave={handleInsertClick}
        onCancel={handleCancelClick}
        isLoading={isLoading}
        setName={setName}
        name={name}
    />
};

export const PricingInNetworkPage = ({match, history}) => {
    const custom_pricing_model_id = match.params.id;
    const location_id = match.params.location_id;
    if (!location_id) return 'empty param `location_id` in route';


    return <div>
        <Typography style={{margin: 20}} variant="h6">
            {
                custom_pricing_model_id
                    ? <EditModelName
                        custom_pricing_model_id={custom_pricing_model_id}
                    />
                    : <CreateModel
                        location_id={location_id}
                        history={history}
                        initialName={''}
                    />
            }

        </Typography>
        {
            custom_pricing_model_id
                ? <RoomTypePlanTable
                    location_id={location_id}
                    custom_pricing_model_id={custom_pricing_model_id}
                />
                : null
        }


    </div>;
};