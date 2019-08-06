import React from "react";
import {FIELD_TITLE} from "../BaseManageUsers/constants";
import FormControl from "@material-ui/core/FormControl/FormControl";
import {
    makeHandleBuildingIdChange, makeHandleDefaultChange,
    makeHandleLocationChange,
    makeHandleZipCodeChange
} from "../ManageUsersAddUser/handlers";
import {
    FIELDS_PROPS_EDIT_USER_1,
    FIELDS_PROPS_EDIT_USER_2,
    makeGetStateDiff,
    propsToState,
    TAB_TITLE_PROPS
} from "./tools";
import Button from "@material-ui/core/Button/Button";
import {haveError} from "../Auth/AuthPage";
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";


export const EditUserFrorm = ({onSubmit, pending, ...props}) => {
    const {zipcodes, buildings, locations} = props;
    const initialState = propsToState(props);
    const [state, setState] = React.useState(initialState);
    const [errors, setErrors] = React.useState({});
    const [activeTab, setActiveTab] = React.useState(0);

    const isOtherBuilding = !state.building_id || state.building_id === 'other';
    const handleDefaultChange = makeHandleDefaultChange({state, errors, setState, setErrors});

    const locations_keyValue = (locations).reduce((prev, l) => {
        prev[l.id] = l.name;
        return prev;
    }, {});
    const zipCodes_keyValue = zipcodes
        .filter(item => +item.location_id === +state.location_id)
        .map(item => item.zipcode)
        .sort((a, b) => a.localeCompare(b))
        .reduce((prev, zipcode) => {
            prev[zipcode] = zipcode;
            return prev;
        }, {});

    const availableBuildings = buildings
        .filter(item => +item.location_id === +state.location_id
            && item.address
            && item.name
        );
    const buildings_keyValue = availableBuildings
        .reduce((prev, item) => {
            prev[item.id] = item.name;
            return prev;
        }, {'other': 'Other'});
    const key_disabled = {
        zip_code: !state.location_id,
        building_id: !state.location_id,
        building_name: !isOtherBuilding,
        address: !isOtherBuilding,
    };
    const key_keyValue = {
        location_id: locations_keyValue,
        zip_code: zipCodes_keyValue,
        building_id: buildings_keyValue,
    };

    const key_onChange = {
        zip_code: makeHandleZipCodeChange({state, errors, setState, setErrors}),
        building_id: makeHandleBuildingIdChange({
            state,
            errors,
            setState,
            setErrors,
            items: availableBuildings
        }),
        location_id: makeHandleLocationChange({state, errors, setState, setErrors}),
    };

    const getStateDiff = makeGetStateDiff(initialState);
    const handleSubmit = (e) => {
        e.preventDefault();
        const diff = getStateDiff(state);
        console.log('changes', diff);
        onSubmit(diff);
    };

    function handleTabChange(event, newValue) {
        setActiveTab(newValue);
    }

    const haveChanges = !!Object.keys(getStateDiff(state)).length;

    const renderItem = ({Component, field, ...props}) => <Component
        disabled={key_disabled[field]}
        title={FIELD_TITLE[field] || '~~' + field}
        key={field}
        value={state[field]}
        field={field}
        onChange={key_onChange[field] || handleDefaultChange}
        error={!!errors[field]}
        helperText={errors[field] ? errors[field] : null}
        keyValue={key_keyValue[field]}
        {...props}
    />;

    console.log(Object.keys(TAB_TITLE_PROPS)[activeTab]);
    console.log(TAB_TITLE_PROPS);
    return <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Tabs
            value={activeTab}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleTabChange}
        >
            {Object.keys(TAB_TITLE_PROPS).map(key => <Tab key={key} label={key}/>)}
        </Tabs>
        <FormControl fullWidth>
            {(TAB_TITLE_PROPS[Object.keys(TAB_TITLE_PROPS)[activeTab]] || []).map(props => {
                return renderItem(props);
            })}
            <Button
                disabled={!!haveError(errors) || pending || !haveChanges}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
            >
                Update User
            </Button>
        </FormControl>
    </form>
};

