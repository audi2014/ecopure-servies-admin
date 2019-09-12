import {makeRequestData} from "./tools";
import {StepTitle_columns_INITIAL, StepTitle_columns_SHORT} from "./constants";


const validateStep = ({setErrors, state, user, errors, stepTitle, StepTitle_columns}) => {
    const nextErrors = {};
    Object.keys(StepTitle_columns[stepTitle]).forEach(index => {
        const field = StepTitle_columns[stepTitle][index].field;
        const required = !!StepTitle_columns[stepTitle][index].required;
        const title = !!StepTitle_columns[stepTitle][index].title;
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


export const makeValidateStepWithCardUpdating = ({
                                                     isInitialBooking,
                                                     setErrors,
                                                     state,
                                                     user,
                                                     errors,
                                                     users_addBillingInfo_request,
                                                     users_HomeCleaning_request,
                                                     StepTitle_columns
                                                 }) => stepTitle => {
    if (validateStep({stepTitle, setErrors, state, user, errors, StepTitle_columns})) {
        if (stepTitle === 'Welcome Call') {
            if (Date.parse(state.start_clean_date) < Date.parse(state.meeting_point_date)) {
                setErrors({
                    ...errors,
                    meeting_point_date: `Meeting Point Must be BEFORE Start clean date ${state.start_clean_date}`
                });
                return false;
            } else {
                return true;
            }
        } else if (stepTitle === 'Billing') {
            return users_addBillingInfo_request({
                ...state,
                email: user.email,
            });
        } else if (stepTitle === 'Confirm') {

            const body = makeRequestData(state);
            const bodyFiltered = getRequestStateKeys(isInitialBooking)
                .reduce((prev, key) => {
                    prev[key] = body[key] || '';
                    return prev;
                }, {});

            return users_HomeCleaning_request({
                ...bodyFiltered,
                num_adults: '1',
                num_pets: '0',
                daily_tuning: '0',
                token: user.token
            });
        } else {
            return true;
        }
    } else {
        return false;
    }
};

const REQUEST_KEYS_INITIAL = [
    "num_br",
    "num_bth",
    "footage",
    "home_condition",
    "num_kids",
    "pet_type",
    "start_clean_date",
    "is830",
    "frequency",
    "home_access",
    "time_initial_cleaning",
    "time_ongoing_cleaning",
    "add-on-services",
    "special",
    "promo-code",
    "meeting_point_start",
    "meeting_point_end",
    "cc_number",
    "exp_date",
    "cvv",
    "cc_zip",
];
const REQUEST_KEYS_SHORT = [
    "start_clean_date",
    "is830",
    "frequency",
    "home_access",
    "time_initial_cleaning",
    "time_ongoing_cleaning",
    "add-on-services",
    "special",
    "promo-code",
    "cc_number",
    "exp_date",
    "cvv",
    "cc_zip",
];

export const getRequestStateKeys = (isInitialBooking) => isInitialBooking ? REQUEST_KEYS_INITIAL : REQUEST_KEYS_SHORT;


