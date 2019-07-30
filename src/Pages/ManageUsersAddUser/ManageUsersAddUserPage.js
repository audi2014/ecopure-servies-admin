import Typography from "@material-ui/core/Typography/Typography";
import FormControl from "@material-ui/core/FormControl/FormControl";
import React from "react";
import {apiContexts} from "../../api/ContextApi";
import Button from "@material-ui/core/Button/Button";
import {haveError,} from "../Auth/AuthPage";
import {useBuildings_GetByAccess, useZipCodes_GetByAccess} from "../tools_effect";
import {
    makeHandleBuildingIdChange,
    makeHandleDefaultChange,
    makeHandleEmailBlur,
    makeHandleEmailChange, makeHandleSubmitRegister,
    makeHandleZipCodeBlur,
    makeHandleZipCodeChange
} from "./handlers";
import {columnsAddress, columnsProfile} from "./columns";
import Grid from "@material-ui/core/Grid/Grid";


const initialState = {
    email: 'audi2014@test1.gmail.com',
    first_name: 'first_name',
    last_name: 'last_name',
    phone: 'phone',
    resource: 'Other',
    building_id: 'other',
    building_name: 'building_name',
    address: 'address',
    apt_num: 'apt_num',
    zip_code: '07302',
    flight_stairs: '11_30',
};
export const ManageUsersAddUserPage = ({history}) => {
    const {users_Register, users_checkEmailExist} = React.useContext(apiContexts.users);
    const [zip_state, zip_request, zip_pending] = useZipCodes_GetByAccess();
    const [buildings_state, buildings_request, buildings_pending] = useBuildings_GetByAccess();
    const [state, setState] = React.useState(initialState);
    const [errors, setErrors] = React.useState({});
    React.useEffect(() => {
        zip_request();
        buildings_request();
    }, []);


    const isAnyRequestPending = !!buildings_pending || !!zip_pending || !!users_Register.pending || !!users_checkEmailExist.pending;
    const availableZipCodes = (zip_state || []).map(item => item.zipcode).sort((a, b) => a.localeCompare(b));
    const zipCodes_keyValue = availableZipCodes.reduce((prev, zipcode) => {
        prev[zipcode] = zipcode;
        return prev;
    }, {});
    const buildings_keyValue = (buildings_state || []).reduce((prev, item) => {
        prev[item.id] = item.name;
        return prev;
    }, {'other': 'Other'});
    const isOtherBuilding = !state.building_id || state.building_id === 'other';
    const handleBuildingIdChange = makeHandleBuildingIdChange({
        state,
        errors,
        setState,
        setErrors,
        items: buildings_state
    });
    const handleEmailChange = makeHandleEmailChange({state, errors, setState, setErrors});
    const handleZipCodeChange = makeHandleZipCodeChange({state, errors, setState, setErrors});
    const handleDefaultChange = makeHandleDefaultChange({state, errors, setState, setErrors});
    const handleEmailBlur = makeHandleEmailBlur({state, errors, setState, setErrors, users_checkEmailExist});
    const handleZipCodeBlur = makeHandleZipCodeBlur({
        state,
        errors,
        setState,
        setErrors,
        pending: !!zip_pending,
        items: availableZipCodes
    });
    const handleSubmit = makeHandleSubmitRegister({state, errors, users_Register, setErrors, setState, history});

    const key_onBlur = {
        email: handleEmailBlur,
        zip_code: handleZipCodeBlur,
    };
    const key_keyValue = {
        zip_code: zipCodes_keyValue,
        building_id: buildings_keyValue,
    };
    const key_onChange = {
        email: handleEmailChange,
        zip_code: handleZipCodeChange,
        building_id: handleBuildingIdChange,
    };
    const key_disabled = {
        building_name: !isOtherBuilding,
        address: !isOtherBuilding,
    };

    const renderItem = ({Component, field, ...props}) => <Component
        disabled={key_disabled[field]}
        onBlur={key_onBlur[field]}
        keyValue={key_keyValue[field]}
        error={!!errors[field]}
        helperText={errors[field] ? errors[field] : null}
        onChange={key_onChange[field] || handleDefaultChange}
        key={field}
        value={state[field]}
        field={field}
        {...props}
    />;


    return <Grid container justify="center" spacing={8}>
        <Grid item xs={12} md={6} lg={4}>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Typography style={{margin: 20}} variant="h6">Profile</Typography>
                <FormControl fullWidth>
                    {columnsProfile.map((props) => renderItem(props))}
                </FormControl>


                <Typography style={{margin: 20}} variant="h6">Address</Typography>
                <FormControl fullWidth>
                    {columnsAddress.map((props) => renderItem(props))}
                </FormControl>
                <Button
                    disabled={!!haveError(errors) || isAnyRequestPending}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Create User
                </Button>
            </form>
        </Grid>
    </Grid>;
};