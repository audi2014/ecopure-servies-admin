import React from "react";
import TextField from "@material-ui/core/TextField/TextField";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import {CancelIcon, EditIcon, SaveIcon, Spinner} from "../icons";
import Fab from "@material-ui/core/Fab/Fab";
import {getManagerPreferences, ModelNameOrDefault} from "./tools";
import {apiContexts} from "../api/ContextApi";

export const EditModelView = ({isLoading, setName, name, onSave, onCancel, id}) => <React.Fragment>
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
</React.Fragment>;

export const EditModelName = ({initialName = '', updateNamePromise, id}) => {
    const [name, setName] = React.useState(ModelNameOrDefault(initialName, id));
    const [isEdit, setEdit] = React.useState(false);
    const [isLoading, setLoading] = React.useState(false);

    React.useEffect(() => {
        setName(ModelNameOrDefault(initialName, id));
    }, [initialName, id]);

    const handleUpdateClick = () => {
        setLoading(true);
        updateNamePromise(name)
            .then(r => {
                if (r) {
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
        id={id}
        onSave={handleUpdateClick}
        onCancel={handleCancelClick}
        isLoading={isLoading}
        setName={setName}
        name={name}
    /> : <Fab
        onClick={() => setEdit(true)}
        variant="extended"
        style={{
            marginTop: 20,
            marginBottom: 20,
        }}
        size="small"
        color="primary"
        aria-label="Edit">
        {name}&nbsp;<EditIcon/>
    </Fab>
};


export const makeEditPreferencesProp = propName => () => {

    const {manager_Get, manager_Update} = React.useContext(apiContexts.manager);

    React.useEffect(() => {
        if (!manager_Get.state) {
            manager_Get.request();
        }
    }, []);

    if (!!manager_Get.pending) return <Spinner/>;


    const handleUpdateName = (value) => manager_Update.request({
        preferences: JSON.stringify({
            ...getManagerPreferences(manager_Get.state),
            [propName]: value
        })
    }).then(r => {
        manager_Get.setState(r);
        return r;
    });


    return <EditModelName
        initialName={getManagerPreferences(manager_Get.state)[propName]}
        updateNamePromise={handleUpdateName}
    />
};
