import React from "react";
import {apiContexts} from "../../api/ContextApi";
import Typography from "@material-ui/core/Typography/Typography";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Button from "@material-ui/core/Button/Button";
import {haveError} from "../Auth/AuthPage";
import {makeHandleDefaultChange} from "../ManageUsersAddUser/handlers";
import {columnsHome, columnsCall, columnsService, columnsSpecial} from "./columns";
import Stepper from "@material-ui/core/Stepper/Stepper";
import Step from "@material-ui/core/Step/Step";
import StepLabel from "@material-ui/core/StepLabel/StepLabel";
import StepContent from "@material-ui/core/StepContent/StepContent";
import {AddOn_Title} from "../../constants/Enum";

const initialState = {
    'num_br': '1',
    'num_bth': '2',
    'footage': '1001_1200',
    'home_condition': 'Exceptionally Clean',
    'num_kids': '1',
    'start_clean_date': '2019-01-01',
    'is830': '1',
    'frequency': 'BI_WEEKLY',
    'home_access': 'I will be home',
    'time_initial_cleaning': '2019-01-01T01:01:00',
    'time_ongoing_cleaning': '2019-01-01T01:01:00',
    'add-on-services': [],
    'special': '',
    'promo-code': '',
    'meeting_point_date': '',
    'meeting_point_time': '',
};


export const ManageUsersBookUser = ({match}) => {
    const id = +match.params.user_id;


    const {addOn_GetByZipCode} = React.useContext(apiContexts.addOn);
    const {users_GetPage} = React.useContext(apiContexts.users);
    const [state, setState] = React.useState(initialState);
    const [errors, setErrors] = React.useState({});


    const isAnyRequestPending = !!users_GetPage.pending;
    const user = users_GetPage.state && users_GetPage.state.items && users_GetPage.state.items[0];
    const handleDefaultChange = makeHandleDefaultChange({state, errors, setState, setErrors});
    const addOns = (addOn_GetByZipCode.state || []).map(item => AddOn_Title[item.addon_type] || item.addon_type);

    React.useEffect(() => {
        users_GetPage.request({filters: {id}});
    }, []);


    React.useEffect(() => {
        if (user) {
            addOn_GetByZipCode.request(user.zip_code)
        }
    }, [user && user.zip_code]);

    //addOn_GetByZipCode

    const handleSubmit = (e) => {
        e.preventDefault();
    };


    const key_disabled = {
        num_bth: state.num_br === 'Studio',
    };

    const key_onChange = {
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

    const step_columns = {
        'Home': columnsHome,
        'Service': columnsService,
        'Special ': columnsSpecial,
    };
    const getContentByStep = step => step_columns[step].map((props) => renderItem(props));
    const validateStep = step => {
        const nextErrors = {};
        Object.keys(step_columns[step]).forEach(index => {
            const field = step_columns[step][index].field;
            const required = !!step_columns[step][index].required;
            const title = !!step_columns[step][index].title;
            const value = state[field];
            if (required && !value) {
                nextErrors[field] = `Empty required field ${title}`;
            }
        });
        if (Object.keys(nextErrors).length) {
            setErrors({...errors, ...nextErrors});
            return false;
        } else {
            return true;
        }
    };


    return <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Typography style={{margin: 20}}
                    variant="h6">
            Booking {user && user.email}
            &nbsp;{user && user.first_name}
            &nbsp;{user && user.last_name}
        </Typography>
        <BookingStepper
            validateStep={validateStep}
            getContentByStep={getContentByStep}
            steps={Object.keys(step_columns)}
        />
        {/*<Button*/}
        {/*disabled={!!haveError(errors) || isAnyRequestPending}*/}
        {/*type="submit"*/}
        {/*fullWidth*/}
        {/*variant="contained"*/}
        {/*color="primary"*/}
        {/*>*/}
        {/*Create User*/}
        {/*</Button>*/}
    </form>;


};

const BookingStepper = ({steps, getContentByStep, validateStep}) => {
    const [activeStep, setActiveStep] = React.useState(2);
    const [errorStep, setErrorStep] = React.useState(null);

    function handleNext() {
        if (validateStep(steps[activeStep])) {
            setActiveStep(prevActiveStep => prevActiveStep + 1);
            setErrorStep(null);
        } else {
            setErrorStep(activeStep);
        }
    }

    function handleBack() {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    }

    return <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, idx) => <Step key={idx}>
            <StepLabel error={errorStep === idx}>{step}</StepLabel>
            <StepContent>
                <FormControl fullWidth>
                    {getContentByStep(step)}
                </FormControl>
                <div>
                    <div>
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                        >
                            Back
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                        >
                            {activeStep === 3 ? 'Finish' : 'Next'}
                        </Button>
                    </div>
                </div>
            </StepContent>
        </Step>)}

    </Stepper>
}
