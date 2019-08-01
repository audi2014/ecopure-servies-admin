import React from "react";
import {apiContexts} from "../../api/ContextApi";
import Typography from "@material-ui/core/Typography/Typography";
import {makeHandleDefaultChange} from "../ManageUsersAddUser/handlers";
import {AddOn_Title} from "../../constants/Enum";
import {Spinner} from "../../icons";
import {BookingStepper} from "./BookingStepper";
import {makeValidateStepWithCardUpdating} from "./tools_component";
import {
    Field_Title,
    STEP_TITLES_INITIAL,
    STEP_TITLES_SHORT,
    StepTitle_columns_INITIAL,
    StepTitle_columns_SHORT
} from "./columns";
import {ConfirmView} from "./ConfirmView";
import Grid from "@material-ui/core/Grid/Grid";
import {UserView} from "./UserView";
import {SuccessfullyBooked} from "./SuccessfullyBooked";


export const ManageUsersBookUserPage = ({match, history}) => {
    const user_id = +match.params.user_id;


    const {addOn_GetByZipCode} = React.useContext(apiContexts.addOn);
    const {users_GetPage, users_addBillingInfo, users_HomeCleaning} = React.useContext(apiContexts.users);
    const [state, setState] = React.useState(initialState);
    const [errors, setErrors] = React.useState({});


    const isAnyRequestPending =
        !!users_GetPage.pending
        || !!addOn_GetByZipCode.pending
        || !!users_addBillingInfo.pending
        || !!users_HomeCleaning.pending
    ;
    const user = users_GetPage.state && users_GetPage.state.items && users_GetPage.state.items[0];
    const isInitialBooking = user ? !(+user.home_clng_prof_flag) : true;
    // const isInitialBooking = false;
    const step_titles = isInitialBooking ? STEP_TITLES_INITIAL : STEP_TITLES_SHORT;
    const StepTitle_columns = isInitialBooking ? StepTitle_columns_INITIAL : StepTitle_columns_SHORT;
    const handleDefaultChange = makeHandleDefaultChange({state, errors, setState, setErrors});
    const addOns = (addOn_GetByZipCode.state || []).map(item => AddOn_Title[item.addon_type] || item.addon_type);

    React.useEffect(() => {
        users_GetPage.request({filters: {id: user_id}});
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
            addOn_GetByZipCode.request(user.zip_code)
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
        title={Field_Title[field]}
        disabled={key_disabled[field]}
        // onBlur={key_onBlur[field]}
        // keyValue={key_keyValue[field]}
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


    if (!user) return <Spinner/>;
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

const initialState = {
    'num_br': '',
    'num_bth': '',
    'footage': '',
    'home_condition': '',
    'num_kids': '',
    'is830': '',
    'frequency': '',
    'home_access': '',
    'special': '',

    'start_clean_date': '',
    'time_initial_cleaning': '',
    'time_ongoing_cleaning': '',
    'add-on-services': [],
    'promo-code': '',
    'meeting_point_date': '',
    'meeting_point_time': '',
    //card
    'cc_number': '',
    'exp_date': '',
    'cc_zip': '',
    'cvv': '',
};

// const initialState = {
//     'num_br': '1',
//     'num_bth': '2',
//     'footage': '801-1000',
//     'home_condition': 'Exceptionally Clean',
//     'num_kids': '1',
//     'is830': '1',
//     'frequency': 'Move-Out',
//     'home_access': 'I will be home',
//     'special': '',
//
//     'start_clean_date': '2019-01-01',
//     'time_initial_cleaning': '2019-01-01T01:01:00',
//     'time_ongoing_cleaning': '2019-01-01T01:01:00',
//     'add-on-services': ['WINDOWS', 'OVEN'],
//     'promo-code': '',
//     'meeting_point_date': '2019-01-01',
//     'meeting_point_time': '08:00-09:00',
//     //card
//     'cc_number': '',
//     'exp_date': '',
//     'cc_zip': '',
//     'cvv': '',
// };
