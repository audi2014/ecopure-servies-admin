import React from "react";
import {apiContexts} from "../../api/ContextApi";
import Typography from "@material-ui/core/Typography/Typography";
import {makeHandleDefaultChange} from "../ManageUsersAddUser/handlers";
import {Spinner} from "../../icons";
import {BookingStepper} from "./BookingStepper";
import {makeValidateStepWithCardUpdating} from "./tools_component";
import {ConfirmView} from "./ConfirmView";
import Grid from "@material-ui/core/Grid/Grid";
import {SuccessfullyBooked} from "./SuccessfullyBooked";
import {
    STEP_TITLES_INITIAL,
    STEP_TITLES_SHORT,
    StepTitle_columns_INITIAL,
    StepTitle_columns_SHORT
} from "./constants";
import {FIELD_TITLE} from "../BaseManageUsers/constants";
import {AddOn_Title} from "../../constants/Enum";
import {INITIAL_STATE} from "./constants";
import {UserView} from "../BaseManageUsers/UserView";

export const ManageUsersBookUserPage = ({match}) => {
    const user_id = +match.params.user_id;

    const {addOn_GetByZipCode} = React.useContext(apiContexts.addOn);
    const {users_GetFirstById, users_addBillingInfo, users_HomeCleaning, users_RequireTokenById} = React.useContext(apiContexts.users);
    const [state, setState] = React.useState(INITIAL_STATE);
    const [errors, setErrors] = React.useState({});

    const isAnyRequestPending =
        !!users_GetFirstById.pending
        || !!addOn_GetByZipCode.pending
        || !!users_addBillingInfo.pending
        || !!users_HomeCleaning.pending
    ;
    const user = users_GetFirstById.state;
    const isInitialBooking = user ? !(+user.home_clng_prof_flag) : true;
    // const isInitialBooking = false;
    const step_titles = isInitialBooking ? STEP_TITLES_INITIAL : STEP_TITLES_SHORT;
    const StepTitle_columns = isInitialBooking ? StepTitle_columns_INITIAL : StepTitle_columns_SHORT;
    const handleDefaultChange = makeHandleDefaultChange({state, errors, setState, setErrors});
    const addOns = (addOn_GetByZipCode.state || []).map(item => AddOn_Title[item.addon_type] || item.addon_type);

    React.useEffect(() => {
        users_GetFirstById.request(user_id);
    }, [user_id]);

    React.useEffect(() => {
        if (user) {
            // const nextState = Object.keys(state).reduce((prev, key) => {
            //     if (
            //         !key.includes('date')
            //         && !key.includes('time')
            //         &&  user[key] !== undefined
            //     ) {
            //         prev[key] = ''+user[key];
            //     }
            //     return prev;
            // }, {});
            // setState({...state, ...nextState})
            addOn_GetByZipCode.request(user.zip_code);
            if (!user.token) {
                users_RequireTokenById.request(user.id).then(token => {
                    users_GetFirstById.setState({...user, token});
                })
            }
        }
    }, [user && user.zip_code]);


    const handleSubmit = (e) => {
        e.preventDefault();
    };


    const key_disabled = {
        num_bth: state.num_br === 'Studio',
    };

    const key_onChange = {
        'promo-code': (key, value) => {
            handleDefaultChange(key, ("" + value).substring(0, 4));
        },
        num_br: (key, value) => {
            if (value === 'Studio') {
                setState({...state, num_bth: '1', num_br: value});
                setErrors({...errors, num_bth: '', num_br: ''});
            } else {
                handleDefaultChange(key, value);
            }
        },
    };

    const key_items = {
        'add-on-services': addOns
    };

    const renderItem = ({Component, field, ...props}) => <Component
        title={FIELD_TITLE[field]}
        disabled={key_disabled[field]}
        error={!!errors[field]}
        helperText={errors[field] ? errors[field] : null}
        onChange={key_onChange[field] || handleDefaultChange}
        key={field}
        value={state[field]}
        field={field}
        items={key_items[field]}
        {...props}
    />;

    const validateStep = makeValidateStepWithCardUpdating({
        setErrors,
        state,
        user,
        errors,
        users_addBillingInfo_request: users_addBillingInfo.request,
        users_HomeCleaning_request: users_HomeCleaning.request,
        StepTitle_columns,
        isInitialBooking,
    });

    const getContentByStep = stepTitle => {
        if (stepTitle === 'Confirm')
            return <ConfirmView
                {...state}
                token={user.token}
                isInitialBooking={isInitialBooking}
            />;
        else if (stepTitle === 'Success')
            return <SuccessfullyBooked user_id={user_id}/>;
        else return StepTitle_columns[stepTitle].map((props) => renderItem(props));
    };

    if (users_GetFirstById.pending) return <Spinner/>;
    else if (!user) return null;
    else if (!user.token) return (
        <Typography style={{margin: 20}} variant="h6">Updating User Token...<Spinner/></Typography>);
    else return <Grid container justify="center" spacing={8}>
            <Grid item xs={12} md={6} lg={4}>
                <Typography style={{margin: 20}} variant="h6">
                    Booking
                </Typography>
                <form noValidate autoComplete="off" onSubmit={handleSubmit}>

                    <BookingStepper
                        pending={isAnyRequestPending}
                        skippableSteps={['Billing']}
                        shouldNextStep={validateStep}
                        getContentByStep={getContentByStep}
                        step_titles={step_titles}
                    />
                </form>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
                <Typography style={{margin: 20}} variant="h6">
                    User
                </Typography>
                <UserView {...user} isShort={true}/>
            </Grid>

        </Grid>;
};
